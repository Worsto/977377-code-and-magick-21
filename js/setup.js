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

const wizards = []

const userDialog = document.querySelector('.setup')
userDialog.classList.remove('hidden')

const similarListElement = userDialog.querySelector('.setup-similar-list')

const similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item')

const getRandomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

for (let i = 0; i < WIZARDS_QUANTITY; i++) {
  wizards.push({})
  wizards[i].name = `${getRandomFromArray(WIZARD_FIRST_NAMES)} ${getRandomFromArray(WIZARD_SECOND_NAMES)}`
  wizards[i].coatColor = getRandomFromArray(WIZARD_COAT_COLORS)
  wizards[i].eyesColor = getRandomFromArray(WIZARD_EYES_COLORS)
}

console.log(wizards)

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true)

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor

  return wizardElement
}

const fragment = document.createDocumentFragment()
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]))
}
similarListElement.appendChild(fragment)

userDialog.querySelector('.setup-similar').classList.remove('hidden')
