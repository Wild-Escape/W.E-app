import { getConfirmedExperiencesService } from "../../../services/payment.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";

function Calendar() {
  const [confirmedExperiences, setConfirmedExperiences] = useState([]);
  const [sortedExperiences, setSortedExperiences] = useState({
    january: ["all the experiences order here"],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
  });
  useEffect(() => {
    getConfirmedExperiencesService()
      .then((res) => {
        setConfirmedExperiences(res);
        // logic to sort the experiences with setSortedExperience in the corresponding month in order
      })
      .catch((err) => next(err));
  }, []);
  return (
    <div className="p-3" style={{ marginBottom: "70px" }}>
        <h1 className="mb-3">Calendar</h1>
      {confirmedExperiences && (
        <>
          
          <div className="border border-dark rounded p-2">
            <p>Confirmed experiences: {confirmedExperiences.length}</p>
            <Link to={""} className="btn btn-primary">
              Check details
            </Link>
          </div>
          
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "jun",
                  "jul",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [2, 5, 3, 3, 5, 6, 1, 5, 7,2 ,4 ,3],
              },
            ]}
            width={330}
            height={200}
          />
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
            
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">January</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.january.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">February</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.february.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">March</h5>
                    <p className="card-text">Experiences this month :{sortedExperiences.march.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">April</h5>
                    <p className="card-text">Experiences this month :{sortedExperiences.april.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">May</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.may.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">June</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.june.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">July</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.july.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">August</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.august.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">September</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.september.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">October</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.october.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">November</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.november.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
              <div className="col" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">December</h5>
                    <p className="card-text">Experiences this month : {sortedExperiences.december.length}</p>
                    <button className="btn btn-primary">See details</button>
                  </div>
                </div>
              </div>
             
           
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
