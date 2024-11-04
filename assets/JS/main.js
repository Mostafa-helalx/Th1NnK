//background option
let backgroundOption = true
// var that control the Background interval
let backgroundInterval;

// check if there is local storage random background item
let backgroundLS = localStorage.getItem('background_option')
// check if the background option is empty or not 
if (backgroundLS !== null) {
    if (backgroundLS === 'true') {

        backgroundOption = true

    } else {

        backgroundOption = false

    }

    // remove active class from all spans
    document.querySelectorAll(".random-background span").forEach(i => {
        i.classList.remove('active')
    })
    if (backgroundLS === "true") {
        document.querySelector(".random-background .yes").classList.add('active')
    } else {
        document.querySelector(".random-background .no").classList.add('active')
    }
}

document.querySelector(".toggle-setting .icon").addEventListener("click", function () {
    this.classList.toggle('fa-spin')

    document.querySelector('.setting-box').classList.toggle('open')
})

// Change color *************************************************
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach(li => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        // set color to local storage
        localStorage.setItem('color', e.target.dataset.color)
        // toggle active class
        colorLi.forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
    })
})

// get the color from local storage *************************************************
const mainColor = localStorage.getItem('color')
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor)

    // toggle active class
    colorLi.forEach(el => {
        if (el.dataset.color === mainColor) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}
// Random background option *************************************************
const randomBackgroundEl = document.querySelectorAll(".random-background span");
// loop on all spans 
randomBackgroundEl.forEach(span => {
    // add click event on every spans
    span.addEventListener("click", (e) => {
        // remove active class from all spans
        randomBackgroundEl.forEach(span => span.classList.remove('active'))
        // add active class on clicked span
        e.target.classList.add('active')

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true
            changeBackground()
            localStorage.setItem('background_option', true)
        } else {
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem('background_option', false)
        }
    })
})
// // select landing page *************************************************
let landingPage = document.querySelector(".landing");


// // Array of imgs 
let imgsArr = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

let i = 0

function changeBackground() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // // Change bg img url 
            landingPage.style.backgroundImage = `url(./assets/imgs/${imgsArr[i]})`
            i++

            if (i >= imgsArr.length) {
                i = 0
            }

            //another way to change the url
            // let radnomNum = Math.floor(Math.random() * imgsArr.length)
            // landingPage.style.backgroundImage = 'url(/assets/imgs/' + imgsArr[radnomNum] + ')'
        }, 5000);
    }
}
changeBackground()