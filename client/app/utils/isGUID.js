import isString from 'lodash/isString';

const isGUID = s => {
  if (!isString(s)) {
    return false;
  }
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!pattern.test(s)) {
    return false;
  }
  return true;
};

export default isGUID;
