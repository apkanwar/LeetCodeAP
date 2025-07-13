class ListNode2 {
    val: number;
    next: ListNode2 | null;

    constructor(val: number, next: ListNode2 | null = null) {
        this.val = val;
        this.next = next;
    }

    printList(): string {
        let result = '[';
        let current: ListNode2 | null = this;
        while (current) {
            result += current.val + (current.next ? ', ' : ']');
            current = current.next;
        }
        return result;
    }
}

function mergeTwoLists(list1: ListNode2 | null, list2: ListNode2 | null): ListNode2 | null {
    let ans = new ListNode2(0);
    let head: ListNode2 | null = ans;

    if (!list1) {
        return list2;
    } else if (!list2) {
        return list1;
    }

    while (list1 || list2) {
        if (list1 && !list2) {
            ans.next = list1;
            break;
        }
        else if (list2 && !list1) {
            ans.next = list2;
            break;
        }
        else {
            if (list1!.val <= list2!.val) {
                ans.next = new ListNode2(list1!.val);
                list1 = list1!.next;
            } else {
                ans.next = new ListNode2(list2!.val);
                list2 = list2!.next;
            }
            ans = ans.next
        }
    }
    return head?.next
}

// Test Cases
let resultTwo = mergeTwoLists(
    new ListNode2(1, new ListNode2(2, new ListNode2(4))),
    new ListNode2(1, new ListNode2(3, new ListNode2(4)))
);
console.log("Result 1:", resultTwo ? resultTwo.printList() : null);

resultTwo = mergeTwoLists(
    new ListNode2(31, new ListNode2(100, new ListNode2(105))),
    new ListNode2(-7, new ListNode2(3, new ListNode2(101, new ListNode2(202))))
);
console.log("Result 2:", resultTwo ? resultTwo.printList() : null);