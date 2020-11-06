window.createWizardMock = function () {
  return {
    name: `${window.util.getRandomFromArray(window.data.wizardsFirstNames)} ${window.util.getRandomFromArray(window.data.wizardsSecondNames)}`,
    coatColor: window.util.getRandomFromArray(window.data.wizardsCoatColors),
    eyesColor: window.util.getRandomFromArray(window.data.wizardsEyesColors)
  }
}
