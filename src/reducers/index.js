import { MOVE_OBJECTS } from '../actions'
import { calculateAngle } from '../utils/formulas'

const initialState = { angle: 0 }

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  if (!payload) {
    return state
  }

  switch (type) {
    case MOVE_OBJECTS: {
      const { x, y } = payload
      const angle = calculateAngle(0, 0, x, y)
      return { ...state, angle }
    }

    default:
      return state
  }
}

export default reducer
