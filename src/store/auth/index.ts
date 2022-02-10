import { useEffect, useState, createContext } from "react";

const storeMap = new Map();

export const useStore = (store: any, callback?: () => {}) => {
  if (!storeMap.get(store)) {
    const data = new store(callback?.());
    storeMap.set(store, data);
    return data; 
  }

  return storeMap.get(store);
};

export const unStore = (store: any) => {
  useEffect(() => {
    return () => {
      storeMap.delete(store);
    };
  }, []);
};