/*
Properties from props:
props.startingEVs
props.targetEVs
props.hasPkrs
props.hasPwrItem
props.evYield
*/
export default function calculateBattles(props) {
    const chainBonus = 2;
    const actions = [];
    let evGain = props.evYield === "one" ? 1 : 2;
    let noPwrItemGain = evGain;
    let evNeeded = props.targetEVs - props.startingEVs;

    if (props.hasPwrItem) {
      evGain += 8;
    }
    if (props.hasPkrs) {
      evGain *= 2;
      noPwrItemGain *= 2;
    }

    let currEVs = props.startingEVs;
    while (evNeeded > 0) {
      let action;
      let evBattle = 0;
      let numKills = 0;
      if (evNeeded >= evGain * chainBonus && props.hasPwrItem) {
        evBattle = findEVs(evGain * chainBonus, evNeeded);
        numKills = Math.floor(evNeeded / evGain / chainBonus);
        action = { kills: numKills, powerItem: true, sos: true };
      } else if (evNeeded >= evGain && props.hasPwrItem) {
        evBattle = findEVs(evGain, evNeeded);
        action = { kills: numKills, powerItem: true, sos: false };
      } else if (evNeeded >= noPwrItemGain * chainBonus) {
        evBattle = findEVs(noPwrItemGain * chainBonus, evNeeded);
        numKills = Math.floor(evNeeded / noPwrItemGain / chainBonus);
        action = { kills: numKills, powerItem: false, sos: true };
      } else {
        evBattle = Math.ceil(evNeeded / noPwrItemGain) * noPwrItemGain;
        action = { kills: 1, powerItem: false, sos: false };
      }
      currEVs += evBattle;
      evNeeded -= evBattle;
      action.currEvs = currEVs;
      actions.push(action);
    }
    return actions;
  }
  
  function findEVs(ev, total) {
    return Math.floor(total / ev) * ev;
  }