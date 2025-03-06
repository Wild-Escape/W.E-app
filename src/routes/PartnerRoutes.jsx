import { Route } from "react-router-dom";
import IsPartner from '../components/IsPartner/IsPartner';
import Today from '../screens/Partner-screens/Today/Today';
import Calendar from '../screens/Partner-screens/Calendar/Calendar';
import Experiences from '../screens/Partner-screens/Experiences/Experiences';
import CreateExperience from '../screens/Partner-screens/Experiences/CreateExperience/CreateExperienceForm';
import PartnerMessages from '../screens/Partner-screens/PartnerMessages/PartnerMessages';
import PartnerProfile from '../screens/Partner-screens/PartnerProfile/PartnerProfile';
import PartnerExperienceDetails from "../screens/Partner-screens/Experiences/PartnerExperienceDetails/PartnerExperienceDetails";
import EditPartnerProfile from "../screens/Partner-screens/PartnerProfile/EditPartnerProfile/EditPartnerProfile";
import PartnerExperienceEdit from "../screens/Partner-screens/Experiences/PartnerExperienceDetails/PartnerExperienceEdit/PartnerExperienceEdit";
import ReviewApplication from "../screens/Partner-screens/Today/ReviewApplication/ReviewApplication";
import ConfirmedExperiences from "../screens/Partner-screens/Calendar/ConfirmedExperiences/ConfirmedExperiences";

const PartnerRoutes = [
<Route key="/partner/today" path="/partner/today" element={<IsPartner><Today /></IsPartner>} />,
<Route key="partner/calendar" path="/partner/calendar" element={<IsPartner><Calendar /></IsPartner>} />,
<Route key="partner/experiences" path="/partner/experiences" element={<IsPartner><Experiences /></IsPartner>} />,
<Route key="partner/create-post" path="/partner/create-post" element={<IsPartner><CreateExperience /></IsPartner>} />,
<Route key="partner/messages" path="/partner/messages" element={<IsPartner><PartnerMessages /></IsPartner>} />,
<Route key="partner/profile" path="/partner/profile" element={<IsPartner><PartnerProfile /></IsPartner>} />,
<Route key="partner/experience/:id/details" path="/partner/experience/:id/details" element={<IsPartner><PartnerExperienceDetails /></IsPartner>} />,
<Route key="partner/edit/:id" path="/partner/edit/:id" element={<IsPartner><EditPartnerProfile /></IsPartner>} />,
<Route key="/experience/:id/edit" path="/experience/:id/edit" element={<IsPartner><PartnerExperienceEdit  /></IsPartner>} />,
<Route key="/application/:paymentId/review" path="/application/:paymentId/review" element={<IsPartner><ReviewApplication /></IsPartner>} />,
<Route key="/confirmed/experiences" path="/confirmed/experiences" element={<IsPartner><ConfirmedExperiences/></IsPartner>} />





]

export default PartnerRoutes;