import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { createPaymentService } from "../../../../../../services/payment.service";

function CheckoutForm(data) {
  const stripe = useStripe();
  const elements = useElements();

  const paymentData = {
    experience: data.data.id,
    price: {
      amount: data.data.price,
      currency: data.data.currency,
    },
    // dates: {
    //   start: data.availableDates[0].start,
    //   end: data.availableDates[0].end,
    // }
  };
  console.log("check payment data-->", paymentData)
  console.log("experiece dataFormated in checkout form", data);



  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    console.log("before confirmation")
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required"
    });
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const payment = await createPaymentService(paymentData)
      console.log("after confirmation");
      setIsProcessing(false);
      // Now manually redirect
      window.location.href = `${window.location.origin}/user/completed/payment`;
    }



    setIsProcessing(false);
  };
  return (
    <div style={{ marginBottom: "100px" }}>
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
