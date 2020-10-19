'use strict'

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

const onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault()
    hideMenu()
  }
}

const showMenu = function () {
  setup.classList.remove('hidden')

  document.addEventListener('keydown', onPopupEscPress)
}

const hideMenu = function () {
  setup.classList.add('hidden')

  document.removeEventListener('keydown', onPopupEscPress)
}

function showWizards () {
  setup.querySelector('.setup-similar').classList.remove('hidden')
}

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

function getRandomFromArray (arr) {
  return arr[getRandomNumber(0, arr.length - 1)]
}

function createWizardMok () {
  return {
    name: `${getRandomFromArray(WIZARD_FIRST_NAMES)} ${getRandomFromArray(WIZARD_SECOND_NAMES)}`,
    coatColor: getRandomFromArray(WIZARD_COAT_COLORS),
    eyesColor: getRandomFromArray(WIZARD_EYES_COLORS)
  }
}

function createWizards (amount) {
  const wizards = []
  for (let i = 0; i < amount; i++) {
    wizards.push(createWizardMok())
  }

  return wizards
}

function renderWizard (wizard) {
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

function changeWizardDetail (element, array) {
  let j = 1

  for (let i = 0; array[i] !== element.value; i++) {
    j = i + 2
  }

  if (j === array.length) {
    j = 0
  }

  return array[j]
}

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

currentWisardCoat.addEventListener('click', () => {
  currentWisardCoatInput.value = changeWizardDetail(currentWisardCoatInput, WIZARD_COAT_COLORS)
  currentWisardCoat.style.fill = currentWisardCoatInput.value
})

currentWisardEyes.addEventListener('click', () => {
  currentWisardEyesInput.value = changeWizardDetail(currentWisardEyesInput, WIZARD_EYES_COLORS)
  currentWisardEyes.style.fill = currentWisardEyesInput.value
})

fireball.addEventListener('click', () => {
  fireballInput.value = changeWizardDetail(fireballInput, WIZARD_FIREBALLS_COLORS)
  fireball.style.background = fireballInput.value
})

setupOpen.addEventListener('click', () => showMenu())

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' || evt.code === 'Space') {
    showMenu()
  }
})

setupClose.addEventListener('click', () => hideMenu())

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
    // лишний кусок кода. html и так не даст ввести больше 25 символов. эта проверка никогда не сработает
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.')
  } else {
    userNameInput.setCustomValidity('')
  }

  userNameInput.reportValidity()
})

const similarListElement = setup.querySelector('.setup-similar-list')

const similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item')

const wizards = createWizards(WIZARDS_QUANTITY)

similarListElement.appendChild(createWizardsList(wizards))

showWizards()
