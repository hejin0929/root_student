interface loginForgetPassword {
  code: string;
  name: string;
  phone: string
}
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
  phone: string;
  thereData ? : loginForgetPassword
}
interface loginUserSignReps {
  body ? : string;
  mgsCode: number;
  mgsText: string
}
interface loginUserSignType {
  code: string;
  password: string;
  phone: string;
  thereData ? : loginForgetPassword
}
interface loginPathsUserSignReps {}
interface loginPathsUserSignType {}

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
    reqData: loginPathsUserSignType;
    resData: loginPathsUserSignReps
  };
  "/login/user/{phone}": {
    ParamsData ? : undefined;
    type: "get";
    resData: loginRepsGetCode
  }
}