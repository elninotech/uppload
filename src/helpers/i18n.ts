let i18n: any = {};

var flattenObject = function(ob: any) {
  const toReturn: any = {};
  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if (typeof ob[i] == "object") {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const setI18N = (translations: any) => {
  i18n = flattenObject(translations);
};

export const translate = (key: string) => {
  try {
    return i18n[key];
  } catch (error) {
    return "";
  }
};
