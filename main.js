const html = document.querySelector('html');
const focusButton = document.querySelector('.app__card-button--foco')
const shortButton = document.querySelector('.app__card-button--curto')
const longButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const musicCheckbox = document.querySelector('#alternar-musica')
const music = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const beep = new Audio('/sons/beep.mp3')
const startPause = document.querySelector('#start-pause')
const startPauseText = document.querySelector('#start-pause span')
const img = document.querySelector('.app__card-primary-butto-icon')
const timerScreen = document.querySelector('#timer')

music.loop = true

let timeInSeconds = 1500
let intervalId = null


focusButton.addEventListener('click', () => {
    handleChangeContext('foco')
    focusButton.classList.add('active')
})

shortButton.addEventListener('click', () => {
    handleChangeContext('descanso-curto')
    shortButton.classList.add('active')
})

longButton.addEventListener('click', () => {
    handleChangeContext('descanso-longo')
    longButton.classList.add('active')
})


musicCheckbox.addEventListener('change', () => {
    music.paused ? music.play() : music.pause()
})




function handleChangeContext(context){
    html.setAttribute('data-contexto', context)
    banner.setAttribute('src', `/imagens/${context}.png`)
    buttons.forEach((context) => {
        context.classList.remove('active')
    })

    switch (context) {
        case 'foco': 
            timeInSeconds = 1500
            title.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;

        case 'descanso-curto': 
            timeInSeconds = 300
            title.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            
            break;

        case 'descanso-longo': 
            timeInSeconds = 900
            title.innerHTML = `
                Hora de voltar á superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;

        default:
            break;

    }
    countdownTime()

}

const countdown = () => {
    if (timeInSeconds <= 0 ) {
        beep.play()
        alert('Hora de descansar!')
        clearCountdown()
        return 
    }
    timeInSeconds -= 1 
    countdownTime()
}

startPause.addEventListener('click', handleActionCountdown)


function handleActionCountdown(){
    play.play()
    if(intervalId){
        clearCountdown()
        return
    }
    intervalId = setInterval(countdown, 1000)
    startPauseText.textContent = "Pausar"
    img.src = '/imagens/pause.png'
    
    
}

function clearCountdown() {
    clearInterval(intervalId)
    intervalId = null
    startPauseText.textContent = "Começar"
    pause.play()
    img.src = '/imagens/play_arrow.png'
}

function countdownTime() {
    const time = new Date(timeInSeconds * 1000)
    const minutes = time.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    timerScreen.innerHTML = `${minutes}`
}

countdownTime()