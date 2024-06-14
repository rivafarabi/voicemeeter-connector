var e=require("ref-array-napi"),t=require("winreg");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=/*#__PURE__*/r(e),i=/*#__PURE__*/r(t);function o(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}var a,u,s,c,l,f=require("@breush/ffi-napi"),p=n.default("char"),m=n.default("long"),V=n.default("float"),h=/*#__PURE__*/function(){function e(){var e=this;this.isInitialised=!1,this.isConnected=!1,this.outputDevices=[],this.inputDevices=[],this.version="",this.type=void 0,this.eventPool=[],this.stringParameters=["Label","FadeTo","FadeBy","AppGain","AppMute","name","ip"],this.connect=function(){if(!e.isInitialised)throw new Error("Await the initialisation before connect");if(!e.isConnected){if(0===a.VBVMR_Login())return e.isConnected=!0,e.type=e.getVoicemeeterType(),e.version=e.getVoicemeeterVersion(),void setInterval(e.checkPropertyChange,10);throw e.isConnected=!1,new Error("Connection failed")}},this.disconnect=function(){if(!e.isConnected)throw new Error("Not connected ");try{if(0===a.VBVMR_Logout())return void(e.isConnected=!1);throw new Error("Disconnect failed")}catch(e){throw new Error("Disconnect failed")}},this.updateDeviceList=function(){if(!e.isConnected)throw new Error("Not connected ");e.outputDevices=[],e.inputDevices=[];for(var t=a.VBVMR_Output_GetDeviceNumber(),r=0;r<t;r++){var n=new p(256),i=new p(256),o=new m(1);a.VBVMR_Output_GetDeviceDescA(r,o,i,n),e.outputDevices.push({name:String.fromCharCode.apply(String,i.toArray()).replace(/\u0000+$/g,""),hardwareId:String.fromCharCode.apply(String,n.toArray()).replace(/\u0000+$/g,""),type:o[0]})}for(var u=a.VBVMR_Input_GetDeviceNumber(),s=0;s<u;s++){var c=new p(256),l=new p(256),f=new m(1);a.VBVMR_Input_GetDeviceDescA(s,f,l,c),e.inputDevices.push({name:String.fromCharCode.apply(String,l.toArray()).replace(/\u0000+$/g,""),hardwareId:String.fromCharCode.apply(String,c.toArray()).replace(/\u0000+$/g,""),type:f[0]})}},this.isParametersDirty=function(){return a.VBVMR_IsParametersDirty()},this.getBusParameter=function(t,r){return e.getParameter("Bus",t,r)},this.getStripParameter=function(t,r){return e.getParameter("Strip",t,r)},this.setStripParameter=function(t,r,n){return e.setParameter("Strip",t,r,n)},this.setBusParameter=function(t,r,n){return e.setParameter("Bus",t,r,n)},this.attachChangeEvent=function(t){e.eventPool.push(t)},this.getOption=function(t){if(!e.isConnected)throw new Error("Not correct connected ");var r=Buffer.alloc(t.length+1);r.write(t);var n=null;return e.stringParameters.some(function(e){return t.includes(e)})?(n=new p(512),a.VBVMR_GetParameterStringA(r,n),String.fromCharCode.apply(null,n).split("").filter(function(e){return"\0"!==e}).join("")):(n=new V(1),a.VBVMR_GetParameterFloat(r,n),n[0])},this.setOption=function(e){var t=Buffer.alloc(e.length+1);return t.fill(0).write(e),a.VBVMR_SetParameters(t),new Promise(function(e){return setTimeout(e,200)})},this.checkPropertyChange=function(){1===e.isParametersDirty()&&e.eventPool.forEach(function(e){e()})},this.getVoicemeeterType=function(){var e=new m(1);if(0!==a.VBVMR_GetVoicemeeterType(e))throw new Error("running failed");switch(e[0]){case 1:return"voicemeeter";case 2:return"voicemeeterBanana";case 3:return"voicemeeterPotato";default:throw new Error("Voicemeeter seems not to be installed")}},this.getVoicemeeterVersion=function(){var e=new m(1);if(0!==a.VBVMR_GetVoicemeeterVersion(e))throw new Error("running failed");return e},this.getParameter=function(t,r,n){return e.getOption(t+"["+r+"]."+n)},this.setParameter=function(t,r,n,i){if(!e.isConnected)throw new Error("Not connected ");return e.setOption(t+"["+r+"]."+n+"="+i+";")},this.getLevel=function(e,t){var r=new V(1);return a.VBVMR_GetLevel(e,t,r),r[0]}}return e.init=function(){try{return Promise.resolve(function(){try{var e=new i.default({hive:i.default.HKLM,key:"\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VB:Voicemeeter {17359A74-1236-5467}"});return Promise.resolve(new Promise(function(t){e.values(function(e,r){if(e)throw new Error(e);var n=r.find(function(e){return"UninstallString"===e.name}).value,i=n.lastIndexOf("\\");t(n.slice(0,i))})}))}catch(e){return Promise.reject(e)}}()).then(function(t){return new Promise(function(r){u||(u=new e),a=f.Library(t+"/VoicemeeterRemote64.dll",{VBVMR_Login:["long",[]],VBVMR_Logout:["long",[]],VBVMR_RunVoicemeeter:["long",["long"]],VBVMR_IsParametersDirty:["long",[]],VBVMR_GetLevel:["long",["long","long",V]],VBVMR_GetParameterFloat:["long",[p,V]],VBVMR_GetParameterStringA:["long",[p,p]],VBVMR_SetParameters:["long",[p]],VBVMR_Output_GetDeviceNumber:["long",[]],VBVMR_Output_GetDeviceDescA:["long",["long",m,p,p]],VBVMR_Input_GetDeviceNumber:["long",[]],VBVMR_Input_GetDeviceDescA:["long",["long",m,p,p]],VBVMR_GetVoicemeeterType:["long",[m]],VBVMR_GetVoicemeeterVersion:["long",[m]]}),u.isInitialised=!0,r(u)})})}catch(e){return Promise.reject(e)}},t=e,(r=[{key:"$outputDevices",get:function(){return this.outputDevices}},{key:"$inputDevices",get:function(){return this.inputDevices}},{key:"$version",get:function(){return this.version}},{key:"$type",get:function(){return this.type}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,o(n.key),n)}}(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,r}();!function(e){e.Mono="Mono",e.Mute="Mute",e.Solo="Solo",e.MC="MC",e.Gain="Gain",e.Pan_x="Pan_x",e.Pan_y="Pan_y",e.Color_x="Color_x",e.Color_y="Color_y",e.fx_x="fx_x",e.fx_y="fx_y",e.Audibility="Audibility",e.Comp="Comp",e.Gate="Gate",e.EqGain1="EqGain1",e.EqGain2="EqGain2",e.EqGain3="EqGain3",e.Label="Label",e.A1="A1",e.A2="A2",e.A3="A3",e.A4="A4",e.A5="A5",e.B1="B1",e.B2="B2",e.B3="B3",e.FadeTo="FadeTo"}(s||(s={})),(l=c||(c={})).Mono="Mono",l.Mute="Mute",l.EQ="EQ.on",l.Gain="Gain",l.NormalMode="mode.normal",l.AmixMode="mode.Amix",l.BmixMode="mode.Bmix",l.RepeatMode="mode.Repeat",l.CompositeMode="mode.Composite",l.FadeTo="FadeTo",l.Label="Label";var d=s;exports.BusProperties=c,exports.InterfaceTypes={strip:0,bus:1},exports.StripProperties=d,exports.Voicemeeter=h,exports.types={__proto__:null};
//# sourceMappingURL=index.js.map