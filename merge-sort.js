// recursive merge sort function
// input: array
// output: sorted array
export default function mergeSort(arr) {
  // base case: if arr length is 1, return arr
  if (arr.length < 2) return arr;

  // get half of length of array
  const half = Math.floor(arr.length / 2);
  // recursive step: mergeSort left half of arr
  const leftHalf = mergeSort(arr.slice(0, half));
  // recursive step: mergeSort right half of arr
  const rightHalf = mergeSort(arr.slice(half));
  
  return merge(leftHalf, rightHalf);
}

function merge(arr1, arr2) {
  const mergedArr = [];
  // while length of arr1 and arr2 are both > 0
  while (arr1.length > 0 && arr2.length > 0) {
    // if first el of arr1 is smaller than first el of arr2,
      // push first el of arr1 to merged arr
      // else, push first el of arr2 to merged arr
    arr1[0] < arr2[0]
      ? mergedArr.push(...arr1.splice(0, 1))
      : mergedArr.push(...arr2.splice(0, 1));
  }

  // if elements still in arr1,
    // push rest of arr1 to merged array,
    // else, push rest of arr2 to merged array
  arr1.length > 0
    ? mergedArr.push(...arr1)
    : mergedArr.push(...arr2);

  return mergedArr;
}