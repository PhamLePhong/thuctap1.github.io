import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Roles } from './role.decorator';

function matchRoles(requireRoles:string[],userRoles:string[]):boolean{
    return requireRoles.some(role=>userRoles.includes(role));
}

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles ,context.getHandler());
        if(!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        return matchRoles(roles, user.roles);
    }
}