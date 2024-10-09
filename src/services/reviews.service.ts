import { Injectable } from "@nestjs/common";
import { Review } from "src/models/review.model";

@Injectable()
export class ReviewsService{
    async addReview(user_id:number, book_id:number,rating:number,comment:string):Promise<Review>{
        const review = new Review({
            user_id:user_id,book_id:book_id,rating,comment
        });
        await review.save();
        return review;
    }
}