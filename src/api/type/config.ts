interface loginRepsGetCode {
  body: {
    code: string;
  };
  mgsCode: number;
  mgsText: string
}
interface loginUserBody {
  body: {
    id: string;name: string;token: string;
  };
  mgsCode: number;
  mgsText: string
}
interface loginUserCode {
  code: string;
  phone: string
}

export interface Paths {
  "/login/user/login": {
    ParamsData ? : undefined;
    type: "post";
    reqData: loginUserCode;
    resData: loginUserBody
  };
  "/login/user/{phone}": {
    ParamsData ? : {
      phone: string
    };
    type: "get";
    reqData: undefined;
    resData: loginRepsGetCode
  }
}