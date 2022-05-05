import keys from './keys.js'

export default class Keys {
  constructor(lang = 'ru', caps = false, shift = false) {
    this.lang = lang
    this.caps = caps
    this.shift = shift
  }

  // eslint-disable-next-line class-methods-use-this
  createKeys() {
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

      //   enLang.childNodes.forEach((el) => el.classList.add('hidden'))
      keyBtn.append(ruLang, enLang)
      keyWrapper.push(keyBtn)
    })
    return keyWrapper
  }
}
