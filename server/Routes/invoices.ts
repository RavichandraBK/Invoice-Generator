import express, {Request, Response} from 'express';
import products from '../Models/products'
const router = express.Router();
interface ItemDetails{
    prodName:string,
    qty:number,
    rate:number
}
router.post('/add-items',async(req:Request,res:Response)=>{
    try {
        const {Prds,userId} = req.body;
        if(!(Prds && Prds.length>0)){
            res.json({message:'There are no products to add'})
        }
        else{
            const uniquePrds = Prds.filter((items:ItemDetails,index:number, self:ItemDetails[])=>{const strObj=JSON.stringify(items);index===self.findIndex((repeated:ItemDetails)=>JSON.stringify(repeated)===strObj)});
            const addPrds = await products.findOneAndUpdate({userId},{$addToSet:{items:Prds}},{upsert:true, new:true})
            res.json({message:'Products are stored successfully'});
        }

    } catch (err) {
        console.log('Error while adding products',err);
        res.status(500).json({message:'Internal server error'});
    }
})

export default router;