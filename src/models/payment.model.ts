
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Loan } from "./loan.model";

@Table
export class Payment extends Model<Payment>{
    @ForeignKey(()=>Loan)
    @Column
    loan_id:number;
    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false,
      })
    amount:number;
    @Column
    payment_date:Date;
}