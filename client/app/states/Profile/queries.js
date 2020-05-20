import compressQuery from 'utils/compressQuery';

export const signInAnonymously = compressQuery(`
  mutation ($input: CreateAccountInput!) {
    signInAnonymously (input: $input) {
        exp
        iat
        token
    }
  }
`);

export const updateAccount = compressQuery(`
  mutation ($input: UpdateAccountInput!) {
    updateAccount (input: $input) {
      displayName
      id
    }
  }
`);
