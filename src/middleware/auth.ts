import {Request} from "express";
import jwt from "jsonwebtoken";
import {sso} from "../integrations/sso";
import {DecodedToken} from "../types/common";

export class AuthError extends Error {
    public message: string;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

export function expressAuthentication(
    request: Request,
    securityName: string,
    permissions?: string[]
): Promise<any> {
    if(securityName === 'jwt'){
        const token = request.headers["access-token"] as string;
        return new Promise<any>(async (resolve, reject) => {
            if (!token) {
                reject(new AuthError("No token provided"));
            } else {
                const decoded = jwt.decode(token) as DecodedToken | string | null;
                if(!decoded || typeof decoded === "string"){
                    reject(new AuthError("Invalid token"))
                } else {
                    try {
                        await sso.verify(token);
                        if(permissions){
                            for (let permission of permissions){
                                if(!decoded.permissions.includes(permission)){
                                    reject(new AuthError("JWT does not contain required scope."));
                                }
                            }
                        }
                        resolve(decoded)
                    } catch (e) {
                        console.error({e});
                        reject(e)
                    }
                }
            }
        })
    } else {
        return Promise.reject({})
    }
}