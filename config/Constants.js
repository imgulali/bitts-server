import { configDotenv } from "dotenv"
configDotenv();

export const PORT = process.env.PORT || 5000;
export const MongoURI = process.env.MongoURI; //Add a Mongodb Url
export const JwtKey = process.env.JwtKey; // Add your Jwt Key