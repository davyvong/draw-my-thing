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
