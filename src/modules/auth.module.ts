import { Module } from "@nestjs/common";
// import { UserModule } from "src/users/module/user.module";
import { AuthService } from "../services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../auths/local.strategy";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "../controllers/auth.controller";
import { UserModule } from "src/modules/user.module";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "../auths/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            secret:process.env.JWT_SECRET||'default-secret',
            signOptions:{expiresIn:'60s'},
        }),
        UserModule,
    ],
    providers:[AuthService, LocalStrategy, JwtStrategy],
    controllers:[AuthController],
    exports:[AuthService],
})
export class AuthModule{}