import { getConfirmedExperiencesService } from "../../../services/payment.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import './Calendar.css';

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
        setConfirmedExperiences(res);
      })
      .catch((err) => next(err));
  }, []);

  useEffect(() => {
    if (confirmedExperiences.length > 0) {
      setSortedExperiences(prev => {
        // Create fresh month structure instead of spreading previous state
        const newSorted = monthNames.reduce((acc, month) => {
          acc[month] = [];
          return acc;
        }, {});

        confirmedExperiences.forEach(experience => {
          const date = new Date(experience.dates.start);
          // Use UTC methods to avoid timezone issues
          const monthIndex = date.getUTCMonth();
          const monthName = monthNames[monthIndex];

          // Check if ID already exists in the month's array
          if (!newSorted[monthName].some(exp => exp._id === experience._id)) {
            newSorted[monthName].push(experience);
          }
        });

        return newSorted;
      });
    }
  }, [confirmedExperiences]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div id="calendar-container">
      <h1 className="mb-3">Calendar</h1>
      {confirmedExperiences && (
        <>

          <div className="border d-flex align-items-center justify-content-between  rounded p-2">
            <p className="m-0">Confirmed experiences: {confirmedExperiences.length}</p>
            <Link to='/confirmed/experiences' className="btn btn-primary">
              See details
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

          <div className="row row-cols-2 row-cols-md-3 g-4 mt-2">
            {
              monthNames.map((month) => (
                <div className="col" key={month}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{month}</h5>
                      <p className="card-text">
                        Experiences this month : {sortedExperiences[month].length}
                      </p>
                      <Link to={{
                        pathname: `/month/${month}`
                      }} 
                      state={{ experiences: sortedExperiences[month] }}
                      className="btn btn-primary">See details</Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
