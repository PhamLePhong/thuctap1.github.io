
import { AutoIncrement, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
// import { Book } from "src/models/book.model";

@Table({
    tableName:'Users',
    timestamps: true,
})
export class User extends Model<User>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    user_id:number;
    @Column({
        type:DataType.STRING(255),
        allowNull:false,
        unique:true,
    })
    username:string;
    @Column({
        type:DataType.STRING(255),
        allowNull:false,
    })
    password:string;
    @Column({
        type:DataType.STRING(255),
        allowNull:false,
        unique:true,
    })
    email:string;
    @Column({
        type: DataType.ENUM('student', 'staff', 'customer'),
        allowNull: true,
      })
      role: 'student' | 'staff' | 'customer';
    
      @CreatedAt
      @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
      })
      created_at: Date;
    
      @UpdatedAt
      @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
      })
      updated_at: Date;

      // @HasMany(()=>Book)
      // book: Book[];

}