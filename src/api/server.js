// This is your test secret API key.
const stripe = require('stripe')('seu codigo aqui!');
const express = require('express');
const app = express();
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//const calculateOrderAmount = (items) => {
  // Calculate the total order amount based on the items and their prices
  //const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //return Math.round(totalAmount * 100); // Convert to cents
//};

app.post("/create-checkout-session", async (req, res) => {
  const { email, cartItems } = req.body;

  if (req.method === "POST") {

      const params = {
        customer_email: email,
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ['card'],
        billing_address_collection: "auto",
        line_items: cartItems.map((item) => {

          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', "https://cdn.sanity.io/images/seu_codigo_aqui/production/").replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'brl',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `http://localhost:5173/obrigada`,
        cancel_url: 'http://localhost:5173',
      }


      
      // Crie uma sessão de checkout e passe o ID do PaymentIntent
      const session = await stripe.checkout.sessions.create(params);
      console.table(cartItems);
      res.status(200).json(session);
    }

});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
