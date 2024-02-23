"use strict";
function letterCombinations(digits) {
    const allLettersString = 'abc def ghi jkl mno pqrs tuv wxyz'.split(' ');
    let phoneNumberLettersMap = new Map();
    let number = 2;
    for (const stringGroup of allLettersString) {
        phoneNumberLettersMap.set(number, stringGroup.split(''));
        number++;
    }
    const inputDigits = digits.split('').map((digit) => parseInt(digit));
    let resultArray;
    let string = '';
    for (let i = inputDigits.length - 1; i >= 0; i--) {
        const digit = inputDigits[i];
        const letters = phoneNumberLettersMap.get(digit);
        for (const letter of letters) {
            string.concat(letter);
        }
    }
}
;
letterCombinations('124');
//# sourceMappingURL=letter-combinations-phone-number.js.map