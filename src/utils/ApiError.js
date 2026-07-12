class ApiError extends Error {
    constructor(
        message,
        statusCode,
        isOperational = true,
        stack = "",
        errors = []
    ) {
        supper(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.stack = stack;
        this.errors = errors;
        this.success = false;

        if (stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};