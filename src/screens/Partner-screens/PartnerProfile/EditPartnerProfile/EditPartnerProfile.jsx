import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/auth.context";
import { getPartnerDetailsService, editPartnerService } from "../../../../services/partner.services";

function EditPartnerProfile () {
      const { id } = useParams();
      const [editData, setEditData] = useState(null);
      const [error, setError] = useState(null)
    
      const { getCurrentUser} = useContext(AuthContext)
    
      const navigate = useNavigate();
    
      useEffect(() => {
        getPartnerDetailsService(id)
          .then((response) => {

            console.log("respose in edit profile", response)
            setEditData({
                name: response.user.name,
                email: response.user.email,
                profileImage : response.user.profileImage
            });
            
          })
          .catch((error) => {
            setError(error)
            next(error)});
      }, []);
      const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (e.target.type === 'file') {
          console.log("this is the file",e.target.files[0])
        }
        setEditData((prevFormData) => ({
          ...prevFormData,
          [name]: files ? files[0] : value,
        }));
      };
      const handleSubmit = (e) => {
        console.log("entering handle submit*****")
        e.preventDefault();
    
        const uploadData = new FormData();
        uploadData.append("name",editData.name);
        uploadData.append("email",editData.email);
        uploadData.append("profileImage", editData.profileImage)
    
        console.log("checking data before submit-->", uploadData)
        editPartnerService(id, uploadData)
          .then((response) => {
            console.log("updated user", response);
            getCurrentUser()
            navigate("/partner/profile")
          })
          .catch((error) => {
            console.log("error in edit", error)
            next(error)})
      };
    return (
        <div>
        {editData && (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-header bg-primary bg-gradient text-white py-3">
                    <h2 className="card-title text-center mb-0">Edit Profile</h2>
                  </div>
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit} >
                      {/* Profile Image Upload */}
                      <div className="mb-4 text-center">
                        <label htmlFor="profileImage" className="form-label fw-semibold">
                          Profile Image
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="profileImage"
                          name="profileImage"
                          onChange={handleChange}
                          accept="image/*"
                          required
                          
                        />
                        <div className="form-text">Recommended size: 200x200 pixels</div>
                      </div>
      
                      {/* Name Field */}
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label fw-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg focus-ring focus-ring-primary"
                          id="name"
                          name="name"
                          value={editData.name}
                          required
                          onChange={handleChange}
                        />
                      </div>
      
                      {/* Email Field */}
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg focus-ring focus-ring-primary"
                          id="email"
                          name="email"
                          required
                          value={editData.email}
                          onChange={handleChange}
                        />
                      </div>
      
                      {/* Submit Button */}
                      <div className="d-grid mt-5">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg bg-gradient shadow-sm py-2 fw-semibold"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default EditPartnerProfile; 