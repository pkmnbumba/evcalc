import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EVCalcResults extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultText: "Please provide input.",
        };
    }
    render() {
        return (
            <div>
            {Object.keys(this.props.evCalcResultData).length === 0 ? this.state.defaultText : calculateBattles(this.props.evCalcResultData).split('\n').map((item, key) => {return <span key = {key}>{item}<br/></span>
            })}
            </div>
        )
    }
}

class EVCalcForm extends React.Component{
    constructor() {
        super();
        this.state = {
            startingEVs: 0,
            targetEVs: 0,
            hasPkrs: false,
            hasPwrItem: false,
            evYield: 'one',
            evCalcResultData: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
        this.setState({
            evCalcResultData: {
                startingEVs: this.state.startingEVs,
                targetEVs: this.state.targetEVs,
                hasPkrs: this.state.hasPkrs,
                hasPwrItem: this.state.hasPwrItem,
                evYield: this.state.evYield
            }
        });
        event.preventDefault();
    }
    
    render() {
        return (
            <div> 
                <form className="container" onSubmit={this.handleSubmit}>
                    <h1>EV Battle Calculator</h1>
                    <label>
                        Has Pokerus:
                        <input name="hasPkrs" type="checkbox"
                        checked={this.state.hasPkrs}
                        onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Has Power Item:
                        <input name="hasPwrItem" type="checkbox"
                        checked={this.state.hasPwrItem}
                        onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Beginning EVs: 
                        <input name="startingEVs" type="number"
                        value={this.state.startingEVs}
                        onChange={this.handleChange} 
                        min = "0"
                        max = {this.state.targetEVs}/>
                    </label>
                    <br />
                    <label>
                        Target EVs:
                        <input name="targetEVs" type="number"
                        value={this.state.targetEVs}
                        onChange={this.handleChange}
                        min = "0"
                        max = "252"/>
                    </label>
                    <br />
                    <label>
                        Select EV yield: 
                        <select name="evYield" value = {this.state.evYield} onChange={this.handleChange}>
                            <option value="one">1</option>
                            <option value="two">2</option>
                        </select>
                    </label>
                    <br />
                    <input type="submit" value="Calculate" />
                </form>
                <br />
                <EVCalcResults evCalcResultData={this.state.evCalcResultData}/>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<EVCalcForm />, document.getElementById('root'));

/*
Properties from props:
props.startingEVs
props.targetEVs
props.hasPkrs
props.hasPwrItem
props.evYield
*/
function calculateBattles(props) {
    var battleText = "";
    const chainBonus = 2;
    var evGain = props.evYield === "one" ? 1 : 2;
    var noPwrItemGain = evGain;
    var evNeeded = props.targetEVs - props.startingEVs;
    var run = true;
    if(props.hasPwrItem) {
        evGain += 8;
    }
    if(props.hasPkrs) {
        evGain *= 2;
        noPwrItemGain *= 2;
    }
    var currEVs = props.startingEVs;
    var numChain = 1;
    while(evNeeded > 0 && run) {
        console.log(evNeeded);
        console.log(currEVs);
        console.log(props.targetEVs);
        var evBattle = 0;
        var numKills = 0;
        if (evNeeded >= evGain*chainBonus && props.hasPwrItem) {
            evBattle = findEVs(evGain*chainBonus, evNeeded);
            numKills = Math.floor(evNeeded/evGain/chainBonus);
            battleText += "For battle " + numChain + ", kill " + numKills + " (w/ power item + SOS).\n";
        } else if (evNeeded >= evGain && props.hasPwrItem) {
            evBattle = findEVs(evGain, evNeeded);
            battleText += "For battle " + numChain + ", kill 1 Pokemon (w/ power item).\n";
        } else if (evNeeded >= noPwrItemGain*chainBonus) {
            evBattle = findEVs(noPwrItemGain*chainBonus, evNeeded);
            numKills = Math.floor(evNeeded/noPwrItemGain/chainBonus);
            battleText += "For battle " + numChain + ", kill " + numKills + " (no power item + SOS).\n";
        } else {
            evBattle = findEVs(noPwrItemGain, evNeeded);
            if(evNeeded === 1) {
                run = false;
                evBattle = 2;
            }
            battleText += "For battle " + numChain + ", kill 1 Pokemon (no power item).\n";
        }
        currEVs = parseInt(currEVs, 10) + parseInt(evBattle, 10);
        battleText += "Current EVs: " + currEVs + ".\n";
        evNeeded = parseInt(evNeeded, 10) - parseInt(evBattle, 10);
        numChain = parseInt(numChain, 10) + 1;
    }
    return battleText;
}

function findEVs(ev, total) {
    return Math.floor(total/ev)*ev;
}