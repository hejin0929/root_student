import { useContext, useEffect } from "react";
import { ContextStore } from "@store/index";
import { Routers, useRouter } from "./router";
import { Params, useParams } from "react-router-dom";
import { User } from "./user";

export const useStore = (
  store: any,
  params?: any,
  callback?: (data: any) => void
) => {
  const storeMap = useContext(ContextStore);
  const routerParams = useParams();
  useRouter(storeMap.methodsStore);

  if (!storeMap.get(store)) {
    const data = storeMap.create(store, {
      routerParams,
      callback,
      params,
    });
    return data;
  }

  // 只会触发一次的init传参
  if (storeMap.aHook.get(store)) {
    storeMap.watchLook.get(store)?.subscribe("init", params);
    storeMap.aHook.delete(store);
  }

  // 因为数据结构只能回调传参

  return storeMap.get(store);
};

export const unStore = (store: any) => {
  const stores = useContext(ContextStore);
  useEffect(() => {
    return () => {
      stores.unStore(store);
    };
  }, []);
};

export type Look = {
  on: (name: string, callback: (data: any) => any, store?: any) => void;
  subscribe: (name: string, data: any, store?: any) => void;
  off: (name: string) => void;
  callbackMap: Map<string, (data: any) => any>;
};

interface Ages {
  events: Look;
  routers: Routers;
}

export class CreateStore {
  watchLook: Map<any, Look> = new Map();

  storeMap: Map<any, any> = new Map();

  methodsStore: Routers | undefined;

  aHook: Map<string, any> = new Map();

  user: User | undefined;

  constructor() {
    this.methodsStore = new Routers();
    this.user = new User();
  }

  create(
    store: any,
    callback?: {
      routerParams: Readonly<Params<string>>;
      params: any;
      callback?: (data: any) => void;
    }
  ) {
    if (this.aHook.get(store) && callback?.params) {
      new store({
        events: this.watchLook.get(store),
        routers: this.methodsStore,
        user: this.user,
        params: callback?.params,
      });
      this.aHook.delete(store);
    }

    this.watchLook.set(store, this.createWatchQueue());
    if (this.methodsStore && this.methodsStore.params) {
      this.methodsStore.params = callback?.routerParams;
    }
    this.storeMap.set(
      store,
      new store({
        events: this.watchLook.get(store),
        routers: this.methodsStore,
        user: this.user,
      } as Ages)
    );
    // 所有class类的数据都是用init订阅者模式通知
    this.watchLook.get(store)?.subscribe("init", callback?.params);
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
          if (!this.watchLook.get(store)) {
            useStore(store);
            this.aHook.set(store, this.aHook.size + 1);
          }

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
