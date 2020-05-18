import uuidv5 from 'uuid/v5';

const NAMESPACE = '071fae5e-7e79-4346-91e4-2e363517dfe1';

function uuid(str) {
  return uuidv5(str, NAMESPACE);
}

export default uuid;
