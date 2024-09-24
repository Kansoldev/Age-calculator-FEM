import React, { useState } from "react";
import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import image from "./assets/icon-arrow.svg";
import "./App.css";

dayjs.extend(customParseFormat);

const App = () => {
  const [formValues, setFormValues] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [formErrors, setFormErrors] = useState({
    dayErr: "",
    monthErr: "",
    yearErr: "",
  });

  const [output, setOutput] = useState({
    day: "- -",
    month: "- -",
    year: "- -",
  });

  const currentYear = new Date().getFullYear();

  function handleFormValues(e) {
    setFormValues((prevState) => {
      const newFormValues = {
        ...prevState,
        [e.target.name]: e.target.value,
      };

      return newFormValues;
    });
  }

  function validateFormFields(field, value, max) {
    if (value == "") {
      return "This field is required";
    } else if (isNaN(value) || value < 1 || value > max) {
      return `Must be a valid ${field}`;
    } else {
      return "";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { day, month, year } = formValues;
    const dayError = validateFormFields("day", day, 31);
    const monthError = validateFormFields("month", month, 12);
    const yearError =
      year == ""
        ? "This field is required"
        : isNaN(year) || year > currentYear
        ? "Must be in the past"
        : "";

    setFormErrors((prevState) => {
      const newFormErrors = {
        ...prevState,
        dayErr: dayError,
        monthErr: monthError,
        yearErr: yearError,
      };

      return newFormErrors;
    });

    if (dayError == "" && monthError == "" && yearError == "") {
      const inputDate = dayjs(`${year}-${month}-${day}`);
      const checkValidDate = dayjs(inputDate, "YYYY-MM-DD", true).isValid();

      if (!checkValidDate) {
        console.log("invalid date");
      } else {
        const currentDate = dayjs(new Date());
        const dayDiff = currentDate.diff(inputDate, "day");
        const monthDiff = currentDate.diff(inputDate, "month");
        const yearDiff = currentDate.diff(inputDate, "year");

        setOutput((prevState) => {
          const newOutput = {
            ...prevState,
            day: dayDiff,
            month: monthDiff,
            year: yearDiff,
          };

          return newOutput;
        });

        console.log({
          day: dayDiff,
          month: monthDiff,
          year: yearDiff,
        });
      }
    }
  }

  return (
    <>
      <div className="age-container">
        <form onSubmit={handleSubmit} className="calculate-age-form">
          <div className="input-group">
            <label
              htmlFor="day"
              className={formErrors.dayErr ? "text-error" : ""}
            >
              Day
            </label>

            <input
              type="text"
              id="day"
              className={formErrors.dayErr ? "form-error" : ""}
              name="day"
              value={formValues.dayErr}
              onChange={handleFormValues}
              placeholder="DD"
              maxLength={2}
              inputMode="numeric"
            />

            <span
              style={{
                fontSize: 12,
                fontStyle: "italic",
                display: "inline-block",
                marginTop: 8,
                color: "hsl(0, 100%, 67%)",
                fontWeight: 500,
              }}
            >
              {formErrors.dayErr}
            </span>
          </div>

          <div className="input-group">
            <label
              htmlFor="month"
              className={formErrors.monthErr ? "text-error" : ""}
            >
              Month
            </label>

            <input
              type="text"
              id="month"
              className={formErrors.monthErr ? "form-error" : ""}
              name="month"
              value={formValues.month}
              onChange={handleFormValues}
              placeholder="MM"
            />

            <span
              style={{
                fontSize: 12,
                fontStyle: "italic",
                display: "inline-block",
                marginTop: 8,
                color: "hsl(0, 100%, 67%)",
                fontWeight: 500,
              }}
            >
              {formErrors.monthErr}
            </span>
          </div>

          <div className="input-group">
            <label
              htmlFor="year"
              className={formErrors.yearErr ? "text-error" : ""}
            >
              Year
            </label>

            <input
              type="text"
              id="year"
              className={formErrors.yearErr ? "form-error" : ""}
              name="year"
              value={formValues.yearErr}
              onChange={handleFormValues}
              placeholder="YYYY"
            />

            <span
              style={{
                fontSize: 12,
                fontStyle: "italic",
                display: "inline-block",
                marginTop: 8,
                color: "hsl(0, 100%, 67%)",
                fontWeight: 500,
              }}
            >
              {formErrors.yearErr}
            </span>
          </div>

          <div className="button-container" style={{ marginTop: 20 }}>
            <button className="submit-btn" style={{ cursor: "pointer" }}>
              <img src={image} alt="" />
            </button>
          </div>
        </form>

        {/* <div id="line"></div> */}

        <div id="result">
          <h2>
            <span>{output.year}</span> years
          </h2>

          <h2 style={{ marginBlock: "20px" }}>
            <span>{output.month}</span> months
          </h2>

          <h2>
            <span>{output.day}</span> days
          </h2>
        </div>
      </div>
    </>
  );
};

export default App;
