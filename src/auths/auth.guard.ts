
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
function validateRequest(request:any):boolean{
    const token= request.headers['authorization'];
    return !!token;
}
@Injectable()
export class AuthGuard implements CanActivate{
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const request = context.switchToHttp().getRequest();
       return validateRequest(request);
   }
}