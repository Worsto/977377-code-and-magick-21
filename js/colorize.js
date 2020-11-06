window.colorize = function (element, value, array) {
  element.addEventListener('click', function () {
    value = window.util.findNextInArray(value, array)
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = value
    } else if (element.tagName.toLowerCase() === 'use') {
      element.style.fill = value
    } else {
      throw new Error('Ошибка! Использован неправильный элемент')
    }
  })
}
