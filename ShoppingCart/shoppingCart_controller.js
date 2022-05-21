//load express

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

require("./shoppingCart_model");
const Cart = mongoose.model("CartDetails") 

//database connection
mongoose.connect("mongodb+srv://test:test123@cart-service.1a8wk.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database connected!");
})

app.get('/', (req,res) => {
res.send("This is our shopping cart page");
})

//Add to cart function
app.post("/cart", (req,res) => {
    var newCart = {
        id: req.body.id,
        product_name: req.body.product_name,
        qty: req.body.qty,
        price: req.body.price
    }

    var cart = new Cart(newCart)

    cart.save().then(() => {
        console.log("Product added to the cart!")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })

    res.send("Successfully added to the cart!")
})


//List all the cart details
app.get("/cartDetails", (req,res) => {
    Cart.find().then((CartDetails) => {
        res.json(CartDetails)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

//List a specific cart detail
app.get("/cartDetail/:id", (req,res) => {
    Cart.findById(req.params.id).then((cart) => {

        if(cart){
            res.json(cart);
        }else{
            res.sendStatus(404);
        }
        
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

//Delete cart details
app.delete("/cartDetail/:id", (req,res) => {
    Cart.findOneAndRemove(req.params.id).then(() => {
        res.send("Cart Details deleted successfully!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.listen(3002, () => {
console.log("Server is up and running!");
})

//pipeline created 