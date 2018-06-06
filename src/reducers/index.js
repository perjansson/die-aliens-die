import { MOVE_OBJECTS, START_GAME } from 'actions'
import { calculateAngle } from 'utils/formulas'
import {
  maxFlyingObjects,
  createInterval,
  flyingObjectsStarterPositions,
  flyingObjectsStarterYAxis,
} from 'utils/constants'

const initialGameState = {
  started: false,
  kills: 0,
  lives: 3,
  flyingObjects: [],
  lastObjectCreatedAt: new Date(),
}

const initialState = { angle: 45, gameState: initialGameState }

const createFlyingObjects = state => {
  const { gameState } = state
  if (!gameState.started) {
    return state
  }

  const now = new Date().getTime()
  const { lastObjectCreatedAt, flyingObjects } = gameState
  const shouldCreateNewObject =
    now - lastObjectCreatedAt.getTime() > createInterval &&
    flyingObjects.length < maxFlyingObjects

  if (!shouldCreateNewObject) {
    return state
  }

  const id = new Date().getTime()
  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects)
  const flyingObjectPosition = flyingObjectsStarterPositions[predefinedPosition]
  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectsStarterYAxis,
    },
    createdAt: new Date().getTime(),
    id,
  }

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [...state.gameState.flyingObjects, newFlyingObject],
      lastObjectCreatedAt: new Date(),
    },
  }
}

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
      const mousePosition = payload || { x: 0, y: 0 }
      const newState = createFlyingObjects(state)

      const { x, y } = mousePosition
      const angle = calculateAngle(0, 0, x, y)
      return {
        ...newState,
        angle,
      }
    }

    default:
      return state
  }
}

export default reducer
