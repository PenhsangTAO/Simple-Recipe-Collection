import mongoose, { Schema } from "mongoose";


const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        minlength: 1,
        maxlength: 120,
    },
    description: {
        type: String,
        required: true,
        minlength: [30, "30 Minimum Length."],
        maxlength: 120
    },
    ingredients: {
        type: [String],
        required: [true, "ingredients are required"],
        validate: {
            validator: (arr) =>
                Array.isArray(arr) &&
                arr.length >= 1 &&
                arr.every(
                    (s) =>
                        typeof s === "string" &&
                        s.trim().length >= 1 &&
                        s.length <= 200
                ),
            message: "ingredients must be a non-empty array of string"
        }
    },
    steps: {
        type: [String],
        required: [true, "steps are required"],
        validate: (arr) =>
            Array.isArray(arr) && arr.length >= 1 && arr.every(
                (s) => typeof s === "string" && s.trim().length >= 1
            ),
        messsage: "steps must be a non-empty array of non-empty strings"
    },
    imageUrl: {
        type: String,
        trim: true,
        default: null
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: (arr) =>
                arr.every((s) =>
                    typeof s === " string" &&
                    s.trim().length >= 1 &&
                    s.length <= 30
                ),
            message: "tags must be strings of max 30 characters."
        }
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    avgRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
},
    { timestamp: true }
)

export const recipe = mongoose.model("Recipe", recipeSchema)