const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
    item: String,
    quantity: Number,
    category: {
        type: String,
        enum: ["fruits", "veggies", "dairy", "snacks", "other"],
        default: "other"
    },
    price: Number,
    purchased: {
        type: Boolean,
        default: false
    },
    supplier:{
        type: String,
        default: "No supplier found"
    }
});

module.exports= mongoose.model("item", shoppingSchema)