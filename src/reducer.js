import {ROLL_FOR_INITIATIVE, SET_STATE, TARGET} from './actions';
import {rollVsRep,findLeaderRep} from './game_utils';

function setState(state, newState) {
	return {...state, ...newState};
}

function makeActive(players,index) {
	//player index: 1,2 -> array index 0,1
	let p=[...players];
		console.debug("new-p: %o",p);

	let active = (index==1)?0:1;
	let inactive = (index==1)?1:0;
	p[active].active=true;
	p[inactive].active=false;
	return p;
}

function rollForInitiative(state) {
	let players=state.players;
//check if it's the beginnig of the game
if (state.turn!=0) return state;

let rep1=findLeaderRep(players[0].figures);
let rep2=findLeaderRep(players[1].figures);

let roll1=rollVsRep(rep1);
let roll2=rollVsRep(rep2);

let pass1=roll1.passed;
let pass2=roll2.passed;

let newPlayers;
let textlog;

if (pass1>pass2) {
	textlog=`Player 1's leader (Rep ${rep1}) passed ${pass1}d6 -- more than player 2's leader (Rep ${rep2}, ${pass2}d6) -> player 1 becomes active`;
	newPlayers=makeActive(players,1);
} else if (pass2>pass1) {
	textlog=`Player 1's leader (Rep ${rep1}) passed ${pass1}d6 -- less than player 2's leader (Rep ${rep2}, ${pass2}d6) -> player 2 becomes active`;
	newPlayers=makeActive(players,2);
} else {
	textlog=`Both leaders (Player 1 - Rep ${rep1}, Player 2 - Rep ${rep2}) passed the same number of dice (${pass1}d6) -- `;
	if (rep1>rep2) {
		textlog+=`Player 1's leader has higher Rep, so he becomes active`;
		newPlayers=makeActive(players,1);
	} else if (rep2>rep1) {
		textlog+=`Player 2's leader has higher Rep, so he becomes active`;
		newPlayers=makeActive(players,2);
	} else {
		let starting =players.filter(f => (f.moving))[0].sequence;
		newPlayers=makeActive(players,starting);
		textlog+=`Both leaders' reps are the same, so the moving side (player ${starting}) becomes active. `;
	}

}

let newState={turn: 1, phase: 0, players: newPlayers, textlog};
return {...state,...newState};
}

function target(state) {
	if (state.phase!=0) {
		// only in phase 0 "Movement"
		return state;
	}
let newState={...state};

let atkPlayer=newState.players.filter((p) => p.active)[0];
let defPlayer=newState.players.filter((p) => !p.active)[0];

let atkFigs=atkPlayer.figures;
let defFigs=defPlayer.figures;

let atkCount=atkFigs.length;
let defCount=defFigs.length;

let defIds=defFigs.map((f) => f.id);

let defLeft=defCount;
let atkAssigned=0;
atkFigs.forEach((f) => {
// HEREHEREHERE

});

console.debug("defIds: %o",defIds);

return newState;
}

export default function(state = {}, action) {
	switch (action.type) {
		case SET_STATE:
		return setState(state, action.state);
		case ROLL_FOR_INITIATIVE: 
		return rollForInitiative(state);
		case TARGET:
		return target(state);
	}
	return state;
}