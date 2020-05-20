import compressQuery from 'utils/compressQuery';

export const createRoom = compressQuery(`
    mutation {
      createRoom {
        chat {
          id
          sender
          text
          timestamp
        }
        code
        createdBy
        createdOn
        id
        players {
          displayName
          id
        }
      }
    }
`);

export const joinRoom = code =>
  compressQuery(`
    mutation {
      joinRoom(code: "${code}") {
        chat {
          id
          sender
          text
          timestamp
        }
        code
        createdBy
        createdOn
        id
        players {
          displayName
          id
        }
      }
    }
`);
