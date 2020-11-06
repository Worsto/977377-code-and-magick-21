(function () {
  const getMaxElement = function (arr) {
    let maxElement = arr[0]

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i]
      }
    }

    return maxElement
  }

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  const getRandomFromArray = function (arr) {
    return arr[window.util.getRandomNumber(0, arr.length - 1)]
  }

  const findNextInArray = function (element, array) {
    if (array.indexOf(element) === array.length - 1) {
      return array[0]
    } else {
      return array[array.indexOf(element) + 1]
    }
  }

  window.util = {
    getMaxElement,
    getRandomNumber,
    getRandomFromArray,
    findNextInArray
  }
})()
