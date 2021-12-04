import getStdin from 'get-stdin';

const input = await getStdin();

const arr = input.split('\n').map((s) => s.trim()).filter(Boolean).map((s) => Number.parseInt(s))

let result = 0;
for(let i = 1; i < arr.length; i++) {
    if(arr[i] > arr[i-1]) result++
}

console.log(result)

function getWindow(i) {
    return arr[i] + arr[i + 1] + arr[i + 2]
}

let result2 = 0
for(let i = 1; i < arr.length - 2; i++) {
    const window = getWindow(i)
    const window_before = getWindow(i-1)
    if(window > window_before) result2++
}

console.log(result2)