import { createStore } from "@reduxjs/toolkit";
import { getGameResult } from "../utils/utils";

const initialState = {
  isGameStarted: false,
  isExtended: false,
  round: {
    player: null,
    ai: null
  },
  history: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_GAME":
      return { ...state, isGameStarted: true };
    case "CHANGE_MODE":
      return { ...state, isExtended: !state.isExtended };
    case "PLAYER_ROUND":
      return {
        ...state,
        round: {
          ...state.round,
          player: action.payload
        }
      };
    case "AI_ROUND":
      const winner = getGameResult(state.round.player, action.payload);
      const newRoundResult = {
        winner: winner,
        player: state.round.player,
        ai: action.payload
      };
      return {
        ...state,
        round: {
          ...state.round,
          ai: action.payload
        },
        history: [...state.history, newRoundResult]
      };
    default:
      return state;
  }
}

export const store = createStore(reducer)