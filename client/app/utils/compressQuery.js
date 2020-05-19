import compress from 'graphql-query-compress';

function compressQuery(query) {
  return compress(query).trim();
}

export default compressQuery;
