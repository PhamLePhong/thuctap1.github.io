import { AuthService } from '../services/auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,

    ) {
        super();
    }

    async validate(
        user_id: string
    ): Promise<any> {


        const user = await this.authService.validateUserById(user_id);
        console.log(user, 'userLogin');
        
        if (!user) {
            throw new UnauthorizedException();

        }
        return user
    }
}