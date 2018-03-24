import React from "react";
import EVCalcResults from "./EVCalcResults";

export default class EVCalcForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startingEVs: 0,
        targetEVs: 0,
        hasPkrs: false,
        hasPwrItem: false,
        evYield: "one"
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <div>
          <form className="container" onSubmit={this.handleSubmit}>
            <h1>EV Battle Calculator</h1>
            <label>
              Has Pokerus:
              <input
                name="hasPkrs"
                type="checkbox"
                checked={this.state.hasPkrs}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Has Power Item:
              <input
                name="hasPwrItem"
                type="checkbox"
                checked={this.state.hasPwrItem}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Beginning EVs:
              <input
                name="startingEVs"
                type="number"
                value={this.state.startingEVs}
                onChange={this.handleChange}
                min="0"
                max={this.state.targetEVs}
              />
            </label>
            <br />
            <label>
              Target EVs:
              <input
                name="targetEVs"
                type="number"
                value={this.state.targetEVs}
                onChange={this.handleChange}
                min="0"
                max="252"
              />
            </label>
            <br />
            <label>
              Select EV yield:
              <select
                name="evYield"
                value={this.state.evYield}
                onChange={this.handleChange}
              >
                <option value="one">1</option>
                <option value="two">2</option>
              </select>
            </label>
            <br />
          </form>
          <br />
          <EVCalcResults evCalcResultData={this.state} />
        </div>
      );
    }
  }