import React from "react";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="age-container">
        <form className="calculate-age-form">
          <div className="input-group">
            <label htmlFor="day">Day</label>
            <input type="text" id="day" placeholder="DD" />
          </div>

          <div className="input-group">
            <label htmlFor="month">Month</label>
            <input type="text" id="month" placeholder="MM" />
          </div>

          <div className="input-group">
            <label htmlFor="year">Year</label>
            <input type="text" id="year" placeholder="YYYY" />
          </div>
        </form>

        <div id="line"></div>

        <div id="result">
          <h2>
            <span> - - </span> years
          </h2>

          <h2>
            <span> - - </span> months
          </h2>

          <h2>
            <span> - - </span> days
          </h2>
        </div>
      </div>
    </>
  );
};

export default App;
