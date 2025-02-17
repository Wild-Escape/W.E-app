import { Link } from "react-router-dom"
function Postings () {
    return (
        <div className="p-3">
            <p>Here we will have all the expreiences created by this admin</p>
            <Link className="btn btn-secondary" to="/partner/create-post">Add Experience
            </Link>
        </div>
    )
}
export default Postings;