import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Book } from "./book.model";
import { User } from "./user.model";

@Table({
    tableName:'Reviews',
    timestamps:true,
})
export class Review extends Model<Review>{
    @PrimaryKey
  @AutoIncrement
  @Column
  review_id: number;

  @ForeignKey(() => Book)
  @Column
  book_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  rating: number; // Đánh giá từ 1 đến 5

  @Column
  comment: string; // Nhận xét của người dùng
}