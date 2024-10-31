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
    const dayErr = validateFormFields("day", day, 31);
    const monthErr = validateFormFields("month", month, 12);
    const yearErr =
      year == ""
        ? "This field is required"
        : isNaN(year) || year > currentYear
        ? "Must be in the past"
        : "";

    setFormErrors((prevState) => {
      const newFormErrors = {
        ...prevState,
        dayErr,
        monthErr,
        yearErr,
      };

      return newFormErrors;
    });

    // Validate the date if there are no errors
    if (dayErr === "" && monthErr === "" && yearErr === "") {
      let noOfMonths = 0;
      let noOfDays = 0;
      const currentDate = dayjs();
      const inputDate = dayjs(`${year}-${month}-${day}`);
      const checkValidDate = dayjs(
        `${year}-${month}-${day}`,
        "YYYY-MM-DD",
        true
      ).isValid();

      if (!checkValidDate) {
        setFormErrors((prevState) => {
          const newFormErrors = {
            ...prevState,
            dayErr: "Date is invalid",
          };

          return newFormErrors;
        });

        return false;
      }

      if (inputDate.month() > currentDate.month()) {
        noOfMonths = 12 - (inputDate.month() - currentDate.month());
      } else {
        noOfMonths = inputDate.month() - currentDate.month();
      }

      if (inputDate.date() > currentDate.date()) {
        noOfDays =
          inputDate.daysInMonth() - inputDate.date() + currentDate.date();
      } else {
        noOfDays = inputDate.date() - currentDate.date();
      }

      const yearDiff = Math.abs(inputDate.diff(currentDate, "year"));
      const monthDiff = Math.abs(noOfMonths);
      const dayDiff = Math.abs(noOfDays);

      setOutput((prevState) => {
        const newOutput = {
          ...prevState,
          day: dayDiff,
          month: monthDiff,
          year: yearDiff,
        };

        return newOutput;
      });
    }
  }

  return (
    <>
      <main className="age-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
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
                className={formErrors.dayErr ? "input-error" : ""}
                name="day"
                value={formValues.dayErr}
                onChange={handleFormValues}
                placeholder="DD"
              />

              <span>{formErrors.dayErr}</span>
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
                className={formErrors.monthErr ? "input-error" : ""}
                name="month"
                value={formValues.month}
                onChange={handleFormValues}
                placeholder="MM"
              />

              <span>{formErrors.monthErr}</span>
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
                className={formErrors.yearErr ? "input-error" : ""}
                name="year"
                value={formValues.yearErr}
                onChange={handleFormValues}
                placeholder="YYYY"
              />

              <span>{formErrors.yearErr}</span>
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-btn">
              <img src={image} alt="" />
            </button>
          </div>
        </form>

        <div id="result">
          <h2>
            <span>{output.year}</span> years
          </h2>

          <h2>
            <span>{output.month}</span> months
          </h2>

          <h2>
            <span>{output.day}</span> days
          </h2>
        </div>
      </main>
    </>
  );
};

export default App;
