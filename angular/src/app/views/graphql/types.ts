export type Course ={
    id :number,
    name:String,
    number:number
}

export type Query = {
    courses:Course[];
}