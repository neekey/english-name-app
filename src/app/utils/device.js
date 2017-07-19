import MobileDetect from 'mobile-detect';
const md = new MobileDetect(window.window.navigator.userAgent);
export const IS_MOBILE = !!md.mobile();
