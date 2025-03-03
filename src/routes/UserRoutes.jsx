import { Route } from "react-router-dom";
import IsUser from '../components/IsUser/IsUser';
import UserProfile from '../screens/User-screens/UserProfile/UserProfile';
import UserMessages from '../screens/User-screens/UserMessages/UserMessages';
import UserExperiences from '../screens/User-screens/UserExperiences/UserExperiences';
import Favorites from '../screens/User-screens/Favorites/Favorites';    
import Explore from '../screens/User-screens/Explore/Explore';
import ExperienceDetails from "../screens/User-screens/Explore/ExperienceDetails/ExperienceDetails";
import EditUserProfile from "../screens/User-screens/UserProfile/EditUserProfile/EditUserProfile";
import StripeComponent from "../screens/User-screens/Explore/ExperienceDetails/StripeComponent/StripeComponent";
import Completion from "../screens/User-screens/Explore/ExperienceDetails/StripeComponent/Completion/Completion";
import Application from "../screens/User-screens/Explore/ExperienceDetails/Application/Application";

const UserRoutes = [
<Route key="/user/explore" path="/user/explore" element={<IsUser><Explore /></IsUser>} />,
<Route key="/user/experiences" path="/user/experiences" element={<IsUser><UserExperiences /></IsUser>} />,
<Route key="/user/favorites" path="/user/favorites" element={<IsUser><Favorites /></IsUser>} />,
<Route key="/user/messages" path="/user/messages" element={<IsUser><UserMessages /></IsUser>} />,
<Route key="/user/profile" path="/user/profile" element={<IsUser><UserProfile /></IsUser>} />,
<Route key="/user/:experienceId" path="user/experience/:experienceId" element={<IsUser><ExperienceDetails /></IsUser>} />,
<Route key="/user/edit/:id" path="/user/edit/:id" element={<IsUser><EditUserProfile /></IsUser>} />,
<Route key="/user/:id/payment" path="/user/:id/payment" element={<IsUser><StripeComponent /></IsUser>} />,
<Route key="/user/completed/payment" path="/user/completed/payment" element={<Completion />} />,
<Route key="/user/:id/booking/ " path="/user/:id/booking/" element={<Application/>} />,

   
]
 
export default UserRoutes;