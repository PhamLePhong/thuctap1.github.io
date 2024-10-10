
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
// import { Observable } from "rxjs";
// function validateRequest(request:any):boolean{
//     const token = request.headers['authorization'];
//     return !!token;
// }


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {
        
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
   async canActivate(context: ExecutionContext): Promise<boolean>{

    
       const request = context.switchToHttp().getRequest();
       const token = this.extractTokenFromHeader(request)

       if(request.url === '/auth/login'||request.url === '/auth/register'){
        return true
       }
       if (!token) {
        throw new UnauthorizedException('Token không hợp lệ');
    }


       try {
        console.log('auth guard')
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
           })
           request.user = payload
       } catch (e) {
        throw new UnauthorizedException('hihi')
       }
       return true

   }
}