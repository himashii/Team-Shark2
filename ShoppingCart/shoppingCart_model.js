const mongoose = require("mongoose");

mongoose.model("CartDetails", {
    id: {
        type: String,
        require: true
    },
    product_name: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    
})