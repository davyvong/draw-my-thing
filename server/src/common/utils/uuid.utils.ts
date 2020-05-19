import uuidv5 from 'uuid/v5';

export function uuid(str) {
  return uuidv5(str, process.env.UUID_NAMESPACE);
}
