import axios, { AxiosRequestConfig } from "axios";
export const AxiosRequest = (data: AxiosRequestConfig): any => {
  const requset = axios.create(data);

  requset.interceptors.request.use((config) => {
    if (config.url?.indexOf("login") != -1) {
      return config;
    }
    if (localStorage.getItem("token")) {
      return (config.headers = { token: localStorage.getItem("token") || "" });
    }

    return (window.location.href = "#/");
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
            reject(err);
          })
          .finally(() => reject(new Error("请求超时！！！")));

        break;

      default:
        return reject(new Error("请输入有效的请求类型！！！"));
    }
  });
};
