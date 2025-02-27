import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { createPaymentService } from "../../../../../../services/payment.service";

function CheckoutForm(data) {
  const stripe = useStripe();
  const elements = useElements();

  
 // console.log("available dates-->", data.availableDates);
  const paymentData = {
    experience: data.id,
    price: {
      amount: data.price,
      currency: data.currency,
    },
    // dates: {
    //   start: data.availableDates[0].start,
    //   end: data.availableDates[0].end,
    // }
    
  }

  console.log("experiece dataFormated in checkout form", data.availableDates);

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

    createPaymentService(paymentData) 
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    

    if (error) {
      setMessage(error.message);
    }

    // call to the backend to store the data of the payment

    setIsProcessing(false);
  };
  return (
    <div style={{marginBottom:"100px"}}>
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
