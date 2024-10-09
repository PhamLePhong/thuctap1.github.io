import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "../models/book.model";
import { CreaeBookDto, UpdateBookDto } from "src/dto/create.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

@Injectable()
export class BookService{
    constructor(
        @InjectModel(Book)
        private readonly BookModel:typeof Book,
    ){}

    create(createBookDto:CreaeBookDto):Promise<Book>{
        return this.BookModel.create({
            title:createBookDto.title,
            author:createBookDto.author,
            description:createBookDto.description,
            price:createBookDto.price,

        });
    }

    async findAll():Promise<Book[]>{
        return this.BookModel.findAll();
    }

    findOne(book_id:string):Promise<Book>{
        return this.BookModel.findOne({
            where:{
                book_id,
            },
        });
    }

    async update(book_id:string, updateBookDto:UpdateBookDto):Promise<Book>{
        const book= await this.findOne(book_id);
        if(!book){
            throw new NotFoundException(`${book_id} not found`);
        }
        Object.assign(book,updateBookDto);
        return book
    }

    async remove(book_id:string):Promise<void>{
        const book = await this.findOne(book_id);
        await book.destroy();
    }

    async searchBooks(query: string):Promise<Book[]>{
        return this.BookModel.findAll({
           where:{
            [Op.or]:[
                {title:{[Op.like]:`%{query}%`}},
                {author:{[Op.like]:`%{query}%`}},
                {description:{[Op.like]:`%{query}%`}},
            ],
           },
        });
    }
}