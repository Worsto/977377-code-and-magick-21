(function () {
  const setupDialogElement = document.querySelector('.setup')
  const dialogHandle = setupDialogElement.querySelector('.upload')

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault()

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    }

    let dragged = false

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault()

      dragged = true

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      }

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px'
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px'
    }

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault()

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault()
          dialogHandle.removeEventListener('click', onClickPreventDefault)
        }
        dialogHandle.addEventListener('click', onClickPreventDefault)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })
})()
