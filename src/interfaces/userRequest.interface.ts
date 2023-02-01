import {Request} from "express";

export default interface UserRequest extends Request {
    user?: { [key: string]: any };
}
