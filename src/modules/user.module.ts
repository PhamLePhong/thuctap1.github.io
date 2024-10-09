import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { UsersService } from "../services/user.servive";
import { UserController } from "../controllers/user.controller";

@Module({
    imports:[SequelizeModule.forFeature([User])],
    providers:[UsersService],
    exports:[UsersService],
    controllers:[UserController],
})
export class UserModule{}