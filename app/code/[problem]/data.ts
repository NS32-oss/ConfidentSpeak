/* eslint-disable */
const rTabs = (str: string) => str.trim().replace(/^ {4}/gm, "");
interface Problem {
    title: string;
    difficulty: string;
    description: string;
    examples: {
        input: any;
        output: any;
    }[];
    constraints?: string[];
    starterCode: {
        javascript: string;
        python: string;
        java: string;
        cpp: string;
    };
}
const twoSum: Problem = {
    title: "Two Sum",
    difficulty: "Easy",
    description:
        "Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
        {
            input: { nums: [2, 7, 11, 15], target: 9 },
            output: [0, 1],
        },
        {
            input: { nums: [3, 2, 4], target: 6 },
            output: [1, 2],
        },
        {
            input: { nums: [3, 3], target: 6 },
            output: [0, 1],
        },
    ],
    constraints: [
        "Each input would have exactly one solution.",
        "You may not use the same element twice.",
    ],
    starterCode: {
        javascript: rTabs(`
        class Solution {
        twoSum(nums, target) {
            // Start your code from here
            // Write your solution to the Two Sum problem
        }
    }
    
    // Driver code
    if (require.main === module) {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rl.question('Enter the number of test cases: ', (t) => {
            for (let i = 0; i < t; i++) {
                rl.question('Enter the array (space-separated numbers): ', (input) => {
                    const nums = input.split(' ').map(Number);
                    rl.question('Enter the target sum: ', (target) => {
                        const ob = new Solution();
                        const result = ob.twoSum(nums, target);
                        console.log(result.join(' '));
                        rl.close();
                    });
                });
            }
        });
    }
     
      `),
        python: rTabs(`
        class Solution:
        def twoSum(self, nums, target):
            # Start your code from here
            # Write your solution to the Two Sum problem
            
        # Driver code
        if __name__ == '__main__':
            t = int(input())
            for _ in range(t):
                nums = list(map(int, input().split()))
                target = int(input())
                ob = Solution()
                result = ob.twoSum(nums, target)
                print(result)
    
      `),
        cpp: rTabs(`
      #include <bits/stdc++.h>
    using namespace std;
    
    class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {
            // Start your code from here
            // Write your solution to the Two Sum problem
        }
    };
    
    // Driver code
    int main() {
        int t;
        cin >> t;
        while (t--) {
            int n;
            cin >> n;
            vector<int> nums(n);
            for (int i = 0; i < n; i++) {
                cin >> nums[i];
            }
            int target;
            cin >> target;
            Solution ob;
            vector<int> result = ob.twoSum(nums, target);
            for (int i = 0; i < result.size(); i++) {
                cout << result[i] << " ";
            }
            cout << endl;
        }
        return 0;
    }
      `),
        java: rTabs(`
      import java.util.Scanner;
    
    class Solution {
        public int[] twoSum(int[] nums, int target) {
            // Start your code from here
            // Write your solution to the Two Sum problem
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int t = sc.nextInt();
            while (t-- > 0) {
                int n = sc.nextInt();
                int[] nums = new int[n];
                for (int i = 0; i < n; i++) {
                    nums[i] = sc.nextInt();
                }
                int target = sc.nextInt();
                Solution ob = new Solution();
                int[] result = ob.twoSum(nums, target);
                for (int i = 0; i < result.length; i++) {
                    System.out.print(result[i] + " ");
                }
                System.out.println();
            }
        }
    }`),
    }
};

const mergeTwoSortedLists: Problem = {
    title: "Merge Two Sorted Lists",
    difficulty: "Medium",
    description:
        "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    constraints: [
        "[0, 50]",
        "[-100, 100]",
        "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    examples: [
        {
            input: "list1 = [1,2,4], list2 = [1,3,4]",
            output: "[1,1,2,3,4,4]",
        },
        {
            input: "list1 = [], list2 = []",
            output: "[]",
        },
        {
            input: "list1 = [], list2 = [0]",
            output: "[0]",
        },
    ],
    starterCode: {
        javascript: rTabs(`
        class ListNode {
            constructor(val = 0, next = null) {
                this.val = val;
                this.next = next;
            }
        }
    
        class Solution {
            mergeTwoLists(l1, l2) {
                // Start your code from here
                // Write your solution to the Merge Two Sorted Lists problem
            }
        }
    
        // Driver code
        if (require.main === module) {
            // Create test cases and call the mergeTwoLists function
            // Print the result
        }
      `),
        python: rTabs(`
        # Definition for singly-linked list.
        class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val
                self.next = next
    
        class Solution:
            def mergeTwoLists(self, l1, l2):
                # Start your code from here
                # Write your solution to the Merge Two Sorted Lists problem
    
        # Driver code
        if __name__ == "__main__":
            # Create test cases and call the mergeTwoLists function
            # Print the result
      `),
        cpp: rTabs(`
        #include <bits/stdc++.h>
        using namespace std;
    
        // Definition for singly-linked list.
        struct ListNode {
            int val;
            ListNode* next;
            ListNode(int x) : val(x), next(NULL) {}
        };
    
        class Solution {
        public:
            ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
                // Start your code from here
                // Write your solution to the Merge Two Sorted Lists problem
            }
        };
    
        // Driver code
        int main() {
            // Create test cases and call the mergeTwoLists function
            // Print the result
            return 0;
        }
      `),
        java: rTabs(`
        class ListNode {
            int val;
            ListNode next;
            ListNode(int x) { val = x; }
        }
    
        class Solution {
            public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
                // Start your code from here
                // Write your solution to the Merge Two Sorted Lists problem
            }
    
            public static void main(String[] args) {
                // Create test cases and call the mergeTwoLists function
                // Print the result
            }
        }
    `),
    }
};

const reverseALinkedList: Problem = {
    title: "Reverse a Linked List",
    difficulty: "Easy",
    description:
        "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    constraints: [
        "[0, 50]",
        "[-100, 100]",
        "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    examples: [
        {
            input: "list1 = [1,2,4], list2 = [1,3,4]",
            output: "[1,1,2,3,4,4]",
        },
        {
            input: "list1 = [], list2 = []",
            output: "[]",
        },
        {
            input: "list1 = [], list2 = [0]",
            output: "[0]",
        },
    ],
    starterCode: {
        javascript: rTabs(`
        class ListNode {
            constructor(val = 0, next = null) {
                this.val = val;
                this.next = next;
            }
        }
        
        class Solution {
            reverseLinkedList(head) {
                let prev = null;
                let current = head;
        
                while (current !== null) {
                    const nextNode = current.next;
                    current.next = prev;
                    prev = current;
                    current = nextNode;
                }
        
                return prev;
            }
        }
        
        // Driver code
        if (require.main === module) {
            // Create test cases and call the reverseLinkedList function
            const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
            const solution = new Solution();
            const reversedList = solution.reverseLinkedList(list);
        
            // Print the result
            while (reversedList !== null) {
                console.log(reversedList.val);
                reversedList = reversedList.next;
            }
        }        
      `),
        python: rTabs(`
        class ListNode {
            constructor(val = 0, next = null) {
                this.val = val;
                this.next = next;
            }
        }
        
        class Solution {
            reverseLinkedList(head) {
                // Start your code from here
                // Write your solution to the Reverse a Linked List problem
            }
        }
        
        // Driver code
        if (require.main === module) {
            // Create test cases and call the reverseLinkedList function
            // Print the result
        }        
      `),
        cpp: rTabs(`
        #include <iostream>

        struct ListNode {
            int val;
            ListNode* next;
            ListNode(int x) : val(x), next(nullptr) {}
        };

        class Solution {
        public:
            ListNode* reverseLinkedList(ListNode* head) {
                ListNode* prev = nullptr;
                ListNode* current = head;

                while (current != nullptr) {
                    ListNode* nextNode = current->next;
                    current->next = prev;
                    prev = current;
                    current = nextNode;
                }

                return prev;
            }
        };

        int main() {
            // Create test cases and call the reverseLinkedList function
            ListNode* list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
            Solution solution;
            ListNode* reversedList = solution.reverseLinkedList(list);

            // Print the result
            while (reversedList != nullptr) {
                std::cout << reversedList->val << std::endl;
                reversedList = reversedList->next;
            }

            return 0;
        }
      `),
        java: rTabs(`
        class ListNode {
            int val;
            ListNode next;
            ListNode(int x) { val = x; }
        }
        
        class Solution {
            public ListNode reverseLinkedList(ListNode head) {
                ListNode prev = null;
                ListNode current = head;
        
                while (current != null) {
                    ListNode nextNode = current.next;
                    current.next = prev;
                    prev = current;
                    current = nextNode;
                }
        
                return prev;
            }
        }
        
        public class Main {
            public static void main(String[] args) {
                // Create test cases and call the reverseLinkedList function
                ListNode list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
                Solution solution = new Solution();
                ListNode reversedList = solution.reverseLinkedList(list);
        
                // Print the result
                while (reversedList != null) {
                    System.out.println(reversedList.val);
                    reversedList = reversedList.next;
                }
            }
        }        
    `),
    }
};

export {
    twoSum,
    mergeTwoSortedLists,
    reverseALinkedList
};
