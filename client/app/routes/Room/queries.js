import compressQuery from 'utils/compressQuery';

export const findRoom = code =>
  compressQuery(`
    query {
      findRoom(code: "${code}") {
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

export const sendMessage = ({ code, message }) =>
  compressQuery(`
    mutation {
      sendMessage(code: "${code}", message: "${message}") {
        id
        sender
        timestamp
        text
        type
      }
    }
`);

export const roomEvents = compressQuery(`
  subscription {
    roomEvents {
      code
      data
      type
    }
  }
`);
