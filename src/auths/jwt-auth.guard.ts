import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
// import { IS_PUBLIC_KEY } from "src/factory/set-meta-data";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private reflector:Reflector){
        super();
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('JWT_SECRET',[
            context.getHandler(),
            context.getClass(),
        ]);
        if(isPublic){
            return true;
        }
        return super.canActivate(context);

    }

    // handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    //     if (err || !user) {
    //         throw err || new UnauthorizedException()
    //     }
    //     return user
    // }
}