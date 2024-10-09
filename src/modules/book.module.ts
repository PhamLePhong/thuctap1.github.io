import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "../models/book.model";
import { BookService } from "../services/book.servive";
import { BookController } from "../controllers/book.controller";


@Module({
    imports:[SequelizeModule.forFeature([Book])],
    providers:[BookService],
    controllers:[BookController]

})
export class BookModule{}