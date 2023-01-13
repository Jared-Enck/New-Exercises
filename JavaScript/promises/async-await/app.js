const NUMBERS_API = 'http://numbersapi.com/'
const resContainer = $('#res-data')

async function getFavNumFact(num) {
    let { data } = await axios.get(`${NUMBERS_API}${num}?json`)
    console.log(data)
}

async function getMultipleNumFacts(...nums) {
    let { data: facts } = await axios.get(`${NUMBERS_API}${nums}?json`)
    factsHTML(facts)
}

factsHTML = (facts) => {
    const listFacts = $('<ul>')
    resContainer.append(listFacts)

    for (let fact in facts) {
        let factLI = $('<li>').html(facts[fact])
        listFacts.append(factLI)
    }
}

async function fourFactsForOne(num) {
    const factsArr = []

    let facts = await Promise.all([
        axios.get(`${NUMBERS_API}${num}?json`),
        axios.get(`${NUMBERS_API}${num}?json`),
        axios.get(`${NUMBERS_API}${num}?json`),
        axios.get(`${NUMBERS_API}${num}?json`)
    ])

    for (let fact in facts) {
        factsArr.push(facts[fact].data.text)
    }
    factsHTML(factsArr)
}

const CARDS_API = 'https://deckofcardsapi.com/api/deck/'

async function newDeckAndDraw() {
    let {data} = await axios.get(`${CARDS_API}/new/draw/?count=1`)
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
}

$('#draw').on('click', () => {
    if (deck.deckId) {
        if (deck.deckCount > 0) {
            deck.drawCard()
        } else {
            alert('No cards left!')
        }
    }
})
$('#shuffle').on('click', () => {
    if (deck.deckId) {
        deck.shuffle()
        resContainer.empty()
    }
})

cardHTML = (cardURL) => {
    const cardImg = $('<img>').attr('src',`${cardURL}`)
    resContainer.append(cardImg)
}

const deck = {
    async init() {
        let {data} = await axios.get(`${CARDS_API}/new/shuffle`)
        this.deckId = data.deck_id
        this.deckCount = data.remaining
    },
    async shuffle() {
        let {data} = await axios.get(`${CARDS_API}/${this.deckId}/shuffle/`)
        this.deckCount = data.remaining
    },
    async drawAndAnotherOne() {
        let {data: c1} = await axios.get(`${CARDS_API}/${this.deckId}/draw/?count=1`)
        let {data: c2} = await axios.get(`${CARDS_API}/${this.deckId}/draw/?count=1`)
        console.log(`${c1.cards[0].value} of ${c1.cards[0].suit}`)
        console.log(`${c2.cards[0].value} of ${c2.cards[0].suit}`)
    },
    async drawCard() {
        let {data} = await axios.get(`${CARDS_API}/${this.deckId}/draw/?count=1`)
        cardHTML(data.cards[0].image)
        this.deckCount = data.remaining
    }
}

$(deck.init())