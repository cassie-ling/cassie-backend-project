const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    supplierName: String,
    produce: String,
    category: {
        type: String,
        enum: ["fruits", "veggies", "dairy", "snacks", "other"],
        default: "other"
    },
    contactInfo: {
        type: String,
        unique: true
    }
    
});

module.exports= mongoose.model("supplier", SupplierSchema)