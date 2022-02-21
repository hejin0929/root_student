import { useContext } from "react";
import { ContextStore } from "@store/index";

export const useStore = (store: any, callback?: () => any) => {
  const storeMap = useContext(ContextStore);

  if (!storeMap.get(store)) {
    const data = storeMap.create(store, callback);
    return data;
  }

  return storeMap.get(store);
};

export type Look = {
  on: (name: string, callback: (data: any) => any, store?: any) => void;
  subscribe: (name: string, data: any, store?: any) => void;
  off: (name: string) => void;
  callbackMap: Map<string, (data: any) => any>;
};

export class CreateStore {
  watchLook: Map<any, Look> = new Map();

  storeMap: Map<any, any> = new Map();

  // routes =

  constructor() {}

  create(store: any, callback?: (call: Look | undefined) => any) {
    this.watchLook.set(store, this.createWatchQueue());

    this.storeMap.set(store, new store(this.watchLook.get(store)));
    return this.get(store);
  }

  get(store: any) {
    return this.storeMap.get(store);
  }

  createWatchQueue() {
    const messge = {
      callbackMap: new Map() as Map<string, (data: any) => any>,
      on: (name: string, callback: (data: any) => any, store?: any) => {
        if (store) {
          useStore(store);
          return this.watchLook.get(store)?.callbackMap.set(name, callback);
        }

        if (!messge.callbackMap?.get(name)) {
          return messge.callbackMap?.set(name, callback);
        }
      },
      subscribe: (name: string, data: any, store?: any) => {
        if (store) {
          return this.watchLook.get(store)?.callbackMap.get(name)?.(name);
        }
        return messge.callbackMap.get(name)?.(data);
      },
      off: (name: string) => {
        messge.callbackMap.delete(name);
      },
    };

    return messge;
  }

  unStore(store: any) {
    this.storeMap.delete(store);
    return;
  }
}
