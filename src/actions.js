export const newGame = () => ({
  type: "NEW_GAME"
});

export const changeMode = () => ({
  type: "CHANGE_MODE"
});

export const playerRound = (choice) => ({
  type: "PLAYER_ROUND",
  payload: choice
});

export const aiRound = (choice) => ({
  type: "AI_ROUND",
  payload: choice
});