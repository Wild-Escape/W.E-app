import { Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CommonRoutes from "./routes/CommonRoutes";
import UserRoutes from "./routes/UserRoutes";
import PartnerRoutes from "./routes/PartnerRoutes";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <APIProvider
        apiKey={mapsApiKey}
        libraries={["places"]}
        onLoad={() => console.log("Maps API loaded")}
      >
        <NavBar />

        <Routes>
          {CommonRoutes}
          {UserRoutes}
          {PartnerRoutes}
        </Routes>
      </APIProvider>
    </>
  );
}

export default App;
