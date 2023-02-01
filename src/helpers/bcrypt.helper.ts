import bcrypt from "bcrypt";

export function compare(password: string, actualPassword: string){
    //
    return bcrypt.compare(password, actualPassword)
}

export function hash(password: string){
    //
    return bcrypt.hash(password, 12);
}
