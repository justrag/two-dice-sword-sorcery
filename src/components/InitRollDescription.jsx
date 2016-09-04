import React from 'react';

const InitRollDescription = ({ rep1, rep2, roll1, roll2, startingPlayer }) => {
  let textlog;
  const pass1 = roll1.passed;
  const pass2 = roll2.passed;
  if (pass1 > pass2) {
    textlog = `Player 1's leader (Rep ${rep1}) passed ${pass1}d6 -- more than player 2's leader (Rep ${rep2}, ${pass2}d6) -> player 1 becomes active`;
  } else if (pass2 > pass1) {
    textlog = `Player 1's leader (Rep ${rep1}) passed ${pass1}d6 -- less than player 2's leader (Rep ${rep2}, ${pass2}d6) -> player 2 becomes active`;
  } else {
    textlog = `Both leaders (Player 1 - Rep ${rep1}, Player 2 - Rep ${rep2}) passed the same number of dice (${pass1}d6) -- `;
    if (rep1 > rep2) {
      textlog += `Player 1's leader has higher Rep, so he becomes active`;
    } else if (rep2 > rep1) {
      textlog += `Player 2's leader has higher Rep, so he becomes active`;
    } else {
      textlog += `Both leaders' reps are the same, so the moving side (player ${startingPlayer}) becomes active. `;
    }
  }
  return (<div>{textlog}</div>);
};

export default InitRollDescription;
