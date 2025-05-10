export class BaseError extends Error {
  status = 500;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}
export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(400, message);
  }
}
export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(404, message);
  }
}
export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(401, message);
  }
}
export class ForbiddenError extends BaseError {
  constructor(message?: string) {
    super(403, message);
  }
}
