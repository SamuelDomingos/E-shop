import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51McqshCqEU4P3WRIEUD9BG3zjBG0MPW1aDO7rxwdzRjfhZTK5VIeDf7jvDHhejntpUJH1uCKLMo2lJccXTCw7SWi00nTkEkbja"
    );
  }

  return stripePromise;
};

export default getStripe;
