export class Browser {
  static Chrome = 'Chrome';
  static Firefox = 'Firefox';
  static InternetExplorer = 'IE';
  static Opera = 'Opera';
  static Safari = 'Safari';
  static Edge = 'Edge';
  static Blink = 'Blink';
}

export interface BrowserService {
  getBrowser(): string;
  getLanguage(): string;
  getLocation(callback: (p: any) => void): void;
}

export function getBrowser(): string {
  // Chrome 1+
  const windowObj: any = window;
  const isChrome = navigator.userAgent.search('Chrome') > 0;
  if (isChrome) {
    return Browser.Chrome;
  }

  // Firefox 1.0+
  const isFirefox = typeof windowObj.InstallTrigger !== 'undefined';
  if (isFirefox) {
    return Browser.Firefox;
  }

  // Internet Explorer 6-11y
  const documentObj: any = document;
  const isIE = /*@cc_on!@*/false || !!documentObj.documentMode;
  if (isIE) {
    return Browser.InternetExplorer;
  }
  const isOpera = (!!windowObj.opr && !!windowObj.opr.addons) || !!windowObj.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  if (isOpera) {
    return Browser.Opera;
  }
  // At least Safari 3+: "[object HTMLElementConstructor]"
  const isSafari = navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0;
  if (isSafari) {
    return Browser.Safari;
  }
  // Edge 20+
  const isEdge = !isIE && !!windowObj.StyleMedia;
  if (isEdge) {
    return Browser.Edge;
  }
  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!windowObj.CSS;
  if (isBlink) {
    return Browser.Blink;
  }
}

export function getLocation(callback: (p: any) => void): void {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      callback(position.coords);
    }, () => {
      callback(null);
    });
  } else {
    callback(null);
  }
}

export function getLanguage(): string {
  const browserLanguage = navigator.languages && navigator.languages[0] // Chrome / Firefox
    || navigator.language   // All
    // @ts-ignore
    || navigator.userLanguage; // IE <= 10
  return browserLanguage;
}

class DefaultBrowserService implements BrowserService {
  getBrowser(): string {
    return getBrowser();
  }
  getLanguage(): string {
    return getLanguage();
  }
  getLocation(callback: (p: any) => void): void {
    getLocation(callback);
  }
}

export const browser = new DefaultBrowserService();
