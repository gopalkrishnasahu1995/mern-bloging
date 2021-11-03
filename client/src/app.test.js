
function sum(a,b){
    return a+b
}

it('sum of 2 and 3 is 5', () => {
    const result = sum(2, 'ashok');
    expect(result).toBe(6)
})