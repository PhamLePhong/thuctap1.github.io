import { User } from 'src/models/user.model';
import { Reflector } from '@nestjs/core';


import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Roles } from './roles.decorator';
import { RoleEnum } from 'src/common/enum/RoleEnum';


function matchRoles(require: string[], user: string[]): boolean {
  return require.some(role => user.includes(role));
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
    // private readonly roles: RoleEnum[]
  ) { }

  canActivate(context: ExecutionContext): boolean {
    let flag = false;

    const roles = this.reflector.get<string[]>(Roles, context.getHandler());

    console.log('hihi', roles)
    if (!roles) {
      return true;
    }
    // const request = context.switchToHttp().getRequest();
    // const user = request.user
    // console.log(user)
    // if (!user) {
    //   throw new NotFoundException('User not found')
    // }
    // return matchRoles(role, user.role);

    const request = context.switchToHttp().getRequest();
    const user = request.user
    console.log(user, 'scb');
    return matchRoles(roles, user.roles)
  }
}