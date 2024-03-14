import mong, {Document, Model} from 'mongoose'

interface userSchema extends Document{
    name:string,
    email:string,
    password:string
}

const User:Model<userSchema> = mong.model<userSchema>('user',new mong.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
}))

export default User;