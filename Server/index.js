import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        response: 'success'
    });
});

app.post('/payment/create', async (req, res) => {
    const total = req.query.total;
    if (total > 0) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(total),
                currency: "usd",
            });
            console.log(paymentIntent.client_secret);
            res.status(200).json({ 
                client_secret: paymentIntent.client_secret 
            });
        } catch (error) {
            console.error('Stripe error:', error);
            res.status(500).json({ 
                error: 'Payment processing failed' 
            });
        }
    } else {
        res.status(400).json({
            message: "Amount should be greater than 0"
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', (err) => {
    if (!err) {
        console.log(`Server running on port ${PORT}`);
    } else {
        console.error('Server error:', err);
    }
});