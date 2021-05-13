import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Requested path was not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError() {
        return [ { message: "Not found" } ]
    }
}