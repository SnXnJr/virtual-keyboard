/* eslint-disable no-plusplus */
import createKeys from './createKeys.js'

// eslint-disable-next-line new-cap
const keyClass = new createKeys()
const keysArr = keyClass.createKeys()
const pressed = new Set()

function keystroke(e) {
  e.preventDefault()
  const keyCode = e.code
  console.log(keyCode)
  if (e.type === 'keydown') {
    document.querySelector(`.${keyCode}`).classList.add('active')
    pressed.add(e.code)
    if (pressed.has('ShiftLeft') && pressed.has('AltLeft')) {
      document.querySelectorAll('.lang').forEach((i) => {
        i.classList.toggle('hidden')
      })
      // eslint-disable-next-line no-unused-expressions
      localStorage.getItem('lang') === 'ru'
        ? localStorage.setItem('lang', 'en')
        : localStorage.setItem('lang', 'ru')
    }
  } else if (e.type === 'keyup') {
    document.querySelector(`.${keyCode}`).classList.remove('active')
    pressed.clear()
  }
}

function init() {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'ru')
  }

  const app = document.createElement('div')
  const rowWrapper = document.createElement('div')
  const textArea = document.createElement('textarea')

  const row = []

  for (let i = 0; i < 5; i++) {
    row[i] = document.createElement('div')
    row[i].classList.add('row')
  }

  for (let i = 0; i < keysArr.length; i++) {
    if (i < 14) row[0].append(keysArr[i])
    if (i >= 14 && i < 29) row[1].append(keysArr[i])
    if (i >= 29 && i < 42) row[2].append(keysArr[i])
    if (i >= 42 && i < 55) row[3].append(keysArr[i])
    if (i >= 55) row[4].append(keysArr[i])
  }

  app.classList.add('app')
  rowWrapper.classList.add('wrapper')
  textArea.classList.add('textarea')

  app.append(textArea)
  app.append(rowWrapper)
  rowWrapper.append(...row)
  document.body.prepend(app)
}

window.addEventListener('DOMContentLoaded', init)
window.addEventListener('keydown', keystroke)
window.addEventListener('keyup', keystroke)
