import {  AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Book } from "src/models/book.model";


@Table({
    tableName:'Categories',
    timestamps:true,
})
export class Categories extends Model<Categories>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    category_id:number;

    @Column({
        type:DataType.STRING(255),
        allowNull:false,
        unique:true,
    })
    category_name:string;

    @ForeignKey(()=>Book)
    @Column(DataType.INTEGER)
    book_id:number

}