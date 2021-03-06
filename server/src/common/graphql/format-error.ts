import { HttpException, HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import get from 'lodash/get';
import { GenericException } from 'src/common/models/generic-exception';

function getStatusCode(error: any): number {
  switch (error.constructor) {
    case HttpException:
      return error.getStatus();
    case GraphQLError:
      return get(error, 'extensions.exception.status', HttpStatus.INTERNAL_SERVER_ERROR);
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export function formatError(error: GraphQLError): GenericException {
  return {
    message: error.message,
    statusCode: getStatusCode(error),
    timestamp: new Date().toISOString(),
    type: error.constructor.name,
  };
}
