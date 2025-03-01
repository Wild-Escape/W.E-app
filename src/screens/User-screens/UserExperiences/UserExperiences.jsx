import { useState, useEffect, use} from "react";
import { getBookedExperiencesService } from "../../../services/payment.service";


function UserExperiences () {
    const [experiences, setExperiences] = useState(null);
    useEffect(() => {
        getBookedExperiencesService()
        .then((res) => {
            setExperiences(res);
            console.log("booked experiences-->", res)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    , []);

    return (
        <div>
            <h1>My Booked Experiences</h1>
            {experiences && experiences.map((experience) => (
                <div key={experience.id}>
                    <h2>{experience.experience.name}</h2>
                    <p>{experience.experience.price}</p>
                    <p>{experience.experience.currency}</p>
                    <p>{experience.dates.start}</p>
                    <p>{experience.experience.status}</p>
                </div>
            ))}

            <p>
                here will be all the reserved experiences
            </p>
        </div>
    )
}

export default  UserExperiences;