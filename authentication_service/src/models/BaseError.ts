/**
 * The different possible error codes for examfy errors and their meaning.
 * The first number will indicate the type of error:
 *
 * Error response:
 *
 * {
 *
 *     success: false,
 *
 *     errno: xxx,
 *
 *     error: This is the error message
 *
 * }
 */

class BaseError {
    // The error outputed by the computer
    error: string;
    // The error code using the Examfy Error codes
    errno: number;
    // A human-friendly error message that describe the error in one sentence
    message: string;
    status: number = 500;
    private _error_codes: any = {
        0: "Unexpected error",
        1: "Problem connecting to the database",
        2: "Invalid db query",
        3: "Invalid parameters",
        4: "Resource not found",
        5: "Passwords do not match",
        6: "Invalid token",
        other: 'Unknown error'
    }

    constructor(fields: { errno: number, error: string, status?: number }) {
        this.errno = fields.errno;
        this.error = fields.error;
        if (fields.status != undefined) {
            this.status = fields.status;
        }
        this.message = this._error_codes[fields.errno];
        if (this.message == undefined) {
            this.message = this._error_codes.other
        }
    }

    toJSON() {
        return {success: false, error: this.error, errno: this.errno, message: this.message}
    }

}

export = BaseError
