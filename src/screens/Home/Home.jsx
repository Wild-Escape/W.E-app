import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Home () {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h1>hello from HOMEEE :)</h1>
            <h2>helloooo {user.user.name}</h2>
        </div>
    )
}

export default Home;