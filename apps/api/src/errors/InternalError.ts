import { HttpException, HttpStatus } from '@nestjs/common';

class InternalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends InternalError {
  constructor(message = 'Resource not found') {
    super(message);
  }
}

class UnauthorizedError extends InternalError {
  constructor(message = 'Unauthorized access') {
    super(message);
  }
}

class BadRequestError extends InternalError {
  constructor(message = 'Bad request') {
    super(message);
  }
}

class ForbiddenError extends InternalError {
  constructor(message = 'Forbidden access') {
    super(message);
  }
}

class InternalServerError extends InternalError {
  constructor(message = 'Internal server error') {
    super(message);
  }
}

class ConflictError extends InternalError {
  constructor(message = 'Conflict error') {
    super(message);
  }
}

class EmailTakenError extends HttpException {
  constructor() {
    super('Email is already taken', HttpStatus.CONFLICT);
  }
}

class UsernameTakenError extends HttpException {
  constructor() {
    super('Username is already taken', HttpStatus.CONFLICT);
  }
}

class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.UNAUTHORIZED);
  }
}

class InvalidPasswordError extends HttpException {
  constructor() {
    super('Invalid password', HttpStatus.UNAUTHORIZED);
  }
}

class AuthProviderError extends HttpException {
  constructor() {
    super(
      'User is authenticated with another provider',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  ConflictError,
  EmailTakenError,
  UsernameTakenError,
  UserNotFoundError,
  InvalidPasswordError,
  AuthProviderError,
};
