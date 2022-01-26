interface loginForgetPassword {
  code ? : string, name ? : string, phone ? : string
},
interface loginRepsGetCode {
  body ? : [object Object], mgsCode ? : integer, mgsText ? : string
},
interface loginUserBody {
  body ? : [object Object], mgsCode ? : integer, mgsText ? : string
},
interface loginUserCode {
  code ? : string, phone ? : string, testData ? : loginUserName
},
interface loginUserName {
  password ? : string, phone ? : string, thereData ? : loginForgetPassword
},
interface loginUserSignReps {
  body ? : string, mgsCode ? : integer, mgsText ? : string
},
interface loginUserSignType {
  code ? : string, password ? : string, phone ? : string, thereData ? : loginForgetPassword
},
interface loginPathsUserSignReps {},
interface loginPathsUserSignType {}

export interface Paths {
  "/login/user/login": {
    "ParamsData": {},
    "type": "post",
    "resData": "loginUserCode"
  }, "/login/user/sign": {
    "ParamsData": {},
    "type": "post",
    "resData": "loginPathsUserSignType"
  }, "/login/user/{phone}": {
    "ParamsData": {
      "phone": "string"
    },
    "type": "get",
    "resData": "loginRepsGetCode"
  }
}