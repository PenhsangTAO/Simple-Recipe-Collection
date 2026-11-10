import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            minlength: 6,
            maxlength: 12,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            maxlength: 50,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            require: true,
            minlength: 8,
            maxlength: 20,

        },
    },
    {

        timestamp: true

    },
)

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)