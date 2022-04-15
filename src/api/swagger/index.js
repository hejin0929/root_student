const fs = require("fs");
const path = require("path");
const parse = require("swagger-parser");
const beautify = require("js-beautify").js_beautify;
const swaggerUrl = "http://localhost:8081/api/swagger/doc.json";

// api接口方法存放目录
const API_PATH = path.resolve(__dirname, "../../api/type");

const TypeData = new Map();
const PathMap = new Map();

// 判断目录是否存在
const isExist = (lastPath = "") => {
  if (!lastPath) {
    const configPath = `${API_PATH}/config.ts`;
    // api 目录下写入 config文件
    fs.access(configPath, function (err) {
      if (err && err.code === "ENOENT") {
        fs.writeFileSync(
          `${API_PATH}/config.ts`,
          "export const ip = 'http://localhost:8081/api/swagger/doc.json'"
        );
      }
    });
  }
};

const gen = async () => {
  isExist();
  try {
    // 解析url 获得
    const parsed = await parse.parse(swaggerUrl);

    const typeList = Object.keys(parsed.definitions);

    for (const key in parsed.definitions) {
      TypeData.set(
        key.split(".").join(""),
        ObjectInNewType(parsed.definitions[key])
      );
    }

    for (const path in parsed.paths) {
      const valueData = parsed.paths;
      const data = { ParamsData: {}, reqData: undefined };

      // console.log("this is path ?? ", path);

      if (valueData[path].post) {
        data.type = "post";
        if (valueData[path].post.parameters[0].in === "body") {
          if (valueData[path].post.parameters[0].schema.type === "array") {
            data.reqData = valueData[path].post.parameters[0].schema.items[
              "$ref"
            ]
              .split("/")[2]
              .split(".")
              .join("");
          } else {
            data.reqData = valueData[path].post.parameters[0].schema["$ref"]
              .split("/")[2]
              .split(".")
              .join("");
          }
        } else {
          const list = valueData[path].post.parameters;

          list.forEach((element) => {
            data.ParamsData[element.name] = element.type;
          });
        }

        if (valueData[path].post.responses["200"].schema.type === "array") {
          data.resData = valueData[path].post.responses["200"].schema.items[
            "$ref"
          ]
            .split("/")[2]
            .split(".")
            .join("");
        } else {
          data.resData = valueData[path].post.responses["200"].schema["$ref"]
            .split("/")[2]
            .split(".")
            .join("");
        }

        PathMap.set(path, data);
      } else {
        const valueData = parsed.paths;
        const data = { ParamsData: {}, reqData: undefined };

        data.type = "get";
        if (valueData[path].get.parameters[0].in === "body") {
          if (valueData[path].post.parameters[0].schema.type === "array") {
            data.reqData = valueData[path].post.parameters[0].schema.items[
              "$ref"
            ]
              .split("/")[2]
              .split(".")
              .join("");
          } else {
            data.reqData = valueData[path].post.parameters[0].schema["$ref"]
              .split("/")[2]
              .split(".")
              .join("");
          }
        } else {
          const list = valueData[path].get.parameters;

          list.forEach((element) => {
            data.ParamsData[element.name] = element.type;
          });

          data.reqData = undefined;
        }

        if (valueData[path].get?.responses["200"].schema.type === "array") {
          data.resData = valueData[path].get.responses["200"].schema.items[
            "$ref"
          ]
            .split("/")[2]
            .split(".")
            .join("");
        } else {
          data.resData = valueData[path].get.responses["200"].schema["$ref"]
            ?.split("/")[2]
            .split(".")
            .join("");
        }

        PathMap.set(path, data);
      }
    }

    // console.log("this is ?? Map", PathMap, TypeData);
    WriteFileApi();
  } catch (e) {
    console.log("this is err", e);
  }
};

function ObjectInNewType(obj) {
  const TypeData = obj.properties;

  const newType = {};
  for (const key in TypeData) {
    if (TypeData[key]?.$ref) {
      const child = TypeData[key]?.$ref.split("/")[2];
      newType[key] = child.split(".").join("");
    } else if (TypeData[key]?.type === "object") {
      newType[key] = ObjectInNewType(TypeData[key]);
    } else {
      newType[key] = TypeData[key]?.type ?? "undefined";
    }
  }
  newType.required = obj.required || undefined;
  return newType;
}

const WriteFileApi = () => {
  const pathList = [];
  for (item of PathMap.keys()) {
    pathList.push(item);
  }

  const typeName = [];

  for (const iterator of TypeData.keys()) {
    typeName.push(iterator);
  }

  const template = `
  ${typeName
    .map((v) => {
      // console.log(TypeClassData(TypeData.get(v)));
      const paramsData = TypeData.get(v);
      const isMust = paramsData.required;
      delete paramsData.required;

      const keys = Object.keys(paramsData);

      return `\ninterface ${v}{${keys
        .map((v) => {
          if (paramsData[v] === "integer") {
            paramsData[v] = "number";
          }

          if ( typeof paramsData[v] === "object") {
            return `${v}: { ${Object.keys(paramsData[v])
              .map((vv) => {
                if (vv === "required") {
                  return;
                }

                return `${vv}: ${paramsData[v][vv]}\n`;
              })
              .join(";")} }`;
          }
          if (isMust?.indexOf(v) !== -1) {
            return `${v}: ${paramsData[v]}`;
          }
          return `${v}?: ${paramsData[v]}`;
        })
        .join(";")}}`;
    })
    .join("")}


  \nexport interface Paths {${pathList
    .map((v) => {
      // console.log(PathClassData(PathMap.get(v)));
      const data = PathMap.get(v);

      const keys = Object.keys(PathMap.get(v));

      return `"${v}": {${keys
        .map((v) => {
          console.log("this is a ?? ", v)
          if (v === "type") {
            return `${v}: "${data[v]}"`;
          }
          if (v === "ParamsData") {
            if (Object.keys(data[v]).length) {
              return (
                "ParamsData?:{" +
                Object.keys(data[v]).map((vv) => {
                  // console.log(data[v], vv);
                  let types = data[v][vv];

                  if(types === "file"){
                    types = "File"
                  }

                  if (types === "integer") {
                    types = "number";
                  }

                  return `${vv}: ${types}`;
                }) +
                "}"
              );
            }

            return `${v}?: undefined`;
          }

          return `${v}: ${data[v]}`;
        })
        .join(";\n")}}\n`;
    })
    .join(";")}}
  `;

  fs.writeFileSync(
    `${API_PATH}/config.ts`,
    beautify(template, { indent_size: 2, max_preserve_newlines: 2 })
  );

  // console.log(template);
};

// const PathClassData = (data) => {
//   Object.keys(data).map((v) => {
//     if (v instanceof Object) {
//       data[v] = PathClassData(data[v]);
//     }
//   });

//   return JSON.stringify(data);
// };

// const TypeClassData = (value) => {
//   const isList = value?.required || [];
//   delete value.required;
//   return Object.keys(value).map((v) => {
//     if (isList.indexOf(v) !== -1) {
//       return `${v}: ${value[v]}`;
//     }
//     return `${v}?: ${value[v]}`;
//   });
// };

gen();
