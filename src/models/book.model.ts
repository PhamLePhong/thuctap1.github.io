
import { AutoIncrement, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Categories } from "src/models/category.model";


@Table({
    tableName:'Books',
    timestamps: true,
})
export class Book extends Model<Book>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  book_id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  author: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;
  @Column
  total_copies:number;

  @Column
  copies_available:number;

  @ForeignKey(() => Categories) // Khóa ngoại tới User
  @Column(DataType.INTEGER)
  category_id: number; // Thêm thuộc tính user_id để thiết lập quan hệ

  @CreatedAt
  @Column(DataType.DATE)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at: Date;

}