const {
    mean,
    median,
    mode,
} = require("./doMath");

describe('Mean', () => {
    test('mean of empty array', () => {
        expect(mean([])).toEqual(0)
    })
    test('mean of nums array', () => {
        expect(mean([1,2,3,4])).toEqual(2.5)
    })
})

describe('Median', () => {
    test('median of even nums array', () => {
        expect(median([4,5,6,7])).toEqual(5.5)
    })
    test('median of odd nums array', () => {
        expect(median([4,5,6])).toEqual(5)
    })
})

describe('Mode', () => {
    test('mode of nums array', () => {
        expect(mode([4,5,6,5,7,5,4])).toEqual(5)
    })
    test('mode of nums array', () => {
        expect(mode([7,7,7,6,5,4,4])).toEqual(7)
    })
})
