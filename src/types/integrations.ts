import {AccessToken, RefreshToken} from './common';
import {IAdminLoginRequest, ICompanyLoginRequest, ICustomerLoginRequest, ILoginInfo} from "./user";

export interface ISso {
    registration(username: string, password: string, userAgent: string, type: string, payload: any):void,
    login(login: IAdminLoginRequest | ICustomerLoginRequest | ICompanyLoginRequest, payload: any):Promise<ILoginInfo>,
    verify(token: string):void,
    changePassword(token: string, oldPassword: string, newPassword: string, userAgent: string): void,
    refreshToken(token: string, refreshToken: string, userAgent: string): void,
    logout(token: string): void,
    forgotPassword(username: string, password: string, userAgent: string, ip: string, type: string, payload: any): void
}
export interface SsoUserAuth {
    accessToken: AccessToken,
    refreshToken: RefreshToken,
    expire: DOMTimeStamp,
    warningMessage?: string,
}
