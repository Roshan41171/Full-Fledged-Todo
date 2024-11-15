export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessages {
  TODO_NOT_FOUND = "Todo Not Found",
  INVALID_INPUT_TYPE = "Invalid Input Types",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  INVALID_ID = "Invalid ID",
}
