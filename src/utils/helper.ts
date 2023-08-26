class Helper {
  flattenObject(obj: Record<string, any>, parentKey = ''): Record<string, any> {
    let result: Record<string, any> = {};

    for (const key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        const nestedObject = this.flattenObject(obj[key], newKey);
        result = { ...result, ...nestedObject };
      } else {
        result[newKey] = obj[key];
      }
    }

    return result;
  }
}

const helper = new Helper();

export default helper;
