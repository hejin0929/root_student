import { makeAutoObservable, runInAction } from "mobx";
import { useEffect } from "react";

import { Params, useNavigate, NavigateFunction } from "react-router-dom";

export type StoreRouter = {
  params: Readonly<Params<string>>;
  navigate: NavigateFunction;
};

// 自定义路由类型
export const useRouter = (router?: Routers) => {
  const navigate = useNavigate();

  useEffect(() => {
    router?.updateData({ navigate });
  }, []);

  // console.log("this is a ?? ", router?.path);

  // useEffect(() => {
  //   navigate(router?.path || "");
  // }, [router?.path]);

  return;
};

export class Routers {
  path: string | undefined;

  params: Readonly<Params<string>> | undefined;

  navigate: NavigateFunction | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // navigate(path: string) {
  //   this.updateData({ path });
  // }

  updateData(params: Partial<Routers>) {
    runInAction(() => Object.assign(this, params));
  }
}
