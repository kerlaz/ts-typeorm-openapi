import {ISso} from "../types/integrations";
import {EUserType, IAdminLoginRequest, ICompanyLoginRequest, ICustomerLoginRequest, ILoginInfo} from "../types/user";
import {paths} from "../config";
import axios from "axios";
import {AuthError} from "../middleware/auth";

const url = paths.sso
class Sso implements Partial<ISso>{
    public async login(login: IAdminLoginRequest | ICustomerLoginRequest | ICompanyLoginRequest, payload: any): Promise<ILoginInfo> {
        console.log(login, payload);
        console.log(url);
        let username: string | number | undefined;
        switch (login.type) {
            case EUserType.employee: username = (login as IAdminLoginRequest).email; break;
            case EUserType.customer: username = (login as ICustomerLoginRequest).phone; break;
            case EUserType.partner: username = (login as ICompanyLoginRequest).bin; break;
        }
        if(!username) throw new AuthError("username not provided");
        try {
            let {data} = await axios.post<ILoginInfo>(`${url}/login`, {
                username,
                password: login.password,
                group: login.type,
                userAgent: login.userAgent,
                userIp: login.ip,
                payload
            });
            return data;
        } catch (e) {
            console.error('RES',e.response);
            if(e.response.status === 401){
                throw new AuthError(e.response.data.fullMessage)
            } else {
                throw new Error("SSO login failed")
            }
        }
    }
    public async logout(token: string){
        try {
            let {data} = await axios.post(`${url}/logout`,{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(data);
            return !!data;
        } catch (e) {
            console.error(e);
            throw new Error("SSO logout failed")
        }
    }
    public async verify(token: string){
        try {
            console.log("Testing token:",token);
            let {data} = await axios.post(`${url}/verify`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("SSO Response", data);
            return !!data;
        } catch (e) {
            console.error(e);
            if(e.response.status === 401){
                throw new AuthError(e.response.data.fullMessage)
            } else {
                throw new Error("SSO verify failed")
            }
        }
    }
}

export const sso = new Sso()