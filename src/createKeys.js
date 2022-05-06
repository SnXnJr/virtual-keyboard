/* eslint-disable no-plusplus */
import keys from './keys.js'

export default class Keys {
  // eslint-disable-next-line class-methods-use-this
  static createKeys() {
    const keyWrapper = []

    Object.entries(keys).forEach((key) => {
      const keyBtn = document.createElement('div')
      const ruLang = document.createElement('span')
      const enLang = document.createElement('span')
      const activeLang = localStorage.getItem('lang')

      if (activeLang === 'ru') {
        enLang.classList.add('hidden')
      } else {
        ruLang.classList.add('hidden')
      }

      keyBtn.classList.add('key', key[0])
      enLang.classList.add('lang', 'en')
      ruLang.classList.add('lang', 'ru')
      Object.entries(key[1]).forEach((i) => {
        Object.entries(i[1]).forEach((prop) => {
          const span = document.createElement('span')
          // eslint-disable-next-line prefer-destructuring
          span.textContent = prop[1]
          if (prop[0] !== 'caseDown') {
            span.classList.add(`${prop[0]}`, 'hidden')
          } else {
            span.classList.add(`${prop[0]}`)
          }
          if (i[0] === 'ru') {
            ruLang.append(span)
          } else {
            enLang.append(span)
          }
        })
      })

      keyBtn.append(ruLang, enLang)
      keyWrapper.push(keyBtn)
    })
    return keyWrapper
  }

  static init(keysArr) {
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
}
