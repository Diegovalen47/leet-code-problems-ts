function longestCommonPrefix(strs: string[]): string {
  try {
    let result = ''

    let firstWord = strs[0]
  
    for (let i = 0; i < firstWord.length; i++) {
  
      const letter = firstWord.charAt(i)
  
      let sameLetterAtSameIndex = true
  
      for (let j = 1; j < strs.length; j++) {

        const word = strs[j];

        if (letter !== word.charAt(i)) {
          sameLetterAtSameIndex = false
          return result
        }
      }

      if (sameLetterAtSameIndex) {
        result += letter
      }

    }

    return result
  
  } catch (error) {
    return ''
  }
};


const value = longestCommonPrefix(["flower","flow","flight"])
console.log(value)