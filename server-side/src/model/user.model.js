import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 12,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 20,
            select: false
        },
    },
    {

        timestamps: true

    },
)

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Double layer defense to protect any password leak
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret;
    }
})

export const User = mongoose.model("User", userSchema)