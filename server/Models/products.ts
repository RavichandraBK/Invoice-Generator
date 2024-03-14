import mong, {Document, Model, Schema} from "mongoose";

interface ItemDetails{
    prodName:string,
    qty:number,
    rate:number
    total:number
}
interface Prds extends Document{
    userId:Schema.Types.ObjectId,
    items:ItemDetails[],
    createdDate:Date
}

const prdsSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, required:true},
    items:{type:[{prodName:String, qty:Number, rate:Number, total:Number}],required:true},
    createdDate:{type:Date, default:Date.now}
})
prdsSchema.virtual('createdDateFormatted').get(function(this: Prds) {
    const date = this.createdDate as Date;
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
});
const Prod = mong.model<Prds>('products',prdsSchema)

export default Prod;