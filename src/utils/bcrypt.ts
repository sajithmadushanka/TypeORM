import * as bcrypt from 'bcrypt';

const SALT = 10;
export async function encodePassword(rowPassword:string){
    return bcrypt.hash(rowPassword, SALT);
}

export async function comparePassword(rowPassword:string, hashPassword:string){
    return bcrypt.compare(rowPassword, hashPassword);
}