
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "src/dto/create.dto";
import { Categories } from "src/models/category.model";


@Controller('Categories')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @Post()
    create(@Body() createCategoryDto:CreateCategoryDto):Promise<Categories>{
        return this.categoryService.create(createCategoryDto);
    }
    @Get()
    findAll():Promise<Categories[]>{
        return this.categoryService.findAll();
    }
    @Get(':category_id')
    findOne(@Param('category_id')category_id:string):Promise<Categories>{
        return this.categoryService.findOne(category_id);
    }

    @Put(':category_id')
    update(@Param('category_id')category_id:string, @Body() updateCategoryDto:UpdateCategoryDto):Promise<Categories>{
        return this.categoryService.update(category_id,updateCategoryDto);

    }
    @Delete(':category_id')
    remove(@Param('category_id')category_id:string):Promise<void>{
        return this.categoryService.remove(category_id);
    }


}