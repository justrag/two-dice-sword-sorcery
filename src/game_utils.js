const dieRoll = () => 1 + Math.floor(Math.random() * 6);

export const rollVsRep = (rep) => {
  const rolls = [dieRoll(), dieRoll()];
  const results = rolls.map(roll => ({
    roll,
    passed: roll <= rep,
  }));
  const passed = results.filter(r => r.passed).length;
  return { rep, results, passed };
};
