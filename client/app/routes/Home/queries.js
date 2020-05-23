import compressQuery from 'utils/compressQuery';

export const createRoom = compressQuery(`
    mutation ($input: UpdateAccountInput!) {
      updateAccount (input: $input) {
        displayName
        id
      }
      createRoom {
        id
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
        id
      }
    }
`);
