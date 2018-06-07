import { MOVE_OBJECTS, START_GAME, SHOOT } from 'actions'
import {
  calculateAngle,
  calculateNextPosition,
  checkCollision,
} from 'utils/formulas'
import {
  maxFlyingObjects,
  createInterval,
  flyingObjectsStarterPositions,
  flyingObjectsStarterYAxis,
  gameHeight,
  flyingObjectsLifeTime,
  flyingObjectsBaseWidth,
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

const checkCollisions = (cannonBalls, flyingDiscs) => {
  const objectsDestroyed = []

  flyingDiscs.forEach(flyingDisc => {
    const currentLifeTime = new Date().getTime() - flyingDisc.createdAt
    const calculatedPosition = {
      x: flyingDisc.position.x,
      y:
        flyingDisc.position.y +
        currentLifeTime / flyingObjectsLifeTime * gameHeight,
    }

    const rectA = {
      x1: calculatedPosition.x - flyingObjectsBaseWidth,
      y1: calculatedPosition.y - 10,
      x2: calculatedPosition.x + flyingObjectsBaseWidth,
      y2: calculatedPosition.y + 10,
    }

    cannonBalls.forEach(cannonBall => {
      const { position } = cannonBall
      const rectB = {
        x1: position.x - 8,
        y1: position.y - 8,
        x2: position.x + 8,
        y2: position.y + 8,
      }

      const isCollision = checkCollision(rectA, rectB)
      if (isCollision) {
        objectsDestroyed.push({
          cannonBallId: cannonBall.id,
          flyingDiscId: flyingDisc.id,
        })
      }
    })
  })

  return objectsDestroyed
}

const moveObjects = (state, action) => {
  const { payload } = action
  const mousePosition = payload || { x: 0, y: 0 }
  const newState = createFlyingObjects(state)

  let cannonBalls = moveBalls(state.gameState.cannonBalls)

  const now = new Date().getTime()
  let flyingObjects = newState.gameState.flyingObjects.filter(
    flighingObject => now - flighingObject.createdAt < flyingObjectsLifeTime,
  )

  const lostLife = state.gameState.flyingObjects.length > flyingObjects.length
  let { lives } = state.gameState
  if (lostLife) {
    lives -= 1
  }

  const started = state.gameState.started && lives > 0
  if (!started) {
    flyingObjects = []
    cannonBalls = []
    lives = 3
  }

  const { x, y } = mousePosition
  const angle = calculateAngle(0, 0, x, y)

  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects)
  const cannonBallsDestroyed = objectsDestroyed.map(
    object => object.cannonBallId,
  )
  const flyingDiscsDestroyed = objectsDestroyed.map(
    object => object.flyingDiscId,
  )

  cannonBalls = cannonBalls.filter(cannonBall =>
    cannonBallsDestroyed.indexOf(cannonBall.id),
  )
  flyingObjects = flyingObjects.filter(cannonBall =>
    flyingDiscsDestroyed.indexOf(cannonBall.id),
  )

  const kills = state.gameState.kills + flyingDiscsDestroyed.length

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls: [...cannonBalls],
      lives,
      started,
      kills,
    },
    angle,
  }
}

const startGame = state => ({
  ...state,
  gameState: {
    ...initialGameState,
    started: true,
  },
})

const reducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case START_GAME: {
      return startGame(state, action)
    }

    case MOVE_OBJECTS: {
      return moveObjects(state, action)
    }

    case SHOOT:
      return shoot(state, action)

    default:
      return state
  }
}

export default reducer
