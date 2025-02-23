import { Route } from "react-router-dom";
import IsPartner from '../components/IsPartner/IsPartner';
import Today from '../screens/Partner-screens/Today/Today';
import Calendar from '../screens/Partner-screens/Calendar/Calendar';
import Experiences from '../screens/Partner-screens/Experiences/Experiences';
import CreateExperience from '../screens/Partner-screens/Experiences/CreateExperience/CreateExperienceForm';
import PartnerMessages from '../screens/Partner-screens/PartnerMessages/PartnerMessages';
import PartnerProfile from '../screens/Partner-screens/PartnerProfile/PartnerProfile';
import PartnerExperienceDetails from "../screens/Partner-screens/Experiences/PartnerExperienceDetails/PartnerExperienceDetails";

const PartnerRoutes = [
<Route key="/partner/today" path="/partner/today" element={<IsPartner><Today /></IsPartner>} />,
<Route key="partner/calendar" path="/partner/calendar" element={<IsPartner><Calendar /></IsPartner>} />,
<Route key="partner/experiences" path="/partner/experiences" element={<IsPartner><Experiences /></IsPartner>} />,
<Route key="partner/create-post" path="/partner/create-post" element={<IsPartner><CreateExperience /></IsPartner>} />,
<Route key="partner/messages" path="/partner/messages" element={<IsPartner><PartnerMessages /></IsPartner>} />,
<Route key="partner/profile" path="/partner/profile" element={<IsPartner><PartnerProfile /></IsPartner>} />,
<Route key="/partner/experience/:id/details" path="/partner/experience/:id/details" element={<IsPartner><PartnerExperienceDetails /></IsPartner>} />

]

export default PartnerRoutes;