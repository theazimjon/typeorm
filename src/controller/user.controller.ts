import { NextFunction, Request, Response } from "express"
import UserService from "../services/user.service";
import UserRequest from "../interfaces/userRequest.interface";
import sendError from "../helpers/send.error";
import { UserDto } from "../dtos/user.dto";
import { queryGetWithPagination } from "../dtos/common.dto";

export class UserController {

    private userService;

    constructor(){
        this.userService = new UserService()
    }

    async all(request: Request, response: Response, next: NextFunction) {
        try{
            const {page = 1, count = 20} = await queryGetWithPagination(request.query);
            const users = await this.userService.all(page, count);
            return response.status(200).json({count: users.length, users:users.map( user =>  UserDto.output(user))});
        }
        catch(err){
            sendError(response, err)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try{
            const id = parseInt(request.params.id);
            const user = this.userService.one(id);
            return response.status(200).json({user: UserDto.output(user)});
        }
        catch(err){
            sendError(response, err)
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{
            const obj = await UserDto.create(request.body);
            const user = await this.userService.save(obj);
            return response.status(201).json({user: UserDto.output(user)});
        }
        catch(err){
            sendError(response, err)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try{
            const id = parseInt(request.params.id);
            request.body.password = undefined;
            const obj = await UserDto.default(request.body);
            const user = await this.userService.update(id, obj);
            response.status(200).json({user: UserDto.output(user)})
        }
        catch(err){
            sendError(response, err)
        }
    }
    async delete(request: Request, response: Response, next: NextFunction) {
        try{
            const id = parseInt(request.params.id);
            const user = await this.userService.remove(id);
            return response.status(200).json({message: "Deleted successfully", user: UserDto.output(user)});
        }
        catch(err){
            sendError(response, err)
        }
    }

    async signUp(request: Request, response: Response, next: NextFunction) {
       try{
            const obj = await UserDto.create(request.body);   
    
            const {user, token} =  await this.userService.signup(obj);
            response.cookie("token", token, {
                httpOnly: true
            });
            response.status(201).json({message: "Successfully signed up", user: UserDto.output(user)});
        }
        catch(err){
            sendError(response, err)
        }
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        try{
            const {email, password} = await UserDto.login(request.body);
            const {user, token} = await this.userService.signin(email, password);
            response.cookie("token", token, {
                httpOnly: true
            })

            response.status(200).json({message: "Successfully signed in", user});
        }
        catch(err){
            sendError(response, err)
        }
    }
    async logout(request: Request, response:Response, next: NextFunction) {
        console.log(1);
        try{
            response.cookie('token', null);
            return response.status(200).json({message: "Successfully logged out"});
        }
        catch(err){
            sendError(response, err)
        }
    }

    async changePassword(request: UserRequest, response: Response, next: NextFunction) {
        try{
            const {password, newPassword} = await UserDto.default(request.body);
            const id = request.user.id;
            const user = await this.userService.changePassword(id, password, newPassword);
            return response.status(200).json({message: "password changed", user: UserDto.output(user)});
        }
        catch(err){
            sendError(response, err)
        }
    }

}
