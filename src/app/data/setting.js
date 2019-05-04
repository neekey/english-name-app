const SETTING_KEY = 'english_number_app_setting';
const DEFAULT_SETTING = {
  testNumberUpperLimit: 1000000,
  testRoundSize: 5,
};


export function saveSetting(setting) {
  localStorage.setItem(SETTING_KEY, JSON.stringify(setting));
}

export function getSetting() {
  const settingStr = localStorage.getItem(SETTING_KEY);
  if (settingStr) {
    return JSON.parse(settingStr);
  }
  return DEFAULT_SETTING;
}
