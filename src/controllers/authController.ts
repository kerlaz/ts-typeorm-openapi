import {Body, Post, Route, Tags} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {AuthResponse, TokenRefreshRequest, UserAuthRequest} from "../types/req-res";
import {authService} from "../services/authService";


@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
    @Post("/signIn")
    public async signIn(
        @Body() params: UserAuthRequest
    ):Promise<AuthResponse> {
        console.log(params);
        const {accessToken, refreshToken} = await authService.login(params)
        return {
            success: true,
            accessToken,
            refreshToken
        }
    }
    @Post("/signUp")
    public async signUp(
        @Body() params: UserAuthRequest
    ):Promise<AuthResponse> {
        console.log(params);
        const {accessToken, refreshToken} = await authService.register(params)
        return {
            success: true,
            accessToken,
            refreshToken
        }
    }
    @Post("/refresh")
    public async refresh(
        @Body() params: TokenRefreshRequest
    ):Promise<AuthResponse> {
        console.log(params)
        const {accessToken, refreshToken} = await authService.refresh(params.refreshToken)
        return {
            success: true,
            accessToken,
            refreshToken
        }
    }
}