import { Link } from "react-router-dom"
function Experiences () {
    return (
        <div className="p-3">
            <p>Here we will have all the expreiences created by this admin</p>
            <Link className="btn btn-secondary" to="/admin/create-experience">Add Experience
            </Link>
        </div>
    )
}
export default Experiences;