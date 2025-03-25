import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { reviewApplicationService } from "../../../../services/payment.service";
import {
  confirmExperienceService,
  declineExperienceService,
} from "../../../../services/payment.service";
import {
  FaEuroSign,
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaGlobe,
  FaComments,
  FaHistory,
  FaInfoCircle,
} from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";

function ReviewApplication() {
  const { paymentId } = useParams();
  const [paymentData, setPaymentData] = useState({});
  const [userData, setUserData] = useState({});
  const [applicationData, setApplicationData] = useState({});

  useEffect(() => {
    reviewApplicationService(paymentId)
      .then((res) => {
        console.log("review response-->", res);
        setApplicationData(res.application[0]);
        setPaymentData(res.payment);
        setUserData(res.application[0].user);
      })
      .catch((err) => next(err));
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const confirmPayment = async (id) => {
    try {
      const res = await confirmExperienceService(id);
      console.log("experience confirmed", res);
      const applicationData = await reviewApplicationService(paymentId);
      setApplicationData(applicationData.application[0]);
      setPaymentData(applicationData.payment);
      setUserData(applicationData.application[0].user);
      alert("Confirmation done 😊");
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  const declinePayment = async (id) => {
    try {
      const res = await declineExperienceService(id);
      console.log("experience declined", res);
      alert("Experience declined");
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  return (
    <div className="container p-3" style={{ marginBottom: "70px" }}>
      <h1 className=" mb-4">
        Review Application
      </h1>

      {/* Payment Info Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header ">
          <h5 className="mb-0">
            <FaEuroSign className="me-2" />
            Payment Information
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <p className="mb-1">
                <strong>Amount:</strong>
                <span className="ms-2">
                  {(paymentData.price?.amount * 0.15).toFixed(2)} {paymentData.price?.currency}
                </span>
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <p className="mb-1">
                <strong>Status:</strong>
                <span
                  className={`badge ms-2 
                                    ${
                                      paymentData.status === "pending"
                                        ? "bg-warning text-dark"
                                        : paymentData.status === "confirmed"
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                >
                  {paymentData.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header ">
          <h5 className="mb-0">
            <FaUser className="me-2" />
            User Details
          </h5>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-1">
                {applicationData.firstName} {applicationData.lastName}
              </h5>
              <p className="mb-0 text-muted">
                <FaEnvelope className="me-2" />
                {userData.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Info Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header ">
          <h5 className="mb-0">
            <FaInfoCircle className="me-2" />
            Application Details
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <DetailItem
                icon={<FaCalendar />}
                label="Start Date"
                value={formatDate(applicationData.startDate)}
              />
              <DetailItem
                icon={<FaHistory />}
                label="Duration"
                value={`${applicationData.duration?.durationNumber} ${applicationData.duration?.durationType}`}
              />
              <DetailItem
                icon={<FaGlobe />}
                label="Nationality"
                value={applicationData.nationality}
              />
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <DetailItem
                icon={<FaUser />}
                label="Age"
                value={applicationData.age}
              />
              <DetailItem
                icon={<FaLanguage />}
                label="Languages"
                value={applicationData.languages?.join(", ")}
              />
              <DetailItem
                icon={<FaInfoCircle />}
                label="Experience Level"
                value={applicationData.previousExperiences}
              />
            </div>
          </div>

          {/* Motivation Section */}
          <div className="mt-4">
            <h6>
              Motivation
            </h6>
            <p className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
              {applicationData.motive}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        {paymentData.partnerConfirmed ? (
          <button className="btn btn-success">Experience confirmed !!</button>
        ) : (
          <>
            <button
              onClick={() => confirmPayment(paymentData._id)}
              className="btn btn-success me-md-2"
            >
              Confirm
            </button>
            <button
              onClick={() => declinePayment(paymentData._id)}
              className="btn btn-outline-danger"
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const DetailItem = ({ icon, label, value }) => (
  <div className="mb-3">
    <span className="me-2">{icon}</span>
    <strong>{label}:</strong>
    <span className="ms-2 text-muted">{value}</span>
  </div>
);

export default ReviewApplication;
