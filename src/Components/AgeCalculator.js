import React, { useState } from "react";
import "./AgeCalculator.css";
import DownButton from "../assets/images/icon-arrow.svg";
const AgeCalculator = () => {
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate({ ...date, [name]: value });
  };

  const calculateAge = (e) => {
    e.preventDefault();
    const { day, month, year } = date;
    let errors = {};

    if (!day || day < 1 || day > 31) errors.day = "Must be a valid date";
    if (!month || month < 1 || month > 12)
      errors.month = "Must be a valid month";
    if (!year || year > new Date().getFullYear())
      errors.year = "Must be a valid year";
    if (Object.keys(errors).length > 0) return setErrors(errors);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    if (birthDate > today) {
      setErrors({ date: "Date cannot be in the future" });
      return;
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
    setAge({ years: ageYears, months: ageMonths, days: ageDays });
    setErrors({});
  };
  return (
    <div className="card">
      <form onSubmit={calculateAge}>
        <div className="row">
          <div className="first-container">
            <div className="column">
              <label
                style={{
                  color: errors.day ? "red" : "",
                  letterSpacing: "5px",
                }}
              >
                Day
              </label>
              <input
                type="number"
                name="day"
                value={date.day}
                onChange={handleChange}
                style={{
                  borderColor: Object.keys(errors).length > 0 ? "red" : "",
                  letterSpacing: "5px",
                }}
              />
              {errors.day && (
                <span className="error-message">{errors.day}</span>
              )}
            </div>
            <div className="column">
              <label
                style={{
                  color: errors.month ? "red" : "",
                  letterSpacing: "5px",
                }}
              >
                month
              </label>
              <input
                type="number"
                name="month"
                value={date.month}
                onChange={handleChange}
                style={{
                  borderColor: Object.keys(errors).length > 0 ? "red" : "",
                }}
              />
              {errors.month && (
                <span className="error-message">{errors.month}</span>
              )}
            </div>
            <div className="column">
              <label
                style={{
                  color: errors.year ? "red" : "",
                  letterSpacing: "5px",
                }}
              >
                Year
              </label>
              <input
                type="number"
                name="year"
                value={date.year}
                onChange={handleChange}
                style={{
                  borderColor: Object.keys(errors).length > 0 ? "red" : "",
                }}
              />
              {errors.year && (
                <span className="error-message">{errors.year}</span>
              )}
            </div>
          </div>
          <div className="divider">
            <button type="submit">
              <img src={DownButton} width="30" height="30" alt="Calculate" />
            </button>
          </div>
          <div className="result">
            <div className="result-column1">
              <p className="value">{age.years}</p>
              <p className="value">{age.months}</p>
              <p className="value">{age.days}</p>
            </div>
            <div className="result-column2">
              <label>years</label>
              <label>months</label>
              <label>days</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgeCalculator;
