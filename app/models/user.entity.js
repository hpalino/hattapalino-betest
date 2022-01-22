import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    accountNumber: {
        type: String,
        index: true,
    },
    emailAddress: {
        type: String,
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
})

const userEntity = mongoose.model('userSchema', userSchema);
export default userEntity
