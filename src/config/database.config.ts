import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Book } from "src/models/book.model";
import { Categories } from "src/models/category.model";
import { Loan } from "src/models/loan.model";
import { Review } from "src/models/review.model";
import { User } from "src/models/user.model";

export const databaseConfig: SequelizeModuleOptions= {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Phong',
    database: 'abls',
    models: [User,Book,Categories,Loan,Review], // Thêm các mô hình khác nếu có
    autoLoadModels: true,
    synchronize: true
}