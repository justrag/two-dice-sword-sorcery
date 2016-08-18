const dieRoll = () => 1 + Math.floor(Math.random() * 6);

export const rollVsRep = (rep) => {
let rolls=[dieRoll(), dieRoll()];
rolls.forEach((el) => console.log(el));
return rolls.filter(r => r<=rep).length;
}
