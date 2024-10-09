import { Categories } from '../models/category.model';
// import { UserModule } from './../../users/module/user.module';
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
// import { Sequelize } from "sequelize";


@Module({
    imports:[SequelizeModule.forFeature([Categories])],
    providers:[CategoryService],
    controllers:[CategoryController]
})
export class CategoriesModule{}