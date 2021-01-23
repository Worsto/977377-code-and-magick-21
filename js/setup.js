(function () {
// Глобальные константы

  const MIN_NAME_LENGTH = 2
  const MAX_NAME_LENGTH = 25

  // Переменные с DOM элементами
  const setup = document.querySelector(`.setup`)
  const setupOpen = document.querySelector(`.setup-open`)
  const setupClose = setup.querySelector(`.setup-close`)
  const userNameInput = setup.querySelector(`.setup-user-name`)

  // Функции для работы с окном
  function onPopupEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault()
      hideMenu()
    }
  }

  function showMenu() {
    setup.classList.remove(`hidden`)

    document.addEventListener(`keydown`, onPopupEscPress)
  }

  function hideMenu() {
    setup.classList.add(`hidden`)

    setup.removeAttribute(`style`)

    document.removeEventListener(`keydown`, onPopupEscPress)
  }

  function showWizards() {
    setup.querySelector(`.setup-similar`).classList.remove(`hidden`)
  }

  // Обработчики событий работы с окном
  setupOpen.addEventListener(`click`, showMenu)

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` || evt.code === `Space`) {
      showMenu()
    }
  })

  setupClose.addEventListener(`click`, hideMenu)

  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` || evt.code === `Space`) {
      hideMenu()
    }
  })

  userNameInput.addEventListener(`input`, function () {
    const valueLength = userNameInput.value.length

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`)
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`)
    } else {
      userNameInput.setCustomValidity(``)
    }

    userNameInput.reportValidity()
  })

  // Функции для обработки секции похожих волшебников

  function createWizards(amount) {
    const wizards = []
    for (let i = 0; i < amount; i++) {
      wizards.push(window.createWizardMock())
    }

    return wizards
  }

  function renderWizard(wizard) {
    const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`)

    const wizardElement = similarWizardTemplate.cloneNode(true)
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
    const similarListElement = setup.querySelector(`.setup-similar-list`)
    similarListElement.appendChild(createWizardsList(array))
  }

  const currentWizard = setup.querySelector(`.setup-wizard-appearance`)
  const currentWisardCoat = currentWizard.querySelector(`.wizard-coat`)
  const currentWisardCoatInput = currentWizard.querySelector(`[name = "coat-color"]`).value
  const currentWisardEyes = currentWizard.querySelector(`.wizard-eyes`)
  const currentWisardEyesInput = currentWizard.querySelector(`[name = "eyes-color"]`).value
  const fireball = setup.querySelector(`.setup-fireball-wrap`)
  const fireballInput = setup.querySelector(`[name = "fireball-color"]`).value

  window.colorize(currentWisardCoat, currentWisardCoatInput, window.data.wizardsCoatColors)
  window.colorize(currentWisardEyes, currentWisardEyesInput, window.data.wizardsEyesColors)
  window.colorize(fireball, fireballInput, window.data.wizardsFireballsColors)

  window.setup = {
    createWizards,
    renderWizardsList,
    showWizards
  }
})()
