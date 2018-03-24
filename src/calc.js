/*
Properties from props:
props.startingEVs
props.targetEVs
props.hasPkrs
props.hasPwrItem
props.evYield
*/
export default function calculateBattles(props) {
    var battleText = "";
    const chainBonus = 2;
    var evGain = props.evYield === "one" ? 1 : 2;
    var noPwrItemGain = evGain;
    var evNeeded = props.targetEVs - props.startingEVs;
    var run = true;
    if (props.hasPwrItem) {
      evGain += 8;
    }
    if (props.hasPkrs) {
      evGain *= 2;
      noPwrItemGain *= 2;
    }
    var currEVs = props.startingEVs;
    var numChain = 1;
    while (evNeeded > 0 && run) {
      var evBattle = 0;
      var numKills = 0;
      if (evNeeded >= evGain * chainBonus && props.hasPwrItem) {
        evBattle = findEVs(evGain * chainBonus, evNeeded);
        numKills = Math.floor(evNeeded / evGain / chainBonus);
        battleText +=
          "For battle " +
          numChain +
          ", kill " +
          numKills +
          " (w/ power item + SOS).\n";
      } else if (evNeeded >= evGain && props.hasPwrItem) {
        evBattle = findEVs(evGain, evNeeded);
        battleText +=
          "For battle " + numChain + ", kill 1 Pokemon (w/ power item).\n";
      } else if (evNeeded >= noPwrItemGain * chainBonus) {
        evBattle = findEVs(noPwrItemGain * chainBonus, evNeeded);
        numKills = Math.floor(evNeeded / noPwrItemGain / chainBonus);
        battleText +=
          "For battle " +
          numChain +
          ", kill " +
          numKills +
          " (no power item + SOS).\n";
      } else {
        evBattle = findEVs(noPwrItemGain, evNeeded);
        if (evNeeded < noPwrItemGain) {
          run = false;
          evBattle = noPwrItemGain;
        }
        battleText +=
          "For battle " + numChain + ", kill 1 Pokemon (no power item).\n";
      }
      currEVs = parseInt(currEVs, 10) + parseInt(evBattle, 10);
      battleText += "Current EVs: " + currEVs + ".\n";
      evNeeded = parseInt(evNeeded, 10) - parseInt(evBattle, 10);
      numChain = parseInt(numChain, 10) + 1;
    }
    return battleText;
  }
  
  function findEVs(ev, total) {
    return Math.floor(total / ev) * ev;
  }