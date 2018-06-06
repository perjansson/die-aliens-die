import { MOVE_OBJECTS, START_GAME, SHOOT } from 'actions'
import { calculateAngle, calculateNextPosition } from 'utils/formulas'
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
  cannonBalls: [],
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

const shoot = (state, action) => {
  const { payload } = action

  if (!state.gameState.started) {
    return state
  }

  const { cannonBalls } = state.gameState
  if (cannonBalls.length === 2) {
    return state
  }

  const { x, y } = payload || { x: 0, y: 0 }
  const angle = calculateAngle(0, 0, x, y)
  const id = new Date().getTime()
  const cannonBall = {
    position: { x: 0, y: 0 },
    angle,
    id,
  }

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonBalls: [...cannonBalls, cannonBall],
    },
  }
}

const moveBalls = cannonBalls =>
  cannonBalls
    .filter(
      cannonBall =>
        cannonBall.position.y > -800 &&
        cannonBall.position.x > -500 &&
        cannonBall.position.x < 500,
    )
    .map(cannonBall => {
      const { x, y } = cannonBall.position
      const { angle } = cannonBall
      return {
        ...cannonBall,
        position: calculateNextPosition(x, y, angle, 5),
      }
    })

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

      const cannonBalls = moveBalls(state.gameState.cannonBalls)

      const now = new Date().getTime()
      const flyingObjects = newState.gameState.flyingObjects.filter(
        flighingObject => now - flighingObject.createdAt < 4000,
      )

      const { x, y } = mousePosition
      const angle = calculateAngle(0, 0, x, y)
      return {
        ...newState,
        gameState: {
          ...newState.gameState,
          flyingObjects,
          cannonBalls,
        },
        angle,
      }
    }

    case SHOOT:
      return shoot(state, action)

    default:
      return state
  }
}

export default reducer
