import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  getPublishableKeyService,
  paymentIntentService,
} from "../../../../../services/stripe.service";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

function StripeComponent() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    getPublishableKeyService()
      .then((res) => {
        setStripePromise(loadStripe(res.publishableKey));
      })
      .catch((error) => next(error));
  }, []);

  useEffect(() => {
    paymentIntentService(JSON.stringify({}))
      .then((res) => {
        setClientSecret(res.clientSecret);
      })
      .catch((error) => next(error));
  }, []);

  return (
    <div>
      <h1>Payment Element</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default StripeComponent;
