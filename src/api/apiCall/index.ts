import { Paths } from "../type/config";
import { AxiosRequest } from "../axios";

export async function callApi<
  T extends keyof Paths,
  P extends Paths[T]["ParamsData"],
  Q extends Paths[T]["reqData"]
>(url: T, data: { params: P; reqData: Q; method: Paths[T]["type"] }) {

  console.log("this is ?? ", data.reqData); 
  

   const res = await  AxiosRequest({
        baseURL: "http://localhost:8888/",
        url,
        params: data.params,
        data: data.reqData,
        method: data.method
    })

    return res as  Paths[T]["resData"]
}


