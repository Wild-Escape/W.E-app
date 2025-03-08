import { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { sendApplicationService } from "../../../../../services/application.service";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Application() {
    const { id } = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const { availableDates } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        duration: {
            durationNumber: 0,
            durationType: ''
        },
        startDate: new Date(),
        age: 0,
        nationality: '',
        languages: [],
        previousExperiences: '',
        motive: ''
    });

    const [errors, setErrors] = useState({});
    const [wasValidated, setWasValidated] = useState(false);

    const languageOptions = ['English', 'Spanish', 'Portuguese', 'French', 'Other'];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (formData.age < 14 || formData.age > 99) newErrors.age = 'Age must be between 14-99';
        if (formData.languages.length === 0) newErrors.languages = 'At least one language required';
        if (!formData.motive.trim()) newErrors.motive = 'Motivation is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        console.log("entered in handle submit")
        e.preventDefault();
        setWasValidated(true);
        if (!validateForm()) return;

        // Submit logic
        const submissionData = {
            ...formData,
            experience: `${id}`
        };

        sendApplicationService(submissionData)
            .then((res) => {
                console.log('Application submitted:', res);
                navigate(`/user/${id}/payment`, {
                    state: {
                        startDate: formData.startDate
                    }
                })
            })
            .catch((error) => next(error));

    };

    const handleArrayChange = (e) => {
        const { options } = e.target;
        const values = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        setFormData({ ...formData, languages: values });
    };
    return (
        <div style={{ marginBottom: "50px" }}>
            <div className="container p-3">
                <div>
                    <div className="card-header ">
                        <h2 className="mb-0">Volunteer Application</h2>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit} noValidate className={wasValidated ? 'was-validated' : ''}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="firstName" className="form-label">First Name*</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.firstName}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="lastName" className="form-label">Last Name*</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.lastName}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email*</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="age" className="form-label">Age*</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                        id="age"
                                        min="18"
                                        max="99"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.age}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="nationality" className="form-label">Nationality</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nationality"
                                        value={formData.nationality}
                                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="languages" className="form-label">Languages*</label>
                                    <select
                                        multiple
                                        className={`form-select ${errors.languages ? 'is-invalid' : ''}`}
                                        id="languages"
                                        size="4"
                                        value={formData.languages}
                                        onChange={handleArrayChange}
                                        required
                                    >
                                        {languageOptions.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.languages}
                                    </div>
                                    <small className="form-text text-muted">Hold Ctrl/Cmd to select multiple</small>
                                </div>
                                <div className="col-12 ">
                                    <div className="border border-light-subtle rounded-3 p-3 mb-3">
                                        <p>Availability</p>
                                        <p>From: {new Date(availableDates[0].start).toLocaleString(
                                            "en-UK",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}</p>
                                        <p>Until: {new Date(availableDates[0].end).toLocaleString(
                                            "en-UK",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}</p>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <DatePicker
                                            selected={formData.startDate}
                                            onChange={(date) =>
                                                setFormData({ ...formData, startDate: new Date(date).toDateString() })
                                            }
                                            selectsRange
                                            selectsDisabledDaysInRange
                                            inline
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div>
                                        <label htmlFor="duration" className="form-label">Duration (could be an estimation)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="duration"
                                            value={formData.duration.durationNumber}
                                            onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, durationNumber: e.target.value } })}
                                        />

                                    </div>
                                    <div className="mt-2">
                                        <select
                                            className="form-select"
                                            value={formData.duration.durationType}
                                            onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, durationType: e.target.value } })}
                                        >
                                            <option value="">Select duration type</option>

                                            <option value="weeks">Weeks</option>
                                            <option value="months">Months</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <label htmlFor="experiences" className="form-label">Previous Experiences</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="experiences"
                                        value={formData.previousExperiences}
                                        onChange={(e) => setFormData({ ...formData, previousExperiences: e.target.value })}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="motive" className="form-label">Motivation*</label>
                                    <textarea
                                        className={`form-control ${errors.motive ? 'is-invalid' : ''}`}
                                        id="motive"
                                        rows="4"
                                        value={formData.motive}
                                        onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.motive}
                                    </div>
                                </div>

                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg w-100">
                                        Submit Application
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Application;