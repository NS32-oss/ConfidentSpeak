import google from '@/public/assets/companies/google.png'
import facebook from '@/public/assets/companies/facebook.png'
import microsoft from '@/public/assets/companies/microsoft.png'
import amazon from '@/public/assets/companies/amazon.png'
import uber from '@/public/assets/companies/uber.png'
import apple from '@/public/assets/companies/apple.png'
import netflix from '@/public/assets/companies/netflix.png'

const problems: {
    no: string;
    title: string;
    difficulty: string;
    slug: string;
    company: string[];
}[] = [
    {
        no: "101",
        title: "Two Sum",
        difficulty: "Easy",
        slug: "two-sum",
        company: [
            "Google",
            "Microsoft",
        ],
    },
    {
        no: "102",
        title: "Merge Two Sorted Lists",
        difficulty: "Medium",
        slug: "merge-two-sorted-lists",
        company: [
            "Facebook",
        ],
    },
    {
        no: "001",
        title: "Reverse a Linked List",
        difficulty: "Easy",
        slug: "reverse-linked-list",
        company: [
            "Google",
            "Facebook",
            "Microsoft",
        ],
    },
    {
        no: "002",
        title: "Implement a LRU Cache",
        difficulty: "Medium",
        slug: "lru-cache",
        company: [
            "Facebook",
            "Amazon",
            "Uber",
        ]
    },
    {
        no: "003",
        title: "Find the Missing Number in an Array",
        difficulty: "Easy",
        slug: "missing-number",
        company: [
            "Google",
            "Microsoft"
        ]
    },
    {
        no: "004",
        title: "Valid Parentheses",
        difficulty: "Easy",
        slug: "valid-parentheses",
        company: [
            "Amazon",
            "Microsoft",
            "Facebook"
        ]
    },
    {
        no: "005",
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        slug: "binary-tree-maximum-path-sum",
        company: [
            "Uber",
            "Google",
            "Facebook",
        ]
    },
    {
        no: "006",
        title: "Serialize and Deserialize a Binary Tree",
        difficulty: "Hard",
        slug: "serialize-deserialize-binary-tree",
        company: ["Amazon",
            "Google",]
    },
    {
        no: "007",
        title: "Two City Scheduling",
        difficulty: "Medium",
        slug: "two-city-scheduling",
        company: [
            "Facebook",
            "Amazon",
            "Microsoft",
        ],
    },
    {
        no: "008",
        title: "Count Islands",
        difficulty: "Medium",
        slug: "count-islands",
        company: [
            "Amazon",
            "Google",
            "Facebook",
        ]
    },
    {
        no: "009",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        slug: "search-rotated-sorted-array",
        company: [
            "Google",
            "Microsoft"
        ]
    },
    {
        no: "010",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        slug: "longest-palindromic-substring",
        company: [
            "Amazon",
            "Microsoft",
            "Facebook"
        ]
    },
    {
        no: "011",
        title: "Design Twitter",
        difficulty: "Hard",
        slug: "design-twitter",
        company: [
            "Uber",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "012",
        title: "Meeting Rooms II",
        difficulty: "Medium",
        slug: "meeting-rooms-ii",
        company: ["Google",
            "Microsoft",]
    },
    {
        no: "013",
        title: "Word Ladder",
        difficulty: "Hard",
        slug: "word-ladder",
        company: [
            "Amazon",
            "Google",
            "Facebook",
        ],
    },
    {
        no: "014",
        title: "Min Stack",
        difficulty: "Easy",
        slug: "min-stack",
        company: [
            "Facebook",
            "Microsoft",
            "Amazon",
        ]
    },
    {
        no: "015",
        title: "Find First and Last Position of Element in Sorted Array",
        difficulty: "Medium",
        slug: "find-first-last-position-sorted-array",
        company: [
            "Google",
            "Microsoft"
        ]
    },
    {
        no: "016",
        title: "Substring with Concatenation of All Words",
        difficulty: "Hard",
        slug: "substring-concatenation-all-words",
        company: [
            "Amazon",
            "Facebook",
            "Microsoft"
        ]
    },
    {
        no: "017",
        title: "Maximum Subarray",
        difficulty: "Easy",
        slug: "maximum-subarray",
        company: [
            "Google",
            "Microsoft",
            "Amazon",
        ],
    },
    {
        no: "018",
        title: "LRU Cache Implementation",
        difficulty: "Hard",
        slug: "lru-cache-implementation",
        company: [
            "Amazon",
            "Facebook",
            "Google",
        ]
    },
    {
        no: "019",
        title: "Valid Anagram",
        difficulty: "Easy",
        slug: "valid-anagram",
        company: [
            "Microsoft",
            "Amazon"
        ]
    },
    {
        no: "020",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        slug: "trapping-rain-water",
        company: [
            "Google",
            "Facebook",
            "Amazon"
        ]
    },
    {
        no: "021",
        title: "Two Sum",
        difficulty: "Easy",
        slug: "two-sum",
        company: [
            "Google",
            "Facebook",
            "Netflix",
        ],
    },
    {
        no: "022",
        title: "Add Two Numbers",
        difficulty: "Medium",
        slug: "add-two-numbers",
        company: [
            "Facebook",
            "Apple",
        ]
    },
    {
        no: "023",
        title: "Merge Two Sorted Lists",
        difficulty: "Medium",
        slug: "merge-two-sorted-lists",
        company: [
            "Google",
            "Apple"
        ]
    },
    {
        no: "024",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        slug: "remove-nth-node-from-end-of-list",
        company: [
            "Tata",
            "Google",
            "Accenture"
        ]
    },
    {
        no: "025",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        slug: "longest-substring-without-repeating-characters",
        company: [
            "Uber",
            "Tata",
            "Facebook",
        ]
    },
    {
        no: "026",
        title: "ZigZag Conversion",
        difficulty: "Medium",
        slug: "zigzag-conversion",
        company: ["Amazon",
            "Google",]
    },
    {
        no: "027",
        title: "Reverse Integer",
        difficulty: "Easy",
        slug: "reverse-integer",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "028",
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        slug: "string-to-integer-atoi",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "029",
        title: "Palindrome Number",
        difficulty: "Easy",
        slug: "palindrome-number",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "030",
        title: "Regular Expression Matching",
        difficulty: "Hard",
        slug: "regular-expression-matching",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "031",
        title: "Container With Most Water",
        difficulty: "Medium",
        slug: "container-with-most-water",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "032",
        title: "Integer to Roman",
        difficulty: "Medium",
        slug: "integer-to-roman",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "033",
        title: "Roman to Integer",
        difficulty: "Easy",
        slug: "roman-to-integer",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "034",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        slug: "longest-common-prefix",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "035",
        title: "3Sum",
        difficulty: "Medium",
        slug: "3sum",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "036",
        title: "3Sum Closest",
        difficulty: "Medium",
        slug: "3sum-closest",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
    {
        no: "037",
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        slug: "letter-combinations-of-a-phone",
        company: [
            "Google",
            "Facebook",
            "Amazon",
        ]
    },
];

const imageMap: {
    [key: string]: string | any;
    Facebook: string | any;
    Google: string | any;
    Microsoft: string | any;
    Amazon: string | any;
    Uber: string | any;
    Apple: string | any;
    Netflix: string | any;
} = {
    Facebook: facebook,
    Google: google,
    Microsoft: microsoft,
    Amazon: amazon,
    Uber: uber,
    Apple: apple,
    Netflix: netflix,
}
export {problems, imageMap};