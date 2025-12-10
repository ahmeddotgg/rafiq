export class NotFoundErr extends Error {
  status = 404;
  cause?: unknown;

  constructor(message: string = 'Resource not found', cause?: unknown) {
    super(message);
    this.name = 'NotFoundError';
    this.cause = cause;
  }
}

export class DatabaseErr extends Error {
  status = 500;
  cause?: unknown;

  constructor(message: string = 'Database error', cause?: unknown) {
    super(message);
    this.name = 'DatabaseError';
    this.cause = cause;
  }
}

export interface ValidationIssue {
  code: string;
  path: (string | number)[];
  message: string;
  expected?: string;
}

export interface ElysiaValidationError extends Error {
  type: 'validation';
  on: string;
  message: string;
}
