import dotenv from "dotenv";

dotenv.config();
export const paths = {
    sso: process.env.sso_url
}
export const hosted = {
    port: 3500
}
export const secretKey = '80060b82-438c-407c-9a46-9cceed3a40a0'