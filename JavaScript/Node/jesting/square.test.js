const { square } = require('./square')

test('square should square number', () => {
    const res = square(3)
    expect(res).toEqual(9)
})