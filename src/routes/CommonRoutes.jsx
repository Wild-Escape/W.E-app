
import { Route } from "react-router-dom";
import IsAnon from '../components/IsAnon/IsAnon';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import RegisterPartner from '../screens/Register/RegisterPartner';
import RegisterUser from '../screens/Register/RegisterUser';

const CommonRoutes = [
  <Route key="/" path="/" element={<Home />} />,
  <Route key="/login" path="/login" element={<IsAnon><Login /></IsAnon>} />,
  <Route key="/register" path="/register" element={<IsAnon><Register /></IsAnon>} />,
  <Route key="/register/partner" path="/register/partner" element={<IsAnon><RegisterPartner /></IsAnon>} />,
  <Route key="/register/user" path="/register/user" element={<IsAnon><RegisterUser /></IsAnon>} />,
];

export default CommonRoutes;