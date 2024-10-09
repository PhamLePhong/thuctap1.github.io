import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/user.servive";
import { CreateUserDto, UpdateUserDto } from "../dto/create.dto";
import { User } from "../models/user.model";
import { RolesGuard } from "src/auths/roles.guard";
import { Roles } from "src/auths/role.decorator";

@Controller('user')
 export class UserController{
    constructor(private readonly userService: UsersService){}
    @UseGuards(RolesGuard)
    @Roles(['staff'])
    @Post()
    
    create(@Body() createUserDto:CreateUserDto):Promise<User>{
        return this.userService.create(createUserDto);
    }
    @Get()
    findAll():Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':user_id')
    findOne(@Param('user_id')user_id:string):Promise<User>{
        return this.userService.findOne(user_id);
    }

    @Put(':user_id')
    update(@Param('user_id')user_id:string, @Body() updateUserDto: UpdateUserDto):Promise<User>{
        return this.userService.update(user_id,updateUserDto);
    }

    @Delete(':user_id')
    remove(@Param('user_id')user_id:string):Promise<void>{
        return this.userService.remove(user_id);
    }
 }