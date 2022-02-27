import { useContext, useEffect } from "react";
import { ContextStore } from "@store/index";
import { Routers, useRouter } from "./router";
import { Params, useParams } from "react-router-dom";

export const useStore = (store: any, params: any,  callback?: (data: any) => void) => {
  const storeMap = useContext(ContextStore);

  const routerParams = useParams();
  console.log("update in function ?? ", storeMap.get(store));
  
  if (!storeMap.get(store)) {
    console.log("???");
    
    const data = storeMap.create(store, {
      routerParams,
      callback,
      params,
    });

    return data;
  }
  useRouter(storeMap.methodsStore);

  return storeMap.get(store);
};

export const unStore = (store: any) => {

  const stores = useContext(ContextStore);

  return stores.unStore(store);
};

export type Look = {
  on: (name: string, callback: (data: any) => any, store?: any) => void;
  subscribe: (name: string, data: any, store?: any) => void;
  off: (name: string) => void;
  callbackMap: Map<string, (data: any) => any>;
};

interface Ages {
  events: Look,
  routers: Routers
}

export class CreateStore {
  watchLook: Map<any, Look> = new Map();

  storeMap: Map<any, any> = new Map();

  methodsStore: Routers  | undefined;

  constructor() {
    this.methodsStore = new Routers();
  }

  create(
    store: any,
    callback?: { routerParams: Readonly<Params<string>> ; params: any; callback?: (data: any) => void }
  ) {
    this.watchLook.set(store, this.createWatchQueue());
    if (this.methodsStore && this.methodsStore.params) {
      this.methodsStore.params = callback?.routerParams
    }
    this.storeMap.set(
      store,
      new store({
        events: this.watchLook.get(store),
        routers: this.methodsStore,
        params: callback?.params,
      } as Ages)
    );
    return this.get(store);
  }

  get(store: any) {
    return this.storeMap.get(store);
  }

  // 创建订阅者模式
  createWatchQueue() {
    const message = {
      callbackMap: new Map() as Map<string, (data: any) => any>,
      on: (name: string, callback: (data: any) => any, store?: any) => {
        if (store) {
          // useStore(store);
          return this.watchLook.get(store)?.callbackMap.set(name, callback);
        }

        if (!message.callbackMap?.get(name)) {
          return message.callbackMap?.set(name, callback);
        }
      },
      subscribe: (name: string, data: any, store?: any) => {
        if (store) {
          return this.watchLook.get(store)?.callbackMap.get(name)?.(name);
        }
        return message.callbackMap.get(name)?.(data);
      },
      off: (name: string) => {
        message.callbackMap.delete(name);
      },
    };

    return message;
  }

  unStore(store: any) {
    this.storeMap.delete(store);
    return;
  }
}
