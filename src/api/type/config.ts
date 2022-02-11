interface loginGetPhoneCode {
  code: string
}
interface loginRepsGetCode {
  body ? : loginGetPhoneCode;
  mgsCode: number;
  mgsText: string
}
interface loginUser {
  id: string;
  name: string;
  token: string
}
interface loginUserBody {
  body ? : loginUser;
  mgsCode: number;
  mgsText: string
}
interface loginUserCode {
  code: string;
  phone: string;
  testData ? : loginUserName
}
interface loginUserName {
  password: string;
  phone: string
}
interface loginUserSignReps {
  body ? : string;
  mgsCode: number;
  mgsText: string
}
interface loginUserSignType {
  code: string;
  password: string;
  phone: string
}

export interface Paths {
  "/login/user/login": {
    ParamsData ? : undefined;
    type: "post";
    reqData: loginUserCode;
    resData: loginUserBody
  };
  "/login/user/sign": {
    ParamsData ? : undefined;
    type: "post";
    reqData: loginUserSignType;
    resData: loginUserSignReps
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