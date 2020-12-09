const elements = {

    loadDivs: function () {

        //dodawanie elementów statycznych gry

        const main = document.createElement("div")
        main.classList.add("main")
        document.body.appendChild(main)

        const photo = document.createElement("img")
        photo.classList.add("photo")
        photo.setAttribute("src", "img/1.jpg")
        main.appendChild(photo)

        const timer = document.createElement("div")
        timer.classList.add("timer")
        main.appendChild(timer)

        function createSpans(time) {
            let span = document.createElement("span")
            span.classList.add(time)
            timer.appendChild(span)
        }
        createSpans("hours")
        createSpans("colonOne")
        createSpans("minutes")
        createSpans("colonTwo")
        createSpans("secounds")

        const container = document.createElement("div")
        container.classList.add("container")
        main.appendChild(container)

        const game = document.createElement("div")
        game.classList.add("game")
        main.appendChild(game)
    },

    loadButtons: function () {
        //dodawanie przycisków

        function createButtons(number) {

            const btn = document.createElement("button")
            btn.classList.add("btn")
            btn.id = "" + number + ""
            btn.innerHTML = number + " x " + number
            let container = document.querySelector(".container")
            container.appendChild(btn)

        }

        for (let btns = 3; btns <= 6; btns++) {
            createButtons(btns)
        }
    },

    choiceSize: function () {
        //wybór rozmiaru planszy

        let btns = document.getElementsByClassName("btn")
        for (let i = 0; i < 4; i++) {
            btns[i].addEventListener("click", addAreas)
        }

        function addAreas() {
            //usuwanie poprzedniego obrazka

            let game = document.querySelector(".game")
            game.innerHTML = ""

            //dodanie nowego obrazka

            let size = this.getAttribute("id")

            let areaSize = 600 / size
            let x = 0
            let y = 0

            for (let rows = 0; rows < size; rows++) {

                for (let items = 0; items < size; items++) {

                    let area = document.createElement("div")
                    area.classList.add("area")
                    area.style.backgroundImage = 'url("img/1.jpg")'
                    game.appendChild(area)
                    area.style.top = y + "px"
                    area.style.left = x + "px"
                    area.style.width = areaSize + "px"
                    area.style.height = areaSize + "px"
                    area.style.backgroundPosition = (600 - x) + "px " + (600 - y) + "px"

                    x += areaSize
                }
                x = 0
                y += areaSize
            }

            let last = game.lastChild
            last.style.backgroundImage = 'none'
            last.id = "special"
            randomSlide()

        }

        function randomSlide() {
            //rozsuwanie

            let boxes = document.getElementsByClassName("area")
            let btnSize = Math.sqrt(document.getElementsByClassName("area").length)

            function randomSwap(element) {

                let clickX = element.offsetLeft
                let clickY = element.offsetTop

                let gameBlock = document.getElementById("special")
                let blockX = gameBlock.offsetLeft
                let blockY = gameBlock.offsetTop

                if ((clickX - blockX == 600 / btnSize && blockY - clickY == 0) || (clickX - blockX == -600 / btnSize && blockY - clickY == 0) || (clickX - blockX == 0 && blockY - clickY == 600 / btnSize) || (clickX - blockX == 0 && blockY - clickY == -600 / btnSize)) {

                    gameBlock.style.left = clickX + "px"
                    gameBlock.style.top = clickY + "px"

                    element.style.left = blockX + "px"
                    element.style.top = blockY + "px"
                }
            }

            let randomBox
            let interval = setInterval(function () {

                randomBox = Math.floor(Math.random() * ((btnSize * btnSize) - 1)) + 0;
                randomSwap(boxes[randomBox])

            }, 1)

            window.setTimeout(function () {
                clearInterval(interval)
                loadTimer()
            }, btnSize * 2000)

            elements.slide()
        }

        //załadowanie timera
        function loadTimer() {
            let img = [
                '<img src="timer/c0.gif">',
                '<img src="timer/c1.gif">',
                '<img src="timer/c2.gif">',
                '<img src="timer/c3.gif">',
                '<img src="timer/c4.gif">',
                '<img src="timer/c5.gif">',
                '<img src="timer/c6.gif">',
                '<img src="timer/c7.gif">',
                '<img src="timer/c8.gif">',
                '<img src="timer/c9.gif">',
                '<img src="timer/colon.gif">',
                '<img src="timer/dot.gif">'
            ]

            let hours = document.querySelector('.hours')
            let minutes = document.querySelector('.minutes')
            let secounds = document.querySelector('.secounds')
            let colonOne = document.querySelector(".colonOne")
            let colonTwo = document.querySelector(".colonTwo")
            colonOne.innerHTML = img[10]
            colonTwo.innerHTML = img[10]

            let elapsedTime = 0
            let s = 0
            let m = 0
            let h = 0
            let sArray = []
            let mArray = []
            let hArray = []

            let interval

            function stopTimer() {
                clearInterval(interval)
            }

            stopTimer() // dlaczego tutaj sie nie resetuje zegarek ??
            startTimer()

            function startTimer() {

                let startTime = Date.now()

                interval = setInterval(function () {

                    elapsedTime = Date.now() - startTime
                    s = (elapsedTime / 1000).toFixed(3)
                    if (h < 10) {
                        hString = "0" + h
                        hString = "0" + h
                    } else {
                        hString = h
                    }
                    if (m < 10) {
                        mString = "0" + m
                        mString = "0" + m
                    } else {
                        mString = m
                    }
                    if (s < 10) {
                        sString = "0" + s
                        sString = "0" + s
                    } else {
                        sString = s
                    }
                    if (s >= 60) {
                        startTime = Date.now()
                        m++
                    }
                    if (m >= 60) {
                        startTime = Date.now()
                        h++
                    }

                    hString = hString.toString()
                    hArray = hString.split('')
                    hours.innerHTML = img[parseFloat(hArray[0])] + img[parseFloat(hArray[1])]

                    mString = mString.toString()
                    mArray = mString.split('')
                    minutes.innerHTML = img[parseFloat(mArray[0])] + img[parseFloat(mArray[1])]

                    sString = sString.toString()
                    sArray = sString.split('')
                    secounds.innerHTML = img[parseFloat(sArray[0])] + img[parseFloat(sArray[1])] + img[11] + img[parseFloat(sArray[3])] + img[parseFloat(sArray[4])] + img[parseFloat(sArray[5])]
                }, 1);

            }
        }
    },

    slide: function () {
        //przesuwanie obrazka

        let box = document.getElementsByClassName("area")
        let amount = document.getElementsByClassName("area").length

        for (let i = 0; i < amount; i++) {
            box[i].addEventListener("click", swap)
        }

        function swap() {

            let btnSize = Math.sqrt(amount)
            let clickX = this.offsetLeft
            let clickY = this.offsetTop

            let gameBlock = document.getElementById("special")
            let blockX = gameBlock.offsetLeft
            let blockY = gameBlock.offsetTop

            if ((clickX - blockX == 600 / btnSize && blockY - clickY == 0) || (clickX - blockX == -600 / btnSize && blockY - clickY == 0) || (clickX - blockX == 0 && blockY - clickY == 600 / btnSize) || (clickX - blockX == 0 && blockY - clickY == -600 / btnSize)) {

                gameBlock.style.left = clickX + "px"
                gameBlock.style.top = clickY + "px"

                this.style.left = blockX + "px"
                this.style.top = blockY + "px"
            }

            elements.gameStateCheck()
        }
    },

    gameStateCheck: function () {

        const positions = []
        let box = document.getElementsByClassName("area")
        let amount = document.getElementsByClassName("area").length

        for (let i = 0; i < amount; i++) {

            let left = box[i].offsetLeft
            let top = box[i].offsetTop

            if (i == amount - 1) {

                positions.push({ id: "special", left: left, top: top })
            } else {
                positions.push({ id: i + 1, left: left, top: top })
            }
        }

        // console.log(positions)

        function checkWin() {

            let size = Math.sqrt(document.getElementsByClassName("area").length)

            let areaSize = 600 / size
            let x = 0
            let y = 0
            let id = 1
            let rightPositions = []

            for (let rows = 0; rows < size; rows++) {

                for (let items = 0; items < size; items++) {

                    let left = x
                    let top = y

                    rightPositions.push({ id: id, left: left, top: top })

                    x += areaSize
                    id += 1

                }
                x = 0
                y += areaSize
            }
            // console.log(rightPositions)


            let points = 0
            for (let i = 0; i < amount; i++) {
                if (rightPositions[i].left == positions[i].left && rightPositions[i].top == positions[i].top) {
                    points += 1
                } else {
                    points = 0
                }
            }

            if (points == amount) {

                let gameInfo = document.getElementById("game-info")
                gameInfo.style.display = "block"
                gameInfo.innerHTML = "Brawo! Cierpliwy to i kamień ugotuje"


                setTimeout(function () {
                    gameInfo.style.display = "none"
                }, 2000)

                let box = document.querySelectorAll(".area")
                for (let i = 0; i < amount; i++) {
                    box[i].remove()
                }

            }
        }

        checkWin()
    }

}

elements.loadDivs()
elements.loadButtons()
elements.choiceSize()
