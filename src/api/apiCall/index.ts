import { Paths } from "../type/config";
import { AxiosRequest } from "../axios";
import { Toast } from "antd-mobile";
import { AxiosRequestConfig } from "axios";

export async function callApi<
  T extends keyof Paths,
  P extends Paths[T]["ParamsData"],
  Q extends Paths[T]["reqData"]
>(
  url: T,
  data: { params: P; reqData: Q; method: Paths[T]["type"] },
  headers?: AxiosRequestConfig["headers"]
) {
  return new Promise<Paths[T]["resData"]>((resolve, reject) => {
    if (localStorage.getItem("token")) {
      return reject(new Error("error !!!"));
    }

    const headerData = Object.assign(
      { ["Authorization"]: localStorage.getItem("token") || "" },
      headers
    );

    AxiosRequest({
      baseURL: "http://localhost:8081/",
      url,
      params: data.params,
      data: data.reqData,
      method: data.method,
      headers: headerData,
    })
      .then((res: any) => {
        if (res.mgsCode === 200) {
          resolve(res.body as Paths[T]["resData"]);
          return;
        }

        Toast.show({ content: res.mgsText });

        reject(res.mgsText);
      })
      .catch((err: Error) => reject(err));
  });
}

// 没有token 登录的接口
export async function callApiNotLogin<
  T extends keyof Paths,
  P extends Paths[T]["ParamsData"],
  Q extends Paths[T]["reqData"]
>(
  url: T,
  data: { params: P; reqData: Q; method: Paths[T]["type"] },
  headers?: AxiosRequestConfig["headers"]
) {
  return new Promise<Paths[T]["resData"]>((resolve, reject) => {
    AxiosRequest({
      baseURL: "http://localhost:8081/",
      url,
      params: data.params,
      data: data.reqData,
      method: data.method,
      headers: headers || undefined,
    })
      .then((res: any) => {
        if (res.mgsCode === 200) {
          resolve(res.body as Paths[T]["resData"]);
          return;
        }

        Toast.show({ content: res.mgsText });

        reject(res.mgsText);
      })
      .catch((err: Error) => reject(err));
  });
}
