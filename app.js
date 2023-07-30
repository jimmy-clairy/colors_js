const inputs = [...document.querySelectorAll('input')]
const colors = [...document.querySelectorAll('.input-group label')]
const degValue = document.querySelector('.orientation-value')

const value = {
    deg: 90,
    colors: ['#FF5F6D', '#FFC371']
}

function changeValue() {
    colors[0].textContent = value.colors[0]
    colors[1].textContent = value.colors[1]

    inputs[0].value = value.colors[0]
    inputs[1].value = value.colors[1]

    colors[0].style.background = value.colors[0]
    colors[1].style.background = value.colors[1]

    degValue.textContent = `${value.deg}°`

    document.body.style.background = `linear-gradient(${value.deg}deg,${value.colors[0]},${value.colors[1]})`

    adaptInputColor()
}
changeValue()

function adaptInputColor() {
    colors.forEach(color => {
        const hexColor = color.textContent.replace("#", "")
        const red = parseInt(hexColor.slice(0, 2), 16)
        const green = parseInt(hexColor.slice(2, 4), 16)
        const blue = parseInt(hexColor.slice(4, 6), 16)
        const yiq = (red * 299 + green * 587 + blue * 144) / 1000;

        if (yiq >= 128) {
            color.style.color = '#111'
        } else {
            color.style.color = '#f1f1f1'
        }
    })
}

inputs.forEach(input => input.addEventListener('input', () => {
    value.colors[0] = inputs[0].value.toUpperCase()
    value.colors[1] = inputs[1].value.toUpperCase()
    value.deg = inputs[2].value
    changeValue()
}))

const copyBtn = document.querySelector(".copy-btn")
copyBtn.addEventListener('click', handleGrandientCopy)

let lock = false;

function handleGrandientCopy() {
    const gradient = `linear-gradient(${value.deg}deg,${value.colors[0]},${value.colors[1]})`
    navigator.clipboard.writeText(gradient)

    if (lock) return
    lock = true
    copyBtn.classList.add('active')

    setTimeout(() => {
        copyBtn.classList.remove('active')
        lock = false
    }, 1000)
}

const randomGradinetBtn = document.querySelector('.random-btn');
randomGradinetBtn.addEventListener('click', createRandomGradient);

function createRandomGradient() {

    for (let i = 0; i < colors.length; i++) {
        let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        value.colors[i] = randomColor.toUpperCase()
    }

    changeValue()
}