import mongoose from "mongoose";



const UserSchema = mongoose.Schema(
    {
        user: {type: String, required: true},
        password : {type :String, required: true}
    }
)

const UserModel = mongoose.model('User Schema Created Succesfully', UserSchema)

export default UserModel