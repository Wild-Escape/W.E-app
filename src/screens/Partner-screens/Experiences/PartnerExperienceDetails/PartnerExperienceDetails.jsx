import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPartnerExperience } from "../../../../services/experiences.service"

function PartnerExperienceDetails () {
    const { id } = useParams()
    const [experience, setExperience] = useState(null)  
    useEffect(() => {
        getPartnerExperience(id)
        .then((res) => {
            console.log("getting the experience",res.partnerExperience)
            setExperience(res.partnerExperience)
        })
        .catch((error) => {
            console.log(error)
            next(error)
        })
        
    },[])
    return (
        
        <div className="p-3">
            <p>here will be the details</p>
            {experience && (
                <p>{experience.name}</p>
            )}
    
            
            
        </div>
        
    )
}

    


export default PartnerExperienceDetails