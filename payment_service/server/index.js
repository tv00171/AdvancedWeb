const cors = require("cors");
const express = require("express");
require("dotenv").config();

const stripe = require("stripe")("sk_test_51Mw6PuBqA4vdmyT3IY9G93yPnYF7EVocpNyThGf7E3wlwQCGsdKpXhuuauyxj0b9hrqmL1XiEcYTWND4f0O8MdCx00amlaOmNB");

const app = express();

// Middlewares here
app.use(express.json());
app.use(cors());

// Routes here
app.get("/", (req, res) => {
    res.send("The server is now online!");
});

// Listen
app.listen(8000, () => {
    console.log("Server started at port 8000");
});

// Post
app.post("/api/create-checkout-session", async (req, res) => {
    const {product} = req.body;


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:8080/success",
        cancel_url: "http://localhost:8080/cancel",
    });

    res.json({id: session.id});
});
