/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 * @example {
 *  "id": "52907745-7672-470e-a803-a2f8feb52944",
 *  "email": "john@doe.com",
 *  "name": "John Doe",
 *  "status": "Happy"
 *  "phoneNumbers": []
 * }
 */
import {AccessToken, BIN, Email, PhoneNumber, RefreshToken, SMSCode, UUID} from "./common";

export interface User {
    id: UUID;
    /**
     * The email the user used to register his account
     */
    email: Email;
    name: UserName;
    /**
     * @example "Happy"
     */
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
}
/**
 * @isString
 * @minLength 2
 */
export type UserName = string;

/**
 * User types
 */
export enum EUserType {
    customer = 'customer',
    partner = 'partner',
    leadPartner = 'leadPartner',
    employee = 'employee'
}
/**
 * @isString
 * @minLength 2
 */
export interface ILoginRequest {
    password: string,
    type?: EUserType,
    userAgent?: string,
    ip?: string,
    // TODO: replace with Customer | Partner | LeadPartner models
    userData?: any
}
export interface IAdminLoginRequest extends ILoginRequest {
    email: Email
}
export interface ICompanyLoginRequest extends ILoginRequest {
    bin: BIN
}
export interface ICustomerLoginRequest extends ILoginRequest {
    phone: PhoneNumber
}
export interface ILoginInfo {
    accessToken: AccessToken,
    refreshToken: RefreshToken,
    expire: number,
    need_sms_confirmation?: SMSCode | boolean,
    warningMessage?: string,
}