import { Response } from "express";

export default function(res: Response, err){
    console.log(err);
    if(err.isOperational)
        return res.status(err.statusCode).json({message: err.message})

    return res.status(500).json({message: err.message});
}