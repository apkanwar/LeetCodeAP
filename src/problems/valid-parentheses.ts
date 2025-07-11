function isValid(s: string): boolean {
    const open = ['(', '{', "["];
    const bMap: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    let openPattern = [];

    for (let i = 0; i < s.length; i++) {
        if (open.includes(s[i])) {
            openPattern.push(s[i])
        } else {
            if (openPattern.pop() != bMap[s[i]])
                return false;
        }
    }

    return openPattern.length === 0;
};

// Test Cases
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false