function convert(s: string, numRows: number): string {
    if (numRows == 1)
        return s;

    let rows = Array(numRows).fill('');
    let moveDown = true
    let moveUp = false;
    let row = 0;
    for (let i = 0; i < s.length; i++) {
        if (moveDown && row <= numRows-1) {
            rows[row] = rows[row] + s[i]
            row++;
        } else if (moveUp && row >= 0) {
            rows[row] = rows[row] + s[i]
            row--;
        }

        if ((row == 0 && moveUp) || (row == numRows-1 && moveDown)) {
            moveUp = !moveUp;
            moveDown = !moveDown;
        }
    }
    return rows.join('');
};

// Test Cases:
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHIRENG"
console.log(convert("A", 1)); // "A"
console.log(convert("AB", 1)); // "AB"
console.log(convert("AB", 2)); // "AB"