import { Paths } from "../type/config";
import { AxiosRequest } from "../axios";
import { Toast } from "antd-mobile";

export async function callApi<
  T extends keyof Paths,
  P extends Paths[T]["ParamsData"],
  Q extends Paths[T]["reqData"]
>(url: T, data: { params: P; reqData: Q; method: Paths[T]["type"] }) {
  return new Promise<Paths[T]["resData"]["body"]>((resolve, reject) => {
    if (localStorage.getItem("token")) {
      return reject(new Error("error !!!"));
    }

    AxiosRequest({
      baseURL: "http://localhost:8888/",
      url,
      params: data.params,
      data: data.reqData,
      method: data.method,
      headers: {
        ["Authorization"]: localStorage.getItem("token") || "",
      },
    })
      .then((res: any) => {
        if (res.mgsCode === 200) {
          resolve(res.body as Paths[T]["resData"]["body"]);
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
>(url: T, data: { params: P; reqData: Q; method: Paths[T]["type"] }) {
  return new Promise<Paths[T]["resData"]["body"]>((resolve, reject) => {
    AxiosRequest({
      baseURL: "http://localhost:8888/",
      url,
      params: data.params,
      data: data.reqData,
      method: data.method,
    })
      .then((res: any) => {
        if (res.mgsCode === 200) {
          resolve(res.body as Paths[T]["resData"]["body"]);
          return;
        }

        Toast.show({ content: res.mgsText });

        reject(res.mgsText);
      })
      .catch((err: Error) => reject(err));
  });
}
