"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
var Browser=(function(){
  function Browser(){
  }
  Browser.Chrome='Chrome';
  Browser.Firefox='Firefox';
  Browser.InternetExplorer='IE';
  Browser.Opera='Opera';
  Browser.Safari='Safari';
  Browser.Edge='Edge';
  Browser.Blink='Blink';
  return Browser;
}());
exports.Browser=Browser;
function getBrowser(){
  var windowObj=window;
  var isChrome=navigator.userAgent.search('Chrome') > 0;
  if (isChrome){
    return Browser.Chrome;
  }
  var isFirefox=typeof windowObj.InstallTrigger !== 'undefined';
  if (isFirefox){
    return Browser.Firefox;
  }
  var documentObj=document;
  var isIE=false||!!documentObj.documentMode;
  if (isIE){
    return Browser.InternetExplorer;
  }
  var isOpera=(!!windowObj.opr&&!!windowObj.opr.addons)||!!windowObj.opera||navigator.userAgent.indexOf(' OPR/') >= 0;
  if (isOpera){
    return Browser.Opera;
  }
  var isSafari=navigator.userAgent.search('Safari') >= 0&&navigator.userAgent.search('Chrome') < 0;
  if (isSafari){
    return Browser.Safari;
  }
  var isEdge=!isIE&&!!windowObj.StyleMedia;
  if (isEdge){
    return Browser.Edge;
  }
  var isBlink=(isChrome||isOpera)&&!!windowObj.CSS;
  if (isBlink){
    return Browser.Blink;
  }
}
exports.getBrowser=getBrowser;
function getLocation(callback){
  if (navigator.geolocation){
    navigator.geolocation.watchPosition(function(position){
      callback(position.coords);
    },function(){
      callback(null);
    });
  }
  else {
    callback(null);
  }
}
exports.getLocation=getLocation;
function getLanguage(){
  var browserLanguage=navigator.languages&&navigator.languages[0]
   ||navigator.language
   ||navigator.userLanguage;
  return browserLanguage;
}
exports.getLanguage=getLanguage;
var DefaultBrowserService=(function(){
  function DefaultBrowserService(){
  }
  DefaultBrowserService.prototype.getBrowser=function(){
    return getBrowser();
  };
  DefaultBrowserService.prototype.getLanguage=function(){
    return getLanguage();
  };
  DefaultBrowserService.prototype.getLocation=function(callback){
    getLocation(callback);
  };
  return DefaultBrowserService;
}());
exports.browser=new DefaultBrowserService();
