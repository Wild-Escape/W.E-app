import { Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CommonRoutes from "./routes/CommonRoutes";
import UserRoutes from "./routes/UserRoutes";
import PartnerRoutes from "./routes/PartnerRoutes";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {CommonRoutes}
        {UserRoutes}
        {PartnerRoutes}
      </Routes>
    </>
  );
}

export default App;
