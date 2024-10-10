import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LoansController } from "src/controllers/loan.controller";
import { Book } from "src/models/book.model";
import { Loan } from "src/models/loan.model";
import { Payment } from "src/models/payment.model";
import { LoansService } from "src/services/loan.service";

@Module({
    imports:[SequelizeModule.forFeature([Loan,Book,Payment])],
    controllers:[LoansController],
    providers:[LoansService]
})
export class LoansModule{}