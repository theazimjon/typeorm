import jwt from "jsonwebtoken";
import {ACCESS_KEY} from "../config/enviroment";

export function signJwt(
    object: Object) {

    return jwt.sign(object, ACCESS_KEY);
}

export function verifyJwt<T>(
    token: string
): T | null {
    try {
        const decoded = jwt.verify(token, ACCESS_KEY) as T;
        return decoded;
    } catch (e) {
        return null;
    }
}
