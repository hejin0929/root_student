interface chumAddReq {
  friend_id: string;
  permissions: string;
  source: string;
  uuid: string
}
interface chumAddRes {
  body ? : string;
  mgsCode: number;
  mgsText: string
}
interface chumSearchUserRes {
  body ? : userMessage;
  mgsCode: number;
  mgsText: string
}
interface getCodeGetPhoneCode {
  code: string
}
interface getCodeResCode {
  body ? : getCodeGetPhoneCode;
  mgsCode: number;
  mgsText: string
}
interface homeKeysRes {
  body: {
    private: string;public: string;
  };
  mgsCode: number;
  mgsText: string
}
interface homeMessageRes {
  body ? : userMessage;
  mgsCode: number;
  mgsText: string
}
interface homeMessageUpdateRes {
  body ? : userMessageUpdate;
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
  phone: string
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
interface moduleHttpErrs {
  mgsText: string;
  msgCode: number
}
interface uploadFilesFileTest {
  code: string
}
interface uploadFilesFilesRes {
  body ? : string;
  mgsCode: number;
  mgsText: string
}
interface userMessage {
  birthday: string;
  image: string;
  introduce: string;
  name: string;
  phone: string;
  region: string;
  sex: number;
  state: number;
  user_id: string;
  uuid: string
}
interface userMessageUpdate {
  message: userMessage;
  res: string
}

export interface Paths {
  "/api/chum/add": {
    ParamsData ? : {
      data: undefined
    };
    reqData: undefined;
    type: "post";
    resData: chumAddRes
  };
  "/api/chum/search/{phone}": {
    ParamsData ? : {
      phone: string
    };
    reqData: undefined;
    type: "get";
    resData: chumSearchUserRes
  };
  "/api/home/key": {
    ParamsData ? : {
      id: number
    };
    reqData: undefined;
    type: "get";
    resData: homeKeysRes
  };
  "/api/home/message": {
    ParamsData ? : {
      id: number
    };
    reqData: undefined;
    type: "get";
    resData: undefined
  };
  "/api/login/user/login": {
    ParamsData ? : undefined;
    reqData: loginUserName;
    type: "post";
    resData: loginUserBody
  };
  "/api/login/user/login_code": {
    ParamsData ? : undefined;
    reqData: loginUserCode;
    type: "post";
    resData: loginUserBody
  };
  "/api/login/user/sign": {
    ParamsData ? : undefined;
    reqData: loginUserSignType;
    type: "post";
    resData: loginUserSignReps
  };
  "/api/phone_code/user/{phone}": {
    ParamsData ? : {
      phone: string
    };
    reqData: undefined;
    type: "get";
    resData: getCodeResCode
  };
  "/api/upload/deleteImg": {
    ParamsData ? : {
      name: string
    };
    reqData: undefined;
    type: "get";
    resData: uploadFilesFilesRes
  };
  "/api/upload/deleteVideo": {
    ParamsData ? : {
      video: string
    };
    reqData: undefined;
    type: "get";
    resData: uploadFilesFilesRes
  };
  "/api/upload/images": {
    ParamsData ? : {
      image: File
    };
    reqData: undefined;
    type: "post";
    resData: uploadFilesFilesRes
  };
  "/api/upload/test": {
    ParamsData ? : undefined;
    reqData: uploadFilesFileTest;
    type: "post";
    resData: uploadFilesFilesRes
  };
  "/api/upload/videos": {
    ParamsData ? : {
      videos: File
    };
    reqData: undefined;
    type: "post";
    resData: uploadFilesFilesRes
  };
  "/api/user/user_message/update": {
    ParamsData ? : undefined;
    reqData: userMessage;
    type: "post";
    resData: homeMessageUpdateRes
  };
  "/api/user/user_message/{id}": {
    ParamsData ? : {
      id: string
    };
    reqData: undefined;
    type: "get";
    resData: homeMessageRes
  }
}