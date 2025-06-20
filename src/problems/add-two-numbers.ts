class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }

    printList(): string {
        let result = '[';
        let current: ListNode | null = this;
        while (current) {
            result += current.val + (current.next ? ', ' : ']');
            current = current.next;
        }
        return result;
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let carry = 0;
    let lSum = new ListNode(0);
    let head: ListNode | null = lSum;

    while (l1 || l2) {
        let value = ((l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry); // sum
        carry = parseInt(value / 10 + '') // carryover
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
        lSum.next = new ListNode(value % 10);
        lSum = lSum.next;
    }
    if (carry !== 0) {
        lSum.next = new ListNode(carry);
    }

    return head?.next
};

// Test Cases
const result = addTwoNumbers(
    new ListNode(2, new ListNode(4, new ListNode(3))), new ListNode(5, new ListNode(6, new ListNode(4))));
console.log(result ? result.printList() : null);