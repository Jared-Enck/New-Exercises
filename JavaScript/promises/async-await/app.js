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