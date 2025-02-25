import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/user/completed/payment`,
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsProcessing(false);
  };
  return (
    <div className="p-3" style={{marginBottom:"100px"}}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={isProcessing} className="btn btn-primary mt-3">
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
