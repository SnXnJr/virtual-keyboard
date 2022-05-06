/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import createKeys from './createKeys.js'

// eslint-disable-next-line new-cap
const keysArr = createKeys.createKeys()
const pressed = new Set()
const exclude = [
  'CapsLock',
  'ShiftLeft',
  'ShiftRight',
  'ControlLeft',
  'ControlRight',
  'MetaLeft',
  'AltLeft',
  'AltRight',
  'Tab',
  'Delete',
  'Enter',
]

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'ru')
}

const state = {
  text: '',
}

function writeText(symbol) {
  const textArea = document.querySelector('textarea')
  if (symbol === 'Backspace') {
    state.text = state.text.substring(0, state.text.length - 1)
  } else {
    state.text += symbol
  }

  textArea.value = state.text
}

function keystroke(e) {
  e.preventDefault()
  const keyCode = e.code
  let symbol = e.key
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
    if (keyCode === 'CapsLock') {
      document.querySelector(`.${keyCode}`).classList.toggle('active')
      document.querySelectorAll('.lang').forEach((items) => {
        items.querySelectorAll('span').forEach((i) => {
          if (i.classList.contains('caps')) i.classList.toggle('hidden')
          if (i.classList.contains('caseDown')) i.classList.toggle('hidden')
        })
      })
    }
    if (!exclude.includes(`${keyCode}`)) {
      keyCode === 'ArrowUp' ? (symbol = '▲') : ''
      keyCode === 'ArrowRight' ? (symbol = '►') : ''
      keyCode === 'ArrowDown' ? (symbol = '▼') : ''
      keyCode === 'ArrowLeft' ? (symbol = '◄') : ''
      writeText(symbol)
    }
  } else if (e.type === 'keyup') {
    document.querySelector(`.${keyCode}`).classList.remove('active')
    pressed.clear()
  }
}

window.addEventListener('DOMContentLoaded', createKeys.init(keysArr))
window.addEventListener('keydown', keystroke)
window.addEventListener('keyup', keystroke)
