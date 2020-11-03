window.colorize = {
  changeColor (element, input, array) {
    element.addEventListener('click', function () {
      const value = window.util.findNextInArray(input, array)
      input.value = value
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = value
      } else {
        element.style.fill = value
      }
    })
  }
}
