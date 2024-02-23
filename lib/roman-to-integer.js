"use strict";
function romanToInt(s) {
    const romanToIntMap = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
        ['IV', 4],
        ['IX', 9],
        ['XL', 40],
        ['XC', 90],
        ['CD', 400],
        ['CM', 900],
    ]);
    const edgeCases = ['IV', 'IX', 'XL', 'XC', 'CD', 'CM'];
    const regex = /(IV|IX|XL|XC|CD|CM)/;
    const containsEdgeCase = regex.test(s);
    let sum = 0;
    if (!containsEdgeCase) {
        const romanLetters = s.split('');
        romanLetters.forEach((letter) => {
            sum += romanToIntMap.get(letter);
        });
        return sum;
    }
    let sAux = s;
    edgeCases.forEach((caso) => {
        const index = sAux.indexOf(caso);
        if (index !== -1) {
            sum += romanToIntMap.get(caso);
            const beforeString = sAux.slice(0, index);
            const afterString = sAux.slice(index + 2, sAux.length);
            sAux = beforeString.concat(afterString);
        }
    });
    const romanLetters = sAux.split('');
    romanLetters.forEach((letter) => {
        sum += romanToIntMap.get(letter);
    });
    return sum;
}
;
const result = romanToInt('MCMXCIV');
console.log(result);
//# sourceMappingURL=roman-to-integer.js.map