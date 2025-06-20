function reverseString(s: string[]): string[] {
    const l = Math.floor(s.length / 2);

    for (let x = 0; x < l; x++) {
        const temp = s[x];
        s[x] = s[s.length - x - 1];
        s[s.length - x - 1] = temp;
    }
    return s;
};

// Test Cases
console.log(reverseString(["h","e","l","l","o"]));
console.log(reverseString(["H","a","n","n","a","h"]));
