import { Paths } from "../type/config";
import { AxiosRequest } from "../axios";
import { Toast } from "antd-mobile";
import { AxiosRequestConfig } from "axios";
import jsencrypt from "jsencrypt";
import { HmacSHA256 } from "crypto-js";

function hashSHA246(params: any) {
  // 通过 hmacsha256 生成散列字符串
  return HmacSHA256(
    JSON.stringify(params),
    sessionStorage.getItem("private") || ""
  ).toString();
}

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
    if (!localStorage.getItem("token")) {
      return reject(new Error("error !!!"));
    }

    const headerData = Object.assign(
      { ["Authorization"]: localStorage.getItem("token") || "" },
      headers
    );

    if (sessionStorage.getItem("private")) {
      const Authorization = hashSHA246(data.reqData);

      const JSencrypt = new jsencrypt();
      // 对实例化对象设置公钥
      JSencrypt.setPublicKey(sessionStorage.getItem("public") || "");
      // 通过公钥对数据加密
      const encrypt = JSencrypt.encrypt(JSON.stringify(data.reqData));

      headerData["key"] = encrypt;

      var decrypt = new jsencrypt();
      decrypt.setPrivateKey(sessionStorage.getItem("private") || "");

      var uncrypted = decrypt.decrypt(encrypt || "");
      console.log("解密后数据:%o", uncrypted);

      // console.log("this is a ?? ", encrypt);
    }
    console.log(headerData);

    AxiosRequest({
      baseURL: "http://localhost:3003/",
      url,
      params: data.params,
      data: data.reqData,
      method: data.method,
      headers: headerData,
    })
      .then((res: any) => {
        if (res.mgsCode === 200) {
          resolve(res as Paths[T]["resData"]);
          return;
        }
        if (res.mgsText === "token失败") {
          window.location.href = "#/";
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
      baseURL: "http://localhost:3003/",
      url,
      params: data.params,
      data: data.reqData,
      method: data.method,
      headers: headers || undefined,
    })
      .then((res: any) => {
        if (res.mgsCode === 200) {
          resolve(res as Paths[T]["resData"]);
          return;
        }

        Toast.show({ content: res.mgsText });

        reject(res.mgsText);
      })
      .catch((err: Error) => reject(err));
  });
}
