/* 
  Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  You can return the answer in any order.
*/
function twoSum(nums: number[], target: number): number[] {
  let answer: number[] = [] 
  for (let i = 0; i < nums.length; i++) {
    for(let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        answer[0] = i
        answer[1] = j
      }
    }
  }
  return answer
};

/* 
  This is a brute force solution, it can be done
  in a better way using a hashTable, an takin in account
  the complement to the tarjet number
*/

console.log(twoSum([2,7,11,15], 9))
console.log(twoSum([3,2,4], 6))
console.log(twoSum([3,3], 6))