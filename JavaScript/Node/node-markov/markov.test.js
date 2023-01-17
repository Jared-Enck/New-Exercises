const { MarkovMachine } = require('./markov')

describe('MarkovMachine class test', () => {
    let mm;

    beforeEach(() => {
        mm = new MarkovMachine('Not in a box. Not with a fox.')
    })

    test('Instantiate MarkovMachine', () => {
        expect(mm).toEqual(expect.any(Object))
        expect(mm.words.length).toEqual(8)
        expect(mm.words).toEqual(expect.any(Array))
    })

    test('Method makeChains', () => {
        expect(mm.chains).toEqual(expect.any(Object))
        expect(mm.chains.get('Not')).toEqual(['in', 'with'])
        expect(mm.chains.get('a')).toEqual(['box.', 'fox.'])
    })
})