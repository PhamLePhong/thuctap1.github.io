import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService,
        private configService:ConfigService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')||'default-secret',
        });
    }

    async validate(payload :any){
        const user = await this.authService.validateUserById(payload.sub);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}