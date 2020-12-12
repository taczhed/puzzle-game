let interval
let realTime
let photos
let slide
let activeLevel
let topThree = []
let topFour = []
let topFive = []
let topSix = []
const elements = {

    loadDivs: function () {

        //dodawanie elementów statycznych gry

        const main = document.createElement("div")
        main.classList.add("main")
        document.body.appendChild(main)

        const photoCon = document.createElement("div")
        photoCon.classList.add("photo-container")
        main.appendChild(photoCon)

        const timer = document.createElement("div")
        timer.classList.add("timer")
        main.appendChild(timer)

        function createSpans(time) {
            let span = document.createElement("span")
            span.classList.add(time)
            timer.appendChild(span)
            if (time == "colonOne" || time == "colonTwo") {
                span.innerHTML = '<img src="timer/colon.gif">'
            } else {
                if (time == "secounds") {
                    span.innerHTML = '<img src="timer/c0.gif"><img src="timer/c0.gif"><img src="timer/dot.gif"><img src="timer/c0.gif"><img src="timer/c0.gif"><img src="timer/c0.gif">'
                } else {
                    span.innerHTML = '<img src="timer/c0.gif"><img src="timer/c0.gif">'
                }
            }
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

    picturesSlider: function () {

        let photoCon = document.querySelector(".photo-container")

        let photoBox = document.createElement("div")
        photoBox.classList.add("photo-box")
        photoCon.appendChild(photoBox)

        let photoSlider = document.createElement("div")
        photoSlider.classList.add("photo-slider")
        photoBox.appendChild(photoSlider)

        let arrowLeft = document.createElement("div")
        arrowLeft.classList.add("arrow-left")
        arrowLeft.classList.add("arrow")
        photoCon.appendChild(arrowLeft)

        let arrowRight = document.createElement("div")
        arrowRight.classList.add("arrow-right")
        arrowRight.classList.add("arrow")
        photoCon.appendChild(arrowRight)

        photos = [
            "img/photo1.jpg",
            "img/photo2.jpg",
            "img/photo3.jpg",
            "img/photo1.jpg",
            "img/photo2.jpg",
            "img/photo3.jpg"
        ]

        function addEL() {
            arrowLeft.addEventListener("click", pushLeft)
            arrowRight.addEventListener("click", pushRight)
        }
        addEL()

        let pictures

        function pushLeft() {
            removeEL()
            console.log(photos)
            let last = photos.pop()
            photos.unshift(last)
            console.log(photos)
            pictures = document.getElementsByClassName("picture")

            slide = setInterval(function () {

                for (let x = 0; x < pictures.length; x++) {
                    let offset = pictures[x].offsetLeft
                    pictures[x].style.left = 2 + offset + "px"
                }

                if (pictures[0].offsetLeft == 120) {
                    clearInterval(slide)
                    slideSlider()
                    addEL()
                }
            }, 1)
        }

        function pushRight() {
            removeEL()
            console.log(photos)
            let first = photos.shift()
            photos.push(first)
            console.log(photos)
            pictures = document.getElementsByClassName("picture")

            slide = setInterval(function () {

                for (let x = 0; x < pictures.length; x++) {
                    let offset = pictures[x].offsetLeft
                    pictures[x].style.left = (offset - 2) + "px"
                }

                if (pictures[5].offsetLeft == 480) {
                    clearInterval(slide)
                    slideSlider()
                    addEL()
                }
            }, 1)
        }

        function removeEL() {
            arrowLeft.removeEventListener("click", pushLeft)
            arrowRight.removeEventListener("click", pushRight)
        }

        function slideSlider() {

            function stopTimer() {
                clearInterval(interval)
            }
            stopTimer()

            let photoSlider = document.querySelector(".photo-slider")
            photoSlider.innerHTML = ""

            let px = 0

            for (let x = 0; x < photos.length; x++) {
                let img = document.createElement("img")
                img.setAttribute("src", photos[x])
                img.classList.add("picture")
                img.style.left = px + "px"
                photoSlider.appendChild(img)

                px += 120
            }

        }
        slideSlider()
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

        function addEventButtons() {
            let btns = document.getElementsByClassName("btn")
            for (let i = 0; i < 4; i++) {
                btns[i].addEventListener("click", addAreas)
                btns[i].addEventListener("click", stopTimer)
            }
        }
        addEventButtons()

        function removeEventButtons() {
            let btns = document.getElementsByClassName("btn")
            for (let i = 0; i < 4; i++) {
                btns[i].removeEventListener("click", addAreas)
                btns[i].removeEventListener("click", stopTimer)
            }
        }

        function addAreas() {

            //zatrzymanie timera
            function stopTimer() {
                clearInterval(interval)
            }
            stopTimer()

            //usuwanie poprzedniego obrazka

            let game = document.querySelector(".game")
            game.innerHTML = ""

            //dodanie nowego obrazka

            let size = this.getAttribute("id")
            activeLevel = size

            let areaSize = 600 / size
            let x = 0
            let y = 0

            for (let rows = 0; rows < size; rows++) {

                for (let items = 0; items < size; items++) {

                    let area = document.createElement("div")
                    area.classList.add("area")
                    area.style.backgroundImage = 'url(' + photos[2] + ')'
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
            //wstrzymanie możliwości naciśnięcia przycisku

            removeEventButtons()

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
                startTimer()
                addEventButtons()
            }, btnSize * 10) //ilość czasu

            elements.slide()
        }

        //załadowanie timera

        function stopTimer() {
            clearInterval(interval)
        }

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
        let elapsedTime = 0
        let s = 0
        let m = 0
        let h = 0
        let sArray = []
        let mArray = []
        let hArray = []
        let startTime

        function startTimer() {

            function stopTimer() {
                clearInterval(interval)
            }

            stopTimer()

            startTime = Date.now()

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


                realTime = hString + " : " + mString + " : " + sString
            }, 1);
        }

        //sprawdzanie pozycji bloków

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

            let points = 0
            for (let i = 0; i < amount; i++) {
                if (rightPositions[i].left == positions[i].left && rightPositions[i].top == positions[i].top) {
                    points += 1
                } else {
                    points = 0
                }
            }

            if (points == amount && amount != 0) {

                stopTimer()

                let gameInfo = document.getElementById("game-info")
                gameInfo.style.display = "flex"
                gameInfo.innerHTML = ""

                let timeDiv = document.createElement("div")
                timeDiv.classList.add("time")
                gameInfo.appendChild(timeDiv)
                timeDiv.innerHTML = "Brawo! Gra zajęła ci dokładnie: " + realTime

                let input = document.createElement("input")
                input.classList.add("nick")
                input.setAttribute("type", "text")
                input.setAttribute("placeholder", "Wpisz swój nick")
                gameInfo.appendChild(input)

                let btn = document.createElement("button")
                btn.classList.add("submit")
                btn.innerHTML = "Zapisz!"
                gameInfo.appendChild(btn)

                let next = document.createElement("button")
                next.classList.add("next")
                next.innerHTML = "Pomiń"
                gameInfo.appendChild(next)

                let box = document.querySelectorAll(".area")
                for (let i = 0; i < amount; i++) {
                    box[i].remove()
                }

                elements.cookies()
                elements.printTable()
            }
        }
        checkWin()
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
            elements.choiceSize()
        }
    },

    cookies: function () {

        let submitBtn = document.querySelector(".submit")
        let gameInfo = document.getElementById("game-info")
        let nick
        let cookieTable = []

        function addEventOnSubmit() {
            submitBtn.addEventListener("click", takeNick)
            submitBtn.addEventListener("click", addCookie)
        }
        addEventOnSubmit()

        function takeNick() {
            nick = document.querySelector(".nick").value
            console.log(nick)
            gameInfo.style.display = "none"
        }

        function next() {
            let next = document.querySelector(".next")
            next.addEventListener("click", function () {
                gameInfo.style.display = "none"
            })
        }
        next()

        function addCookie() {
            user = document.cookie = nick + "|" + activeLevel + "|=" + realTime
        }

        function convertCookie() {
            topThree = []
            topFour = []
            topFive = []
            topSix = []
            let cookieUser
            let cookieString = document.cookie
            cookieTable = cookieString.split(";")

            for (let x = 0; x < cookieTable.length; x++) {
                cookieUser = cookieTable[x].split("|")
                cookieUser[2] = cookieUser[2].substring(1)
                let timeString = cookieUser[2]
                cookieUser[2] = cookieUser[2].replace(":", "")
                cookieUser[2] = cookieUser[2].replace(":", "")
                cookieUser[2] = cookieUser[2].replace("  ", "")
                cookieUser[2] = cookieUser[2].replace("  ", "")
                cookieUser[2] = parseFloat(cookieUser[2])

                if (cookieUser[0] == " " || cookieUser[0] == "") {
                    cookieUser[0] = "anonim"
                }

                if (cookieUser[1] == "3") {
                    topThree.push({ level: cookieUser[1], nick: cookieUser[0], time: cookieUser[2], timeString: timeString })
                } else if (cookieUser[1] == "4") {
                    topFour.push({ level: cookieUser[1], nick: cookieUser[0], time: cookieUser[2], timeString: timeString })
                } else if (cookieUser[1] == "5") {
                    topFive.push({ level: cookieUser[1], nick: cookieUser[0], time: cookieUser[2], timeString: timeString })
                } else if (cookieUser[1] == "6") {
                    topSix.push({ level: cookieUser[1], nick: cookieUser[0], time: cookieUser[2], timeString: timeString })
                }
            }

            function sort(obj) {
                obj.sort(function (a, b,) {
                    return parseFloat(a.time) - parseFloat(b.time);
                });
            }
            sort(topThree)
            sort(topFour)
            sort(topFive)
            sort(topSix)

            function deleteLast(array) {
                if (array.length >= 11) {
                    let name = array[10].nick + "|" + array[10].level + "|"
                    document.cookie = name + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    array.length = 10
                }
            }

            deleteLast(topThree)
            deleteLast(topFour)
            deleteLast(topFive)
            deleteLast(topSix)
        }
        convertCookie()
    },

    printTable: function () {

        function printTop() {
            let gameInfo = document.getElementById("game-info")
            let stats = document.createElement("div")
            stats.classList.add("stats")
            gameInfo.appendChild(stats)

            function createList(array, type) {
                let list = document.createElement("ol")
                stats.appendChild(list)

                let topic = document.createElement("p")
                topic.innerHTML = "TOP 10 trybu " + type
                list.appendChild(topic)
                for (let x = 0; x < array.length; x++) {
                    let li = document.createElement("li")
                    list.appendChild(li)
                    li.appendChild(document.createTextNode(array[x].nick + " - " + array[x].timeString))
                }
            }

            createList(topThree, "3 x 3")
            createList(topFour, "4 x 4")
            createList(topFive, "5 x 5")
            createList(topSix, "6 x 6")
        }
        printTop()
    }
}
elements.loadDivs()
elements.picturesSlider()
elements.loadButtons()
elements.choiceSize()