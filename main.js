const html = document.querySelector('html');
const focusButton = document.querySelector('.app__card-button--foco')
const shortButton = document.querySelector('.app__card-button--curto')
const longButton = document.querySelector('.app__card-button--longo')

const banner = document.querySelector('.app__image')


focusButton.addEventListener('click', () => {
    handleChangeContext('foco')
})

shortButton.addEventListener('click', () => {
    handleChangeContext('descanso-curto')
})

longButton.addEventListener('click', () => {
    handleChangeContext('descanso-longo')
})


function handleChangeContext(context){
    html.setAttribute('data-contexto', context)
    banner.setAttribute('src', `/imagens/${context}.png`)
}