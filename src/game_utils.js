const dieRoll = () => 1 + Math.floor(Math.random() * 6);

export const rollVsRep = (rep) => {
	let rolls=[dieRoll(), dieRoll()];
	let results=rolls.map((el) => {return {
		roll: el,
		passed: el<=rep
	}});
	let passed=results.filter(r => r.passed).length;
	return {results, passed};
};

export const findLeaderRep = (figures) => {
	console.debug("figures: %o",figures);
	let f=figures.filter(f => (f.type=="STAR"));
	if (f.length) {return f[0].rep;}
	else {
		let reps=figures.map((el) => el.rep);
		return Math.max(...reps);
	}
}