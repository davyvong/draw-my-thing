import compressQuery from 'utils/compressQuery';

export const createRoom = compressQuery(`
    mutation {
      createRoom {
        chat {
          id
          text
          sentBy
          sentOn
        }
        code
        createdBy
        createdOn
        id
        players
      }
    }
`);

export const joinRoom = code =>
  compressQuery(`
    mutation {
      joinRoom(code: "${code}") {
        chat {
          id
          text
          sentBy
          sentOn
        }
        code
        createdBy
        createdOn
        id
        players
      }
    }
`);
