import { useParams, useLocation } from "react-router-dom";


function Month() {
  const { month } = useParams();
  const location = useLocation();
  const { monthData } = location.state || {};
  return (
    <div className="p-3">
      <h1>{month}</h1>
      {monthData ? (
        <h1>{monthData[0].experience.name}</h1>
      ) : (
        <p>No data received</p>
      )}
      here will be the month
    </div>
  );
}

export default Month;
