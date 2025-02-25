import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();

        console.log("Received amount:", amount); // Debugging log

        if (!amount || isNaN(amount) || amount < 50) { // Stripe requires at least $0.50
            return NextResponse.json(
                { error: `Invalid amount: ${amount}` },
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur",
            automatic_payment_methods: { enabled: true },
        });

        console.log("Payment Intent created:", paymentIntent.id); // Debugging log

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}
