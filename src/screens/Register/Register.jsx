import { Link } from "react-router-dom";
function Register ( ) {
    return (
        <div className="d-flex align-items-center justify-content-around" style={{height:"70vh", width:"100vw"}}>
            
                <Link type="button" className="btn btn-primary" to="/register/user">Register as User</Link>
           
                <Link type="button" className="btn btn-primary" to="/register/admin">Register as Admin</Link>
            
        </div>
    )
}

export default Register;