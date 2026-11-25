import dotenv from "dotenv"
import { fileURLToPath } from "url"

dotenv.config({
    path: fileURLToPath(new URL("../../.env", import.meta.url))
})

const requiredSecret = (name: string): string => {
    const value = process.env[name]
    if (!value?.trim()) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

const config = {
    port: process.env.PORT,
    connecting_String: process.env.DATABASE_URL,
    jwt_Secret: requiredSecret("JWT_SECRET"),
    refresh_Secret: requiredSecret("JWT_REFRESH_SECRET"),
}

export default config
