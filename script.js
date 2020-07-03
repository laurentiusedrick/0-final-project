
/* LOGIC FLOW
INTRODUCTION
1.when start clicked, enable tutorial class on div, 3 second countdown
2. when 3 second countdown done, disable tutorial class, enable game
# 3 sec countdown is on START! paragraph, changed to Slowly.. when end

GAME - START
0. run deck function, select random game card as selected, enable game class on div
1. change last paragraph content to game card with string
2. every 1.2 seconds pop deck array and put the value to img
3. IF selected equal to popped deck array:
    3.1 create limit time less than 1.2 sec and more than 0.3 sec, when end, computer wins
    3.2 IF game div clicked in limit time, player wins
4. whoever wins, game class end, CONTINUE? text on GO! with keypress event, and last p changed to player? playerStatistic : compStatistic 
5. statistics contains 'You/Computer wins'

GAME - END
1. when CONTINUE? clicked, 3 second countdown, enable game
*/

var startButton = document.getElementById('start')
var instructText = document.getElementById("instructions")
startButton.addEventListener('click',gameStart)
var ausmack = document.getElementById('au-smack')
var auflip = document.getElementById('au-flip')
var aushuffle = document.getElementById('au-shuffle')
var retry = false

function gameStart() {
    aushuffle.play()
    startButton.removeEventListener('click',gameStart)
    retry ? instructText.textContent = "Okay.. let's try it again" : instructText.textContent = "Let's do it!"
    let tutorsec = 3
    let tutorial = setInterval(() => {
        document.getElementById('div-cards').classList.add('toggle-tutorial')
        instructText.textContent = "Click in the area around the blue box!"
        if (!tutorsec) {
            document.getElementById('div-cards').classList.remove('toggle-tutorial')
            clearInterval(tutorial)
        }
        startButton.textContent = `${tutorsec}`
        tutorsec--
    }, 1000);
        var gamecard = document.getElementById("cards-gamecard")
        var deck = makeCards()
        var selected = chooseCards(deck)
        var name = displayCardName(selected)
        var win = false
    setTimeout(()=>{
        document.getElementById('div-cards').addEventListener('mousedown',gameEndPlayer)
        startButton.textContent = 'Slowly..'
        instructText.textContent = name
        window.interv = setInterval(card,2000)
    }, 4000)
    

    function card() {
        auflip.play()
        let ongoing = deck.pop()
        gamecard.src = `./img/Cards/${ongoing}.png`
        if (selected === ongoing) {
            clearInterval(window.interv)
            win = true
            window.comp = setTimeout(gameEndComp,1999)
        }
    }
    function gameEndPlayer() {
        ausmack.play()
        document.getElementById('div-cards').removeEventListener('mousedown',gameEndPlayer)
        clearInterval(window.interv)
        clearTimeout(window.comp)
        startButton.textContent = 'RETRY?'
        startButton.addEventListener('click',gameStart)
        win ? instructText.textContent = `GREAT JOB! You hit the right card! (${name})` :
        instructText.textContent = `BRUH!? You hit the wrong card! (${name})`
        retry = true
    }
    function gameEndComp() {
        ausmack.play()
        document.getElementById('div-cards').removeEventListener('mousedown',gameEndPlayer)
        startButton.textContent = 'RETRY?'
        startButton.addEventListener('click',gameStart)
        instructText.textContent = `TOO BAD! the computer got ahead of you! (${name})`
        retry = true
    }
}

function makeCards() {
    let deck = []
    let type = ["H","D","C","S"]
    while (deck.length<52) {
        let tempnumber = String(Math.ceil(Math.random()*13))
        let temptype = type[Math.floor(Math.random()*4)]
        let card = `${temptype+tempnumber}`
        let flag = true
        for (let i = 0; i < deck.length; i++) {
            if (deck[i] === card) {
                flag = false
            }
        }
        if (flag) {
            deck.push(card)
        }
    }
    return deck
}

function chooseCards(arr) {
    return arr[Math.floor(Math.random()*52)]
}

function displayCardName(str) {
    let type = str[0]
    let num = ''
    let output = ''
    let outtype = ''
    for (let i = 1; i < str.length; i++) {
        num+=str[i]  
    }
    switch (type) {
        case 'H':
            outtype = 'Hearts'
            break;
        case 'D':
            outtype = 'Diamonds'
            break;
        case 'C':
            outtype = 'Clovers'
            break;
        case 'S':
            outtype = 'Spades'
            break;
    }
    switch (num) {
        case '1':
            output = 'Ace of'
            break;
        case '2':
            output = 'Two'
            break;
        case '3':
            output = 'Three'
            break;
        case '4':
            output = 'Four'
            break;
        case '5':
            output = 'Five'
            break;
        case '6':
            output = 'Six'
            break;
        case '7':
            output = 'Seven'
            break;
        case '8':
            output = 'Eight'
            break;
        case '9':
            output = 'Nine'
            break;
        case '10':
            output = 'Ten'
            break;
        case '11':
            output = 'Jack of'
            break;
        case '12':
            output = 'Queen of'
            break;
        case '13':
            output = 'King of'
            break;
    }
    return `${output} ${outtype}`
}
