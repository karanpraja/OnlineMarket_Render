require('dotenv')
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);
exports.createPaymentController=async (req, res) => {
  console.log("createPaymentIntent")
    console.log({req: req.body})
    const HOST=process.env.HOST
    console.log({HOST:HOST})
    const {totalAmount,id,quantity}=req.body
    const product = await stripe.products.create({
      name: `Your order id is ${id}`,
    });
    console.log({product:product})
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: totalAmount*8400,
      currency: 'INR',
    });
    console.log({price:price})
  console.log({Host:process.env.HOST})
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: quantity,
        },
      ],
      // customer: 'cs_test_MlZAaTXUMHjWZ7DcXjusJnDU4MxPalbtL5eYrmS2GKxqscDtpJq8QM0k',
      customer_email: 'karan4@gmail.com', // Add customer's email address headers
      billing_address_collection: 'required', // Prompt the customer to provide their billing address
       
      mode: 'payment',
      success_url: `${HOST}/checkorder/${id}`,
      cancel_url: `${HOST}/errorpage`,
      metadata:{
        orderId:id
      }
   
    });
  
    res.json( session.url);
  
  }
  const endpointSecret = process.env.ENDPOINT_SECRET;
  exports.webhooksController=async(request, response) => {
      let event = request.body;
      // Only verify the event if you have an endpoint secret defined.
      // Otherwise use the basic event deserialized with JSON.parse
      if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers["stripe-signature"];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(`⚠️Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
      }
  
      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log(
            `PaymentIntent for ${paymentIntent.amount} was successful!`
          );
          console.log(paymentIntent);
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
  
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
