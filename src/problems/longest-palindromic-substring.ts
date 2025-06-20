function longestPalindrome(s: string): string {
    let start = 0;
    let end = 0;

    function expandAroundCenter(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }

        // Move back to last matching indices
        left++;
        right--;

        if (right - left > end - start) {
            start = left;
            end = right;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);       // odd-length
        expandAroundCenter(i, i + 1);   // even-length
    }
    return s.slice(start, end + 1);
};

// Tests Cases:
console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));
console.log(longestPalindrome("abb")); 
console.log(longestPalindrome("ccd")); 
console.log(longestPalindrome("adam")); 