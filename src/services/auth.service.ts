import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create.dto';
import { UsersService } from './user.service';



@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
        private jwtService: JwtService // Inject JwtService
    ) {
        const jwtSecret = this.configService.get<string>('JWT_SECRET'); // Lưu khóa bí mật nếu cần
        console.log('JWT Secret:', jwtSecret); // Kiểm tra khóa bí mật
    }
    async register(body: CreateUserDto):Promise<void>{
        // const hashedPassword = await bcrypt.hash(body.password,10);

        try {
            await this.usersService.create(body);
        } catch (e)  {console.log(e);
        }
    }
    async validateUserById(user_id: string): Promise<any> {
        // Tìm người dùng trong cơ sở dữ liệu bằng userId
        const user = await this.usersService.findOne(user_id);
        if (user) {
            return { user_id: user.id, email: user.email, roles: user.role }; // Trả về thông tin người dùng nếu tìm thấy
        }
        return null; // Trả về null nếu không tìm thấy
    }

    async login(
        username: string,
        password:string,

    ):Promise<{access_token:string}> {
        const user = await this.usersService.findOneByUsername(username); 
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('Sai mat khau hoac tai khoan');
        }
        const payload = {sub:user.user_id, username:user.username}
        return {
            access_token: await this.jwtService.sign(payload), // Sử dụng jwtService để ký token
        };
    }
}