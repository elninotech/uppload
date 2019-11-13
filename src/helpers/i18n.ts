let i18n: any = {};

const flattenObject = function(ob: any) {
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

/**
 *
 * @param translations
 */
export const setI18N = (translations: any) => {
  i18n = flattenObject(translations);
};

/**
 * Get a translation from i18n setting
 * @param key - Translation key
 * @param params - Single term or array of variables
 */
export const translate = (key: string, params?: string | string[]) => {
  try {
    let term = i18n[key] as string;
    if (typeof params === "string") params = [params];
    if (params)
      params.forEach((param, index) => {
        term = term.replace(`$${index + 1}$`, param);
      });
    return term;
  } catch (error) {
    return "";
  }
};
