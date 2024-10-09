import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Book } from "src/models/book.model";
import { User } from "src/models/user.model";

@Table({
    tableName:'Loans',
    timestamps:true,
})
export class Loan extends Model<Loan>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    loan_id:number;
    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    user_id:number;
    @ForeignKey(()=>Book)
    @Column(DataType.INTEGER)
    book_id:number;
    @Column(DataType.DATE)
    loan_date:Date;
    @Column(DataType.DATE)
    return_date:Date;
    @Column({ defaultValue: 0 }) // Thêm trường fine với giá trị mặc định là 0
    fine: number;
    @Column({
        type: DataType.ENUM('active','returned'),
        allowNull: true,
    })
    status:'active'|'returned';

}