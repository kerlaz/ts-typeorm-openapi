/**
 * @isString
 * @minLength 4
 * @pattern ^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$
 */
import {EUserType} from "./user";

export type Email = string;
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;
export type AccessToken = string;
export type RefreshToken = string;
/**
 * 12 digits
 * @min 100000000000
 * @max 999999999999
 */
export type BIN = number;
/**
 * 10 digits
 * @min 7000000000
 * @max 7999999999
 */
export type PhoneNumber = number;
/**
 * @example +77771112233
 * @pattern ^+7[0-9]{10}$
 */
export type PhoneString = string;
/**
 * SMS Code
 * @example 1457
 * @min 1000
 * @max 9999
 */
export type SMSCode = number;
export type DecodedToken = {
    id: number,
    exp: number,
    iat: number,
    agent: string,
    payload: {
        user_type: EUserType
    }
    permissions: string[]
    [key:string]:any
}