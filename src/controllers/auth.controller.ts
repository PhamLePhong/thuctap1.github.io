import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "src/dto/create.dto";
// import { User } from "src/users/models/user.model";

@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService
    ) {}
    // @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() signInDto:Record<string, any>){
        return this.authService.login(signInDto.username, signInDto.password);
        
    }

    @Post('/register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body)
    }
}