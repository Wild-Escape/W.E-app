import { getConfirmedExperiencesService } from "../../../services/payment.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";

function Calendar() {
  const [confirmedExperiences, setConfirmedExperiences] = useState([]);
  const [sortedExperiences, setSortedExperiences] = useState({
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  });
  useEffect(() => {
    getConfirmedExperiencesService()
      .then((res) => {
        console.log("confirmed experiences-->", res);
        setConfirmedExperiences(res); // State update happens async!
      })
      .catch((err) => next(err));
  }, []);

  useEffect(() => {
    if (confirmedExperiences.length > 0) {
      setSortedExperiences((prev) => {
        const newSortedExperiences = { ...prev };

        confirmedExperiences.forEach((experience) => {
          const date = new Date(experience.dates.start);
          const month = date.toLocaleString("default", { month: "long" });

          if (!newSortedExperiences[month]) {
            newSortedExperiences[month] = [];
          }

          // Prevent duplicates
          if (!newSortedExperiences[month].some((exp) => exp.id === experience.id)) {
            newSortedExperiences[month].push(experience);
          }
        });

        return newSortedExperiences;
      });
    }
  }, [confirmedExperiences]);
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
                data: [
                  sortedExperiences.January.length,
                  sortedExperiences.February.length,
                  sortedExperiences.March.length,
                  sortedExperiences.April.length,
                  sortedExperiences.May.length,
                  sortedExperiences.June.length,
                  sortedExperiences.July.length,
                  sortedExperiences.August.length,
                  sortedExperiences.September.length,
                  sortedExperiences.October.length,
                  sortedExperiences.November.length,
                  sortedExperiences.December.length,
                ],
               

                
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
                  <p className="card-text">Experiences this month : {sortedExperiences.January.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">February</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.February.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">March</h5>
                  <p className="card-text">Experiences this month :{sortedExperiences.March.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">April</h5>
                  <p className="card-text">Experiences this month :{sortedExperiences.April.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">May</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.May.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">June</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.June.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">July</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.July.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">August</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.August.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">September</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.September.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">October</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.October.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">November</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.November.length}</p>
                  <button className="btn btn-primary">See details</button>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">December</h5>
                  <p className="card-text">Experiences this month : {sortedExperiences.December.length}</p>
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
