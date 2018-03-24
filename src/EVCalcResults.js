import React from "react";
import calculateBattles from "./calc";

const Mark = ({ val }) => <span className="mark">{val ? '✓' : '✘'}</span>

export default class EVCalcResults extends React.Component {
    render() {
      const res = calculateBattles(this.props.evCalcResultData);
      return (
        <div className="tableWrapper">
          <table>
            <tbody>
              <tr>
                <th>Chain</th>
                <th>Kills</th>
                <th>Power Item</th>
                <th>SOS</th>
                <th>Intermediate EVs</th>
              </tr>
              {res.map((e, i) => 
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{e.kills}</td>
                  <td><Mark val={e.powerItem}/></td>
                  <td><Mark val={e.sos}/></td>
                  <td>{e.currEvs}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }
  }