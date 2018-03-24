import React from "react";
import calculateBattles from "./calc";

export default class EVCalcResults extends React.Component {
    render() {
      const res = calculateBattles(this.props.evCalcResultData);
      return (
        <div>
          {res.trim() === ''
            ? "There's nothing to do!"
            : res
                .split("\n")
                .map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
        </div>
      );
    }
  }