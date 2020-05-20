import { v5 as uuidv5 } from 'uuid';

export function uuid(str) {
  return uuidv5(str, process.env.UUID_NAMESPACE);
}
