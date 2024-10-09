import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Categories } from "../models/category.model";
import { CreateCategoryDto, UpdateCategoryDto } from "src/dto/create.dto";


@Injectable()
export class CategoryService{
    constructor(
        @InjectModel(Categories)
        private categoryModel:typeof Categories,
    ){}

    create(createCategoryDto:CreateCategoryDto):Promise<Categories>{
        return this.categoryModel.create({
            category_name:createCategoryDto.category_name
        })
    }
    async findAll():Promise<Categories[]>{
        return this.categoryModel.findAll();
    }

    findOne(category_id:string):Promise<Categories>{
        return this.categoryModel.findOne({
            where:{
                category_id,
            },
        });
    }

    async update(category_id:string,updateCategoryDto:UpdateCategoryDto):Promise<Categories>{
        const category =await this.findOne(category_id);
        if(!category){
            throw new NotFoundException(`${category_id} not found`);
        }
        Object.assign(category,updateCategoryDto);
        return category
    }

    async remove(category_id:string):Promise<void>{
        const category=await this.findOne(category_id);
        await category.destroy();
    }
}