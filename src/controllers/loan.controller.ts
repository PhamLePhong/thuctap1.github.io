import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoansService } from "../services/loan.service";
// import { RolesGuard } from "src/auths/roles.guard";
// @UseGuards(RolesGuard)
@Controller('loans')
export class LoansController{
    constructor(private readonly loansService:LoansService){}

    @Post('borrow')
    async borrow(@Body()body:{user_id:number;book_id:number}){
        return this.loansService.borrowBook(body.user_id,body.book_id);
    }

    @Post('returnBook')
    async return(@Body()body:{loan_id:number,user_id:number}){
        return this.loansService.returnBook(body.loan_id,body.user_id);
    }

    @Post('pay-fine')
    async payFine(@Body()body:{loan_id:number;user_id:number}){
        return await this.loansService.payFine(body.loan_id,body.user_id);
    }
}