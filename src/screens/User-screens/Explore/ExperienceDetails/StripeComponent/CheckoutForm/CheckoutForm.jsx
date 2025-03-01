import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { createPaymentService } from "../../../../../../services/payment.service";


function CheckoutForm({data, selectedDate}) {
  const stripe = useStripe();
  const elements = useElements();
  console.log("selected date_--> ", selectedDate)
  console.log("experiece dataFormated in checkout form", data);
  const date = new Date(selectedDate);
  const formatedDate = date.toString();
  console.log("formated date-->", formatedDate);
  const paymentData = {
    experience: data.id,
    price: {
      amount: data.price,
      currency: data.currency,
    },
    dates: {
      start: formatedDate,
      
    }
  };
  
  console.log("check payment data-->", paymentData)



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
