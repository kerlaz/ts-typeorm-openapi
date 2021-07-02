import {AccessToken, Email, RefreshToken} from "./common";

/**
 * @param email
 * @param password
 */
export type UserAuthRequest = {
    email: Email,
    password: string
}

export interface AuthResponse {
    success: boolean,
    accessToken?: string,
    refreshToken?: string
}

export interface TokenRefreshRequest {
    refreshToken: string
}

export interface TokenPair {
    accessToken: AccessToken,
    refreshToken: RefreshToken
}
export interface NewMetaData {
    fileDate: string;
    fileName: string;
    size: number;
    type: "photo" | "video";
}
export interface ExistingMetaData extends NewMetaData {
    id: number
}
export interface AddMetaRequest {
    accessToken: string,
    data: NewMetaData
}

export interface MetaResponse {
    success: boolean,
    data: ExistingMetaData | ExistingMetaData[]
}