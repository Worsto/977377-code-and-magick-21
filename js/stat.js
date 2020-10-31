
const CLOUD_WIDTH = 420
const CLOUD_HEIGHT = 270
const CLOUD_X = 100
const CLOUD_Y = 10
const GAP = 10
const BAR_WIDTH = 40
const BAR_HEIGHT = 140

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT)
}

const getMaxElement = function (arr) {
  let maxElement = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i]
    }
  }

  return maxElement
}

const getMessage = function (ctx, x, y, textArr) {
  ctx.fillStyle = `#000`
  ctx.textBaseline = `middle`
  ctx.textAlign = `left`
  for (let i = 0; i < textArr.length; i++) {
    ctx.fillText(
        textArr[i],
        x,
        y + 20 * i
    )
  }
}

const getScore = function (ctx, quantity, max, score, step) {
  ctx.fillStyle = `#000`
  ctx.textBaseline = `top`
  ctx.fillText(
      Math.round(score),
      CLOUD_X + (CLOUD_WIDTH / (quantity + 1)) * (step + 1),
      CLOUD_HEIGHT - GAP * 5 - (BAR_HEIGHT * score) / max
  )
}

const getRandomToHundred = function () {
  return (Math.floor(Math.random() * 100) + 1)
}

const getBarColor = function (ctx, name) {
  if (name === `Вы`) {
    ctx.fillStyle = `#F00`
  } else {
    ctx.fillStyle = `hsl(240, ${getRandomToHundred()}%, 50%)`
  }
}

const renderGistogramm = function (ctx, quantity, max, name, score, step) {
  ctx.fillRect(
      CLOUD_X + (CLOUD_WIDTH / (quantity + 1)) * (step + 1) - (BAR_WIDTH / 2),
      CLOUD_HEIGHT - GAP * 3 - (BAR_HEIGHT * score) / max,
      BAR_WIDTH,
      (BAR_HEIGHT * score) / max
  )
}

const renderName = function (ctx, name, quantity, step) {
  ctx.fillStyle = `#000`
  ctx.textAlign = `center`
  ctx.textBaseline = `middle`
  ctx.fillText(
      name,
      CLOUD_X + (CLOUD_WIDTH / (quantity + 1)) * (step + 1),
      CLOUD_HEIGHT - GAP
  )
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  )
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  )
  getMessage(
      ctx,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 3,
      [`Ура вы победили!`, `Список результатов:`]
  )

  const maxTime = getMaxElement(times)

  for (let i = 0; i < players.length; i++) {
    renderName(
        ctx,
        players[i],
        players.length,
        i
    )

    ctx.fillStyle = getBarColor(ctx, players[i])

    renderGistogramm(
        ctx,
        players.length,
        maxTime,
        players[i],
        times[i],
        i
    )

    getScore(
        ctx,
        players.length,
        maxTime,
        times[i],
        i
    )
  }
}
