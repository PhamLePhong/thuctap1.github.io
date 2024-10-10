
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";


import*as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from "src/dto/create.dto";
import { User } from "src/models/user.model";


@Injectable()
export class UsersService{
    constructor(
        @InjectModel(User)
        private userModel: typeof User,

    ){}

    async create(createUserDto:CreateUserDto):Promise<User>{
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);
        return this.userModel.create({
            username:createUserDto.username,
            password:hashedPassword,
            email:createUserDto.email,
            role: createUserDto.role
        });
    }
    async findAll():Promise<User[]>{
        return this.userModel.findAll();
    }
    findOne(user_id:string): Promise<User>{
        return this.userModel.findOne({
            where:{
                user_id,
            },
        });
    }
    async findOneByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ where: { username } });
    }

    async update(user_id:string,updateUserDto:UpdateUserDto):Promise<User>{
        const user = await this.findOne(user_id);
        if(!user){
            throw new NotFoundException(`User with ID ${user_id} not found`);
        }
        Object.assign(user,updateUserDto);
        return user
    }

    async remove(user_id:string):Promise<void>{
        const user= await this.findOne(user_id);
        await user.destroy();
    }
}