import axios, { AxiosRequestConfig } from "axios";
export const AxiosRequest = (data: AxiosRequestConfig) => {
  const requset = axios.create(data);

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
