function reverse(x: number): number {
    let n = x.toString();
    let signed = true;
    if (n[0] == '-') {
        signed = false;
        n = n.substring(1, n.length);
    }

    let ans = n.split('').reverse().join('');

    if (signed) {
        if (parseInt(ans) > (2 ** 31 - 1)) {
            return 0
        } else {
            return parseInt(ans)
        }
    } else {
        if (parseInt('-' + ans) < -(2 ** 31)) {
            return 0
        } else {
            return parseInt('-' + ans)
        }
    }
};

// Test Cases:
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21
console.log(reverse(0)); // 0
console.log(reverse(1534236469)); // 0 (overflow case)