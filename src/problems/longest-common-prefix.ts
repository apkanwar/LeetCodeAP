function longestCommonPrefix(strs: string[]): string {
    let answer = "";
    for (let i = 0; i < strs[0].length; i++) {
        let l = true;
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] != strs[0][i]) {
                l = false;
            }
        }

        if (l) {
            answer += strs[0][i]
        } else {
            break;
        }
    }

    return answer;
};

// Use .slice method instead, would make it faster

// Test cases
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "dodge", "dogecoin"])); // Output: "do"