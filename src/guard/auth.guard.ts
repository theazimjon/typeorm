import { Request, Response, NextFunction } from 'express';
import {verifyJwt} from "../helpers/jwt.helper";
import UserRequest from "../interfaces/userRequest.interface";


export default async function authGuard(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.cookies['token'];

    if(!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
        const user = verifyJwt(token)
        if(user){
            req.user = user;
            return next();
        }
        return res.status(401).json({message: 'Unauthorized'});
    }
    catch (err){
        return res.status(401).json({message: 'Unauthorized'});
    }
}
