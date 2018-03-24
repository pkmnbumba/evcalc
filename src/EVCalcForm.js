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
        <div className="mainWrapper">
          <div className="main">
            <h1>EV Battle Calculator</h1>
            <label>
              Has Pokérus
              <input
                name="hasPkrs"
                type="checkbox"
                checked={this.state.hasPkrs}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Has Power Item
              <input
                name="hasPwrItem"
                type="checkbox"
                checked={this.state.hasPwrItem}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Beginning EVs
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
              Target EVs
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
              EV Yield
              <select
                name="evYield"
                value={this.state.evYield}
                onChange={this.handleChange}
              >
                <option value="one">1</option>
                <option value="two">2</option>
              </select>
            </label>
            <EVCalcResults evCalcResultData={this.state} />
          </div>
          <footer>
            Made with ❤ by bumba and Cu3PO42
          </footer>
        </div>
      );
    }
  }