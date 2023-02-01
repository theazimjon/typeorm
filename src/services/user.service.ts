import { AppDataSource } from '../config/data-source';
import { User } from "../entity/User"
import {signJwt} from "../helpers/jwt.helper";
import {compare} from "../helpers/bcrypt.helper";
import AppError from "../helpers/app.error";
import UserEntityInterface from "../interfaces/userEntity.interface";

export default class UserService {

    private userRepository = AppDataSource.getRepository(User)

    async all(page: number, count: number) {
        console.log(page, count);
        
        return this.userRepository.find({
            skip: page - 1,
            take: count
        })
    }

    async one(id: number) {
        const user = await this.userRepository.findOne({
            where: { id }
        })
        if (!user) {
            throw  new AppError("user not found", 404)
        }
        return user
    }

    async save(obj: UserEntityInterface) {
        const { firstName, lastName, email, password } = obj;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password
        })

        return this.userRepository.save(user);
    }

    async update(id, obj: UserEntityInterface) {
        let user = await this.userRepository.findOneBy({ id })
        if(!user){
            throw new AppError("user not found", 404)
        }

        const { firstName, lastName, email } = obj;

        return await this.userRepository.save({...user, firstName, lastName, email })
    }


    async remove(id: number) {
        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            throw new AppError("user not found", 404)
        }

        return await this.userRepository.remove(userToRemove)
    }
    async signup(obj: UserEntityInterface){
        const user = await this.save(obj);
        const {id, email} = user;
        const token = signJwt({id, email});
        return {user, token};
    }

    async signin(email: string, password: string){
        const user = await this.findByEmail(email);

        if(!user){
            throw new AppError("not found", 404)

        }
        if(! await compare(password, user.password)){
            throw new AppError("invalid password", 403)
        }

        const token = signJwt({id : user.id, email: user.email});
        return {user, token};
    }

    async changePassword(id: number, password: string, newPassword: string){
        const user = await this.userRepository.findOneBy({ id })

        if(!user){
            throw new AppError("not found", 404)
        }
        if(! await compare(password, user.password)){
            console.log(1);
            
            throw new AppError("invalid password", 403)
        }
        user.password = newPassword;
        return this.userRepository.save(user);
    }

    findByEmail(email){
        return this.userRepository.findOne({where: { email}});
    }
}
