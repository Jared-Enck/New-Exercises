const BASE_API_URL = 'http://numbersapi.com/'
const CARDS_API_URL = 'https://deckofcardsapi.com/api/deck/'

const promResList = $('#promResults')

get = (url) => {
    const request = new XMLHttpRequest();

    return new Promise((resolve,reject) => {
        request.onload = () => {
            if (request.readyState !== 4) return;

            if (request.status >= 200 && request.status < 300) {
                resolve({
                    data: JSON.parse(request.response),
                    status: request.status,
                    request: request
                })
            } else {
                reject({
                    msg: 'Server Error',
                    status: request.status,
                    request: request
                })
            }
        }
        request.onerror = handleError = () => {
            reject({
                msg: 'Network Error'
            })
        }
        request.open('GET', url)
        request.send()
    })
}

// get(`${BASE_API_URL}7?json`)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })

getMultipleNumFacts = (...nums) => {

    get(`${BASE_API_URL}${nums}?json`)
        .then(res => {
            factHTML(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

factHTML = (facts) => {
    const factsList = $('<ul>')
    promResList.append(factsList)
    for (let fact in facts) {
        const factLI = $('<li>')
        const factSpan = $('<span>')
        factsList.append(factLI)
        factLI.append(factSpan)
        factSpan.append(facts[fact])
    }
}

// getMultipleNumFacts(4,5,6)

fourFactsForOneNum = (num) => {
    const fourFactsPromises = []

    for (let i = 1; i < 5; i++) {
        fourFactsPromises.push(
            get(`${BASE_API_URL}${num}?json`)
        )
    }
    Promise.all(fourFactsPromises)
        .then(factsArr => {
            const newArr = []

            for (res of factsArr) {
                newArr.push(res.data.text)
            }
            factHTML(newArr)
        })
        .catch(err => {
            console.log(err)
        })
}

// fourFactsForOneNum(42)

//part 2

// get(CARDS_API_URL.concat('new/draw/?count=1'))
// .then(res => {
    //     const card = res.data.cards[0]
    //     console.log(`${card.value} of ${card.suit}`)
    // })
    
let deck_id = ''

// drawCardAnotherOne = (deck_id) => {
//     const cards = []

//     get(CARDS_API_URL.concat(`${deck_id}/draw/?count=1`))
//         .then(res => {
//             const card = res.data.cards[0]
//             cards.push(card)
//             return get(CARDS_API_URL.concat(`${deck_id}/draw/?count=1`))
//         })
//         .then(res => {
//             const card = res.data.cards[0]
//             cards.push(card)

//             for (let card in cards) {
//                 console.log(`${cards[card].value} of ${cards[card].suit}`)
//             }
//         })
// }

// drawCardAnotherOne(deck)

const drawCardBtn = $('#draw')
const shuffleBtn = $('#shuffle')

drawCardBtn.on('click', (e) => {
    drawCard(deck_id)
})
shuffleBtn.on('click', (e) => {
    shuffleDeck(deck_id)
    $('#promResults').empty()
})

get(CARDS_API_URL.concat('new/shuffle/'))
    .then(res => {
        deck_id = res.data.deck_id
    })

drawCard = (deck_id) => {
    get(CARDS_API_URL.concat(`${deck_id}/draw/?count=1`))
    .then(res => {
        if (res.data.remaining > 0) {
            return res.data.cards[0]
        } else {
            reject()
        }
    })
    .then(res => {
        cardHTML(res)
    })
    .catch(err => {
        console.log(err)
    })
}

shuffleDeck = (deck_id) => {
    get(CARDS_API_URL.concat(`${deck_id}/shuffle/`))
}
cardHTML = (card) => {
    const cardDiv = $('<div>')
    const cardImg = $('<img>').attr('src',`${card.image}`)
    cardDiv.append(cardImg)
    promResList.append(cardDiv) 
}



