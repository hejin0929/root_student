var C=Object.defineProperty;var w=(e,s,t)=>s in e?C(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var a=(e,s,t)=>(w(e,typeof s!="symbol"?s+"":s,t),t);import{m,b as S,f as h,j as i,F as p,o as _,d,I as f,B as y,r as O}from"./vendor.068dca9c.js";import{u as N}from"./index.a7171373.js";var c;(function(e){e[e.INPUT=1]="INPUT",e[e.SELECTOR=2]="SELECTOR",e[e.PASSWORD=3]="PASSWORD",e[e.NUMBER=4]="NUMBER",e[e.INPUT_TEXT=5]="INPUT_TEXT",e[e.DATE_PICKER=6]="DATE_PICKER",e[e.INPUT_NUMBER=7]="INPUT_NUMBER"})(c||(c={}));class U{constructor({events:s}){a(this,"events");a(this,"call");s.on("init",t=>{console.log("this is params ?",t),this.updateData({call:t.onSubmit})}),this.updateData({events:s}),m(this)}handleSubmit(s){var t;console.log("this is a ?? "),this.call,this.call&&(console.log("this is a ?? "),(t=this.call)==null||t.call(this,s))}updateData(s){S(()=>{Object.assign(this,s)})}}const E="LOGIN",D="NEW USER",v="new user",b="system language",A="login",R="code login",I="password login";var B={logo:E,user:D,newUser:v,systemLanguage:b,login:A,codeLogin:R,passwordLogin:I};const M="\u6B22\u8FCE\u767B\u9646",P="\u65B0\u7528\u6237",x="\u6211\u662F\u65B0\u7528\u6237",G="\u8BED\u8A00\u8BBE\u7F6E",$="\u767B\u9646",W="\u9A8C\u8BC1\u7801\u767B\u9646",j="\u5BC6\u7801\u767B\u9646";var k={logo:M,user:P,newUser:x,systemLanguage:G,login:$,codeLogin:W,passwordLogin:j};class H{constructor(){a(this,"select","ZH_CN");m(this)}get selectList(){return this.select==="ZH_CN"?[{name:"\u4E2D\u6587",value:"ZH_CN"},{name:"\u82F1\u6587",value:"EM_US"}]:[{name:"Chinese",value:"ZH_CN"},{name:"English",value:"EM_US"}]}updateNames(s){this.select=s}get names(){return this.select==="ZH_CN"?JSON.parse(JSON.stringify(k)):JSON.parse(JSON.stringify(B))}}const o=new H;var l;(function(e){e[e.PASSWORD_LOGIN=1]="PASSWORD_LOGIN",e[e.CODE_LOGIN=2]="CODE_LOGIN",e[e.ADD_USER=3]="ADD_USER",e[e.GET_CODE=4]="GET_CODE"})(l||(l={}));class Z{constructor({events:s}){a(this,"isCode",!1);a(this,"isPassword",!1);a(this,"count");a(this,"times");a(this,"oldPhone",[]);a(this,"pageStyleType",1);a(this,"formList",[{name:"\u624B\u673A:",value:"phone",isShow:!0,rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801!!!"}],type:c.INPUT},{name:"\u9A8C\u8BC1\u7801:",value:"code",isShow:!1,rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801!!!"}],type:c.INPUT},{name:"\u5BC6\u7801:",value:"password",isShow:!0,rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801!!!"}],type:c.PASSWORD}]);a(this,"$$");a(this,"test");this.$$=s,m(this),this.$$.on("password",t=>{if(t.length>5)return this.UpdateData({isPassword:!0});this.UpdateData({isPassword:!1})}),this.$$.on("phone",t=>{var u,g;if(t.length>10){if((u=this.oldPhone)==null?void 0:u.includes(t))return;(g=this.oldPhone)==null||g.push(t),this.UpdateData({isPassword:!1,isCode:!1})}}),s==null||s.on("name",t=>{this.UpdateData({isCode:!1})})}get pageFormLogin(){return this.formList.filter(s=>s.isShow)}get viewText(){return h({[this.count+"s"]:this.count&&!this.isPassword,\u83B7\u53D6\u9A8C\u8BC1\u7801:!this.isCode&&!this.count,\u786E\u8BA4\u5BC6\u7801:this.isPassword})}get viewTitleText(){return h({[o.names.logo]:this.pageStyleType===1||this.pageStyleType===2,[o.names.user]:this.pageStyleType===3})}get viewTitleLeftText(){return h({[o.names.newUser]:this.pageStyleType===1||this.pageStyleType===2,[o.names.login]:this.pageStyleType===3})}get viewLoginType(){return h({[o.names.codeLogin]:this.pageStyleType===1,[o.names.passwordLogin]:this.pageStyleType===2})}handleGetCode(s){this.times&&clearTimeout(this.times)}handleAddUser(){}handleOnSubmit(s){console.log("this is submit ?? ",s)}handleUpdateStyleType(s){switch(this.formList.forEach(t=>t.isShow=!0),s){case 1:this.formList[2].isShow=!1;break;case 2:this.formList[1].isShow=!1;break;case 4:this.formList[1].isShow=!1,this.formList[2].isShow=!1;break}this.UpdateData({pageStyleType:s})}UpdateData(s){var t;for(let u in s)(t=this.$$)==null||t.subscribe(u,s[u]);S(()=>{Object.assign(this,s)})}}const F="_SignBox_14li5_1",J="_signTitle_14li5_8",q="_textRight_14li5_14",K="_language_14li5_20",X="_loginImg_14li5_26",z="_formMains_14li5_33",Q="_loginType_14li5_36",V="_IC_Order_14li5_41";var r={SignBox:F,signTitle:J,textRight:q,language:K,loginImg:X,formMains:z,loginType:Q,IC_Order:V};const T=({v:e,children:s})=>i(p.Item,{name:e.value,label:e.name,rules:e.rules,children:s},e.value),Y="_formMain_hdpxw_1";var ee={formMain:Y};const se=e=>{const{list:s,submitTxt:t="\u786E\u8BA4",onSubmit:u}=e,g=N(U,{onSubmit:u,list:s});return i("div",{className:ee.formMain,children:d(p,{onFinish:n=>g.handleSubmit(n),children:[s.map(n=>{switch(n.type){case c.INPUT:return i(T,{v:n,children:i(f,{placeholder:n.placeholder})},n.value);case c.PASSWORD:return i(T,{v:n,children:i(f,{placeholder:n.placeholder,type:"password"})},n.value)}}),i(p.Item,{children:i(y,{color:"primary",type:"submit",size:"large",children:t})})]})})};var te=_(se),L="./assets/LOGIN.db75ff2b.jpeg";const ie="_imageMain_y4h0n_1";var ae={imageMain:ie};const ne=O.exports.memo(({url:e})=>i("div",{className:ae.imageMain,children:i("img",{src:e||L})})),oe=()=>{const e=N(Z);return d("div",{className:r.SignBox,children:[d("h2",{className:r.signTitle,children:[i("span",{className:r.language,onClick:()=>o.updateNames(o.select==="EM_US"?"ZH_CN":"EM_US"),children:o.names.systemLanguage}),e.viewTitleText," ",i("span",{className:r.textRight,onClick:()=>e.handleUpdateStyleType(e.pageStyleType===l.ADD_USER?l.PASSWORD_LOGIN:l.ADD_USER),children:e.viewTitleLeftText})]}),i("div",{className:r.loginImg,children:i(ne,{url:L})}),d("div",{className:r.formMains,children:[i(te,{list:e.pageFormLogin,onSubmit:s=>e.handleOnSubmit(s),submitTxt:e.viewText}),i("div",{className:r.loginType,onClick:()=>e.handleUpdateStyleType(e.pageStyleType===l.PASSWORD_LOGIN?l.CODE_LOGIN:l.PASSWORD_LOGIN),children:e.viewLoginType})]}),i("a",{className:r.IC_Order,href:"https://beian.miit.gov.cn/",children:"\u7CA4ICP\u59072021160767\u53F7"})]})};var ce=_(oe);export{ce as default};
