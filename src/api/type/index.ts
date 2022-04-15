import { Paths } from "./config";

export type ApiRequstParams<T extends keyof Paths> = T extends keyof Paths
  ? Paths[T]["ParamsData"]
  : undefined;

export type ApiRequstResponse<T extends keyof Paths> = T extends keyof Paths
  ? Paths[T]["resData"]
  : undefined;

export type ApiRequstData<T extends keyof Paths> = T extends keyof Paths
  ? Paths[T]["reqData"]
  : undefined;
