function Calendar() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="p-3" style={{marginBottom:"70px"}}>
      <p>Calendar</p>
      <div class="border border-dark rounded p-2">
        <p>Confirmed experiences: number</p>
        <button className="btn btn-primary">Check details</button>
      </div>
      <div class="row row-cols-2 row-cols-md-2 g-4 mt-2">
        {months.map((month) => (
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{month}</h5>
                <p className="card-text">Experiences this month : NUMBER</p>
                <button className="btn btn-primary">See details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
