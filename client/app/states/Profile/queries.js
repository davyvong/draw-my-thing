import compressQuery from 'utils/compressQuery';

export const findCurrentAccount = compressQuery(`
  query {
    findCurrentAccount {
      displayName
      id
    }
  }
`);

export const signInAnonymously = compressQuery(`
  mutation ($input: CreateAccountInput!) {
    signInAnonymously (input: $input) {
        exp
        iat
        token
    }
  }
`);
