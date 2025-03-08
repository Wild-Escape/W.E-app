import { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/auth.context";
import {
  getUserDetailsService,
  editUserService,
} from "../../../../services/user.service";

function EditUserProfile() {
  const { id } = useParams();
  const [editData, setEditData] = useState(null);

  const { getCurrentUser} = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    getUserDetailsService(id)
      .then((response) => {
        setEditData({
            name: response.user.name,
            email: response.user.email,
            profileImage : ""
        });
        
      })
      .catch((error) => next(error));
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
    editUserService(id, uploadData)
      .then((response) => {
        console.log("updated user", response);
        getCurrentUser()
        navigate("/user/profile")
      })
      .catch((error) => next(error));
  };
  return (
    <div>
      
      {editData && (<div className="container mt-5">
        <div className="row justify-content-center p-3">
          <div className="col-md-6">
            <div className="">
              <div className="card-body">
                <h4 className="card-title text-center mb-3">Edit Profile</h4>
                <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">
                      Profile image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="profileImage"
                      name="profileImage"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editData.name}
                      required
                      onChange={handleChange}
                    />
                  </div>
                 
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      value={editData.email}
                      onChange={handleChange}
                    />
                  </div>
                

                  <button type="submit" className="btn btn-primary mt-3 w-100">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default EditUserProfile;
