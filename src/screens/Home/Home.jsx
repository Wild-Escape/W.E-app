import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      id="home"
      className="p-3 d-flex flex-column align-items-center justify-content-center "
    >
      <div
        id="description"
        className=" d-flex flex-column align-items-center justify-content-center p-3 "
      >
        <h1 className="text-center mb-3">Wild Escape</h1>
        <p className="text-center">
         The world’s first marketplace for hands-on
          conservation magic.
        </p>
        <p id="p2" className="text-center">
          Start your
          rewilding adventure with us today.
        </p>
        <Link to="/register" className="btn">
          Join the herd
        </Link>
      </div>
    </div>
  );
}

export default Home;
