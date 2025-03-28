import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  getPublishableKeyService,
  paymentIntentService,
} from "../../../../../services/stripe.service";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { getExperienceDetails } from "../../../../../services/experiences.service";
import { useLocation } from "react-router-dom";

function StripeComponent() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const location = useLocation();
  const { startDate } = location.state || {};


  const [experience, setExperience] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getExperienceDetails(id)
      .then((res) => {
        console.log("Data in stripe --->>", res.trip);
        setExperience(res.trip);
      })
      .catch((error) => {
        next(error);
      });
  }, []);

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
    <div className="p-3">
      <h1>Payment </h1>
      {experience && (
        <div className="border border-secondary-subtle rounded mb-3 mt-3">
          <div className="p-3 ">
            <h2 className="card-title h4 mb-3">{experience.name}</h2>
            <div className="row">
              <div className="col-6">
                <p className="mb-1">
                  <strong>Duration:</strong> {experience.duration} {experience.durationType}
                </p>
                <p className="mb-0">
                  <strong>Currency:</strong> {experience.currency}
                </p>
              </div>
              <div className="col-6 text-end">
                {experience.type === "express" ? (<p className=" mb-0">
                  Total: {experience.price.toFixed(2)} {experience.currency === 'euros' ? '€' : experience.currency}
                </p>):(<p className=" mb-0">
                 <b>Reservation fee:</b>  {(experience.price * 0.15).toFixed(2)} {experience.currency === 'euros' ? '€' : experience.currency}
                </p>)}
                
              </div>
              <div className="col-6 ">
                <p className=" mb-0">
                  <b>Date:</b> {startDate}
                </p>
              </div>
              <hr className="mt-2"/>
                <p style={{fontSize:"12px"}}>The reservation fee will be deducted of the total price of the experience</p>
            </div>
          </div>
        </div>
      )}


      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm data={experience} selectedDate={startDate} />
        </Elements>
      )}
    </div>
  );
}

export default StripeComponent;
