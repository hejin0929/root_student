import { useContext, useEffect } from "react";
import { ContextStore } from "@store/index";
import { StoreRouter, useRouter } from "./router";

export const useStore = (store: any, callback?: () => void) => {
  const storeMap = useContext(ContextStore);

  const router = useRouter();

  // useEffect(() => router.navigate(), [router.navigate]);

  if (!storeMap.get(store)) {
    const data = storeMap.create(store, {
      router,
      callback,
    });

    return data;
  }

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

export class CreateStore {
  watchLook: Map<any, Look> = new Map();

  storeMap: Map<any, any> = new Map();

  constructor() {}

  create(
    store: any,
    callback?: { router: StoreRouter; callback?: () => void }
  ) {
    this.watchLook.set(store, this.createWatchQueue());

    this.storeMap.set(
      store,
      new store({
        events: this.watchLook.get(store),
        routers: callback?.router as StoreRouter,
      })
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
