export type UnknownJsonBody = Record<string, any> | Array<Record<string, any>>; // eslint-disable-line

export type ErrorResponse = {
  status: number;
  body: UnknownJsonBody;
};

export class RequestError extends Error {
  readonly body: UnknownJsonBody;

  readonly status: number;

  constructor(message: string, responseContent: ErrorResponse) {
    // 'Error' breaks prototype chain here in ES5
    super(message);
    // restore prototype chain
    Object.setPrototypeOf(this, RequestError.prototype);

    this.status = responseContent.status;
    this.body = responseContent.body;
  }
}
