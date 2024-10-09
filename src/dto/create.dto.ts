
export class CreateUserDto{
    
    username:string
    password:string
    email:string
    role:'student' | 'staff' | 'customer'
}

export class UpdateUserDto{
    username:string
    password:string
    email:string
    role:'student' | 'staff' | 'customer'
}

export class CreaeBookDto{
    title:string
    author: string
    description?:string
    price:number
}

export class UpdateBookDto{
    title?:string
    author?: string
    description?:string
    price?:number
}

export class CreateCategoryDto{
    category_name: string
}

export class UpdateCategoryDto{
    category_name: string
}

export class CreateLoanDto{
    user_id:number
    book_id:number
    loan_date:Date
    return_date:Date
    status:'active'|'returned'
}
export class UpdateLoanDto{
    user_id:number
    book_id:number
    loan_date:Date
    return_date:Date
    status:'active'|'returned'
}