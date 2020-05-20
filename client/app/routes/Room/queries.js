import compressQuery from 'utils/compressQuery';

export const subscribeRoomEvents = compressQuery(`
  subscription {
    roomEvents {
      code
      data
      type
    }
  }
`);
