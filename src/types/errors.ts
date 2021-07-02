export interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

export class BadRequest extends Error {
    public message: string;
    constructor(message: string) {
        super();
        this.message = message;
    }
}