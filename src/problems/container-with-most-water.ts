function maxArea(height: number[]): number {
    let start = 0;
    let end = height.length - 1;
    let max = 0;
    let maxReached = false;

    while (!maxReached) {
        if (height[start] > height[end]) {
            let temp = height[end] * ((end+1) - (start+1))
            if (max < temp) {
                max = temp;
            }
            end--;
        } else if (height[start] <= height[end]) {
            let temp = height[start] * ((end+1) - (start+1))
            if (max < temp) {
                max = temp;
            }
            start++;
        }

        if (start == end) {
            maxReached = true;
        }
    }

    return max;
}

// Test Cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected output: 49
console.log(maxArea([1,1])); // Expected output: 1
console.log(maxArea([4,3,2,1,4])); // Expected output: 16
console.log(maxArea([1,2,1])); // Expected output: 2