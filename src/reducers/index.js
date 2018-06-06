import { MOVE_OBJECTS, START_GAME } from '../actions'
import { calculateAngle } from '../utils/formulas'

const initialGameState = {
  started: false,
  kills: 0,
  lives: 3,
}

const initialState = { angle: 45, gameState: initialGameState }

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case START_GAME: {
      return {
        ...state,
        gameState: {
          ...initialGameState,
          started: true,
        },
      }
    }

    case MOVE_OBJECTS: {
      if (!payload) {
        return state
      }

      const { x, y } = payload
      const angle = calculateAngle(0, 0, x, y)
      return {
        ...state,
        angle,
      }
    }

    default:
      return state
  }
}

export default reducer
