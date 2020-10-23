

const WIZARDS_QUANTITY = 4
const WIZARD_FIRST_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
]
const WIZARD_SECOND_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольниц`,
  `Нионго`,
  `Ирвинг`
]
const WIZARD_COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
]
const WIZARD_EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
]

const userDialog = document.querySelector(`.setup`)

function showMenu() {
  document.querySelector(`.setup`).classList.remove(`hidden`)
}

function showWizards() {
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`)
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

function getRandomFromArray(arr) {
  return arr[getRandomNumber(0, arr.length - 1)]
}

function createWizardMock() {
  return {
    name: `${getRandomFromArray(WIZARD_FIRST_NAMES)} ${getRandomFromArray(WIZARD_SECOND_NAMES)}`,
    coatColor: getRandomFromArray(WIZARD_COAT_COLORS),
    eyesColor: getRandomFromArray(WIZARD_EYES_COLORS)
  }
}

function createWizards(amount) {
  const wizards = []
  for (let i = 0; i < amount; i++) {
    wizards.push(createWizardMock())
  }

  return wizards
}

function renderWizard(wizard) {
  const wizardElement = document
    .querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`).cloneNode(true)

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor

  return wizardElement
}

function createWizardsList(array) {
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]))
  }

  return fragment
}

function renderWizardsList(array) {
  userDialog
    .querySelector(`.setup-similar-list`)
    .appendChild(createWizardsList(array))
}

showMenu()
const wizards = createWizards(WIZARDS_QUANTITY)
renderWizardsList(wizards)
showWizards()
