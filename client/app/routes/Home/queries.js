import compressQuery from 'utils/compressQuery';

export const createRoom = compressQuery(`
    mutation ($input: UpdateAccountInput!) {
      updateAccount (input: $input) {
        displayName
        id
      }
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
    mutation ($input: UpdateAccountInput!) {
      updateAccount (input: $input) {
        displayName
        id
      }
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
