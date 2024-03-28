import { cleanEnv, str, port } from "envalid";
import "dotenv/config";

export function validateEnv() {
    cleanEnv(process.env, {
        MONGODB_URL: str(),
        PORT: port(),
        JWT_SECRET: str(),
        EMAIL_SERVICE: str(),
        EMAIL_HOST: str(),
        EMAIL_PORT: port(),
        EMAIL_USER: str(),
        EMAIL_PASS: str(),
      });
}