import { CreaeBookDto, UpdateBookDto } from 'src/dto/create.dto';
import { BookService } from '../services/book.servive';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Render, UseGuards } from "@nestjs/common";
import { Book } from '../models/book.model';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { RolesGuard } from 'src/auths/roles.guard';
import { Roles } from 'src/auths/roles.decorator';


@Controller('book')
export class BookController{
    constructor(private readonly bookService:BookService){}
    @Get()
    @Render('book.ejs')
    async getAllBooks(){
        const books = await this.bookService.findAll();
        return {books};
    }
   
    @Get()
    findAll():Promise<Book[]>{
        return this.bookService.findAll();
    }

    @Get(':book_id')
    findOne(@Param('book_id')book_id:string):Promise<Book>{
        return this.bookService.findOne(book_id);
    }
    @Get('search')
    async search(@Query('query')query:string):Promise<Book[]>{
        return this.bookService.searchBooks(query);
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    // @Roles('staff')
    
    @Post()
    create(@Body() createBookDto:CreaeBookDto):Promise<Book>{
        return this.bookService.create(createBookDto);

    }
    @Put(':book_id')
    update(@Param('book_id')book_id:string, @Body() updateBookDto:UpdateBookDto):Promise<Book>{
        return this.bookService.update(book_id,updateBookDto);
    }

    @Delete(':book_id')
    remove(@Param('book_id')book_id:string):Promise<void>{
        return this.bookService.remove(book_id);
    }
}