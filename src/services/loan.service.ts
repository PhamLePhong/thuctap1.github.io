import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "src/models/book.model";
import { Loan } from "../models/loan.model";
import { User } from "src/models/user.model";


@Injectable()
export class LoansService{
    constructor(
        @InjectModel(Loan) private loanModel:typeof Loan,
        @InjectModel(Book) private bookModel : typeof Book,
    ){}
    async borrowBook(user_id:number, book_id:number):Promise<Loan>{
        const book = await this.bookModel.findOne({
            where:{
                book_id,
                
            }
        });
        if(!book||book.copies_available<=0){
            throw new Error('Sách không có sẵn');
        }
        const userHasPermission =await this.checkUserPermissions(user_id);
        if(!userHasPermission){
            throw new BadRequestException('Bạn không có quyền mượn sách.');
        }

        const currenLoansCount = await this.loanModel.count({
            where:{user_id: user_id,return_date:null},
        });
        if(currenLoansCount>=5){
            throw new BadRequestException('Bạn không thể mượn quá 5 cuốn sách cùng một lúc.');
        }
        const existingLoan = await this.loanModel.findOne({
            where: { user_id: user_id, book_id: book_id, return_date: null },
          });
          if (existingLoan) {
            throw new BadRequestException('Bạn đã mượn cuốn sách này và chưa trả.');
          }
    
        const loan = await this.loanModel.create({
            user_id: user_id,
            book_id:book_id,
            loan_date: new Date(),
            return_date: null,
            status:'active',
        });
        book.copies_available -=1;
        await book.save();
    
        return loan;
    
    }

    async returnBook(loan_id?:number,user_id?:number):Promise<Loan>{
        const loan = await this.loanModel.findOne({where: {
            loan_id,
            user_id
        }})
        // const loan = await this.loanModel.findByPk(loan_id,user_id);
        if(!loan){
            throw new Error('Đơn mượn không tồn tại.');
        }

        if(loan.return_date){
            throw new BadRequestException('Sách đã được trả.')
        }


        const book = await this.bookModel.findByPk(loan.book_id);
        if(!book){
         throw new NotFoundException('Sách không tồn tại.');
        }

        const currentDate = new Date();
        const dueDate = new Date(loan.loan_date);
        dueDate.setDate(dueDate.getDate()+14);

        let fine = 0;

        if(currentDate >dueDate){
            const daysLate = Math.ceil((currentDate.getTime()-dueDate.getTime())/(1000*3600*24));
            fine = daysLate*1;
        }

        loan.return_date = new Date();
        loan.fine = fine;
        loan.status='returned'
        await loan.save();
        book.copies_available+=1;
        await book.save();
        return loan;
    }

    private async checkUserPermissions(user_id:number):Promise<boolean>{
        const user = await User.findByPk(user_id);
        if(!user){
            return false;
        }
        return user&&(user.role==='customer'||user.role==='student');
    }
}

