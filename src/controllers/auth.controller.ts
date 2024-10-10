import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "src/dto/create.dto";
import { LocalAuthGuard } from "src/auths/local-auth.guard";


@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService
    ) {}
  
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Body() signInDto:Record<string, any>){
        return this.authService.login(signInDto.username, signInDto.password);
        
    }

    @Post('/register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body)
    }
}