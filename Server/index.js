const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app = express();
app.use(cors({ origin: true }))
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        response: 'success'
    })
})

app.post('/payment/create', async (req, res) => {
    const amount = req.query.amount;
    if (amount > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
        });
        console.log(paymentIntent.client_secret);
        res.status(200).json({ client_secret: paymentIntent.client_secret });
    } else {
        res.status(401).json({
            message: "amount should be greater than 0"
        })
    }
})




app.listen(5000, (err) => {
    if (!err) {
        console.log('app running at http://localhost:3000')
    } else {
        throw err
    }
})