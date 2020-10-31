
// Глобальные константы
const WIZARDS_QUANTITY = 4
const WIZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
]
const WIZARD_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольниц',
  'Нионго',
  'Ирвинг'
]
const WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
]
const WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
]
const WIZARD_FIREBALLS_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
]

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 25

// Переменные с DOM элементами
const setup = document.querySelector('.setup')
const setupOpen = document.querySelector('.setup-open')
const setupClose = setup.querySelector('.setup-close')
const userNameInput = setup.querySelector('.setup-user-name')
const currentWizard = setup.querySelector('.setup-wizard-appearance')
const currentWisardCoat = currentWizard.querySelector('.wizard-coat')
const currentWisardCoatInput = currentWizard.querySelector('[name = "coat-color"]')
const currentWisardEyes = currentWizard.querySelector('.wizard-eyes')
const currentWisardEyesInput = currentWizard.querySelector('[name = "eyes-color"]')
const fireball = setup.querySelector('.setup-fireball-wrap')
const fireballInput = setup.querySelector('[name = "fireball-color"]')

// Утилиты
function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

function getRandomFromArray (arr) {
  return arr[getRandomNumber(0, arr.length - 1)]
}

function findNextInArray (element, array) {
  if (array.indexOf(element.value) === array.length - 1) {
    return array[0]
  } else {
    return array[array.indexOf(element.value) + 1]
  }
}

// Функции для работы с окном
function onPopupEscPress (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault()
    hideMenu()
  }
}

function showMenu () {
  setup.classList.remove('hidden')

  document.addEventListener('keydown', onPopupEscPress)
}

function hideMenu () {
  setup.classList.add('hidden')

  document.removeEventListener('keydown', onPopupEscPress)
}

function showWizards () {
  setup.querySelector('.setup-similar').classList.remove('hidden')
}

// Обработчики событий работы с окном
setupOpen.addEventListener('click', showMenu)

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' || evt.code === 'Space') {
    showMenu()
  }
})

setupClose.addEventListener('click', hideMenu)

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' || evt.code === 'Space') {
    hideMenu()
  }
})

userNameInput.addEventListener('input', function () {
  const valueLength = userNameInput.value.length

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.')
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.')
  } else {
    userNameInput.setCustomValidity('')
  }

  userNameInput.reportValidity()
})

// Функции для обработки секции похожих волшебников
function createWizardMock () {
  return {
    name: `${getRandomFromArray(WIZARD_FIRST_NAMES)} ${getRandomFromArray(WIZARD_SECOND_NAMES)}`,
    coatColor: getRandomFromArray(WIZARD_COAT_COLORS),
    eyesColor: getRandomFromArray(WIZARD_EYES_COLORS)
  }
}

function createWizards (amount) {
  const wizards = []
  for (let i = 0; i < amount; i++) {
    wizards.push(createWizardMock())
  }

  return wizards
}

function renderWizard (wizard) {
  const similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item')

  const wizardElement = similarWizardTemplate.cloneNode(true)
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor

  return wizardElement
}

function createWizardsList (array) {
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]))
  }

  return fragment
}

function renderWizardsList (array) {
  const similarListElement = setup.querySelector('.setup-similar-list')
  similarListElement.appendChild(createWizardsList(array))
}

// Файл colorize.js

window.colorize = {
  changeColor (element, input, array) {
    element.addEventListener('click', function () {
      const value = findNextInArray(input, array)
      input.value = value
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = value
      } else {
        element.style.fill = value
      }
    })
  }
}

window.colorize.changeColor(currentWisardCoat, currentWisardCoatInput, WIZARD_COAT_COLORS)
window.colorize.changeColor(currentWisardEyes, currentWisardEyesInput, WIZARD_EYES_COLORS)
window.colorize.changeColor(fireball, fireballInput, WIZARD_FIREBALLS_COLORS)

// Вызовы
const wizards = createWizards(WIZARDS_QUANTITY)
renderWizardsList(wizards)
showWizards()
