import { Toast } from "antd-mobile";
import axios, { AxiosRequestConfig } from "axios";
export const AxiosRequest = (data: AxiosRequestConfig): any => {
  const requset = axios.create(data);

  requset.interceptors.request.use((config) => {
    if (
      config.url?.indexOf("login") !== -1 ||
      config.url.indexOf("phone_code") !== -1 ||
      config.url.indexOf("ws") !== -1
    ) {
      return config;
    }
    if (localStorage.getItem("token")) {
      config.headers = { token: localStorage.getItem("token") || "" };
      return config;
    }
    window.location.href = "#/";
    return null;
  });

  requset.interceptors.response.use((data) => {
    if (data.status === 200) {
      return data;
    } else {
      Toast.show({ content: data.statusText, icon: "error" });
      return {};
    }
  });

  return new Promise((resolve, reject) => {
    switch (data.method) {
      case "get":
        requset
          .get(data.url || "", {
            params: data.params,
            headers: data.headers,
            data: data.data,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            Toast.show({ content: "服务端请求失败！", icon: "fail" });
            reject(err);
          })
          .finally(() => reject(new Error("请求超时！！！")));
        break;

      case "post":
        requset
          .post(data.url || "", {
            params: data.params,
            headers: data.headers,
            data: data.data,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            Toast.show({ content: "服务端请求失败！", icon: "fail" });
            reject(err);
          })
          .finally(() => reject(new Error("请求超时！！！")));

        break;

      default:
        return reject(new Error("请输入有效的请求类型！！！"));
    }
  });
};
