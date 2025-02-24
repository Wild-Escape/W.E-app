import { Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CommonRoutes from "./routes/CommonRoutes";
import UserRoutes from "./routes/UserRoutes";
import PartnerRoutes from "./routes/PartnerRoutes";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {

  

  return (
    <>
      <NavBar />
      <Elements stripe={stripePromise} >
        <Routes>
          {CommonRoutes}

          {UserRoutes}

          {PartnerRoutes}
        </Routes>
      </Elements>
    </>
  );
}

export default App;
