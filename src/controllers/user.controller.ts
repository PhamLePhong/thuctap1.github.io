import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/user.service";
import { CreateUserDto, UpdateUserDto } from "../dto/create.dto";
import { User } from "../models/user.model";
import { JwtAuthGuard } from "src/auths/jwt-auth.guard";
import { Roles } from "src/auths/roles.decorator";
import { RoleEnum } from "src/common/enum/RoleEnum";
import { RolesGuard } from "src/auths/roles.guard";

// @UseGuards(JwtAuthGuard,  RolesGuard)
@Controller('user')
 export class UserController{
    constructor(private readonly userService: UsersService){}

    @Get('test')
    @Roles(['customer'])
    @UseGuards(JwtAuthGuard, RolesGuard)
    getUser(@Request() req) {
        return req.user
    }

    @Get()
    @Roles(['staff'])
    findAll():Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':user_id')
    findOne(@Param('user_id')user_id:string):Promise<User>{
        return this.userService.findOne(user_id);
    }

   
    @Post()
    
    create(@Body() createUserDto:CreateUserDto):Promise<User>{
        return this.userService.create(createUserDto);
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