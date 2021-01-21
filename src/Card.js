import React from "react";
import "./Card.css";
import Box from "./box.svg";

const Card = ({ value, weight, color }) => {
  return (
    <div className={`smallcard ${color ? `blue` : null}`}>
      <div className="card__left">
        <img src={Box} alt="boxImage" />
      </div>
      <div className="card__right">
        <p>📊 Value : {value} </p>
        <p>💰 Weight : {weight} </p>
      </div>
    </div>
  );
};

export default Card;
