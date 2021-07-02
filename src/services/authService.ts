import {TokenPair, UserAuthRequest} from "../types/req-res";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {AccessToken, Email, RefreshToken} from "../types/common";
import jwt from "jsonwebtoken";
import {secretKey} from "../config";
import {v4} from "uuid"
import {Token} from "../entity/Token";
import {BadRequest} from "../types/errors";
import {AuthError} from "../middleware/auth";

class AuthService {
    public async register (newUser: UserAuthRequest): Promise<TokenPair> {
        const userRepo = await getRepository(User);
        const userExists = await userRepo.findOne({where: {
            email: newUser.email
            }});
        if(userExists){
            throw new BadRequest('user exists');
        }
        const uRes = await userRepo.insert({...newUser});
        console.log({uRes});
        return await AuthService.getTokens(newUser.email)
    }
    public async login (user: UserAuthRequest): Promise<TokenPair> {
        const userRepo = await getRepository(User);
        const userExists = await userRepo.findOne({where: {
                email: user.email,
                password: user.password
            }});
        if(!userExists){
            throw new BadRequest('email or password incorrect')
        }
        await AuthService.unsetRefreshToken(user.email);
        return await AuthService.getTokens(user.email);

    }
    public async refresh(token: RefreshToken): Promise<TokenPair> {
        const tokenRepo = await getRepository(Token);
        const existingToken = await tokenRepo.findOne({where: {token}});
        if(!existingToken){
            throw new BadRequest('invalid refresh token')
        }
        return await AuthService.getTokens(existingToken.email);
    }
    public static async getTokens(email: Email): Promise<TokenPair> {
        const accessToken: AccessToken = jwt.sign({email}, secretKey);
        const refreshToken: RefreshToken = v4();
        const tokenRepo = await getRepository(Token);
        const tRes = await tokenRepo.insert({token: refreshToken, email});
        console.log(tRes)
        return {accessToken, refreshToken}
    }
    public static async unsetRefreshToken(email: Email): Promise<void> {
        const tokenRepo = await getRepository(Token);
        await tokenRepo.createQueryBuilder().delete().where({email}).printSql().execute()
    }
    public checkToken(token: AccessToken): { valid: boolean, email: string } {
        try {
            const decoded = jwt.verify(token, secretKey) as {email: string};
            console.log({decoded})
            const {email} = decoded;
            return {
                valid: !!email,
                email
            };
        } catch (e) {
            console.log(e);
            throw new AuthError("invalid token")
        }
    }
}

export const authService = new AuthService()