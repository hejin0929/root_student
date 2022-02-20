import { makeAutoObservable, runInAction } from "mobx";
import { useEffect } from "react";
import {
  Params,
  useNavigate,
  useParams,
  NavigateFunction,
} from "react-router-dom";

export type StoreRouter = {
  params: Readonly<Params<string>>;
  navigate: NavigateFunction;
};

// 自定义路由类型
export const useRouter = () => {
  const params = useParams();
  // const navigate = useNavigate();

  const navigate = () => {};

  useEffect(() => {}, [navigate]);

  return {
    params,
    navigate,
  };
  
};



export class Routers {
  
  path: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  navigate(path: string) {
    this.updateData({ path });
  }

  updateData(params: Partial<Routers>) {
    runInAction(() => Object.assign(this, params));
  }


}
