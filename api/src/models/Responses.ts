// 2xx Responses
export class OkResponse<ResponseType> {
  status = 200;
  data: ResponseType;

  constructor(data: ResponseType) {
    this.data = data;
  }
}

// 4xx Responses
export class BadRequestRespose<ErrorType> {
  status = 400;
  message: string;
  error: ErrorType;

  constructor(error: ErrorType, errorMessage: string) {
    this.error = error;
    this.message = errorMessage;
  }
}

export class NotFoundResponse {
  status = 404;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

// 5xx Responses
export class InternalServerErrorResponse<ErrorType> {
  status = 500;
  message: string;
  error: ErrorType;

  constructor(error: ErrorType, message: string) {
    this.message = message;
    this.error = error;
  }
}
