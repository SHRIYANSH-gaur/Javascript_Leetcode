/**
 * @param {any[]} arr
 * @param {number} depth
 * @return {any[]}
 */
var flat = function (arr, n) {
    let res = [];
    const flattening = (nums, l) => {
      for (const num of nums) {
        if (Array.isArray(num) && l > 0 && l <= n) {
          flattening(num, l - 1);
        } else {
          res.push(num);
        }
      }
    }

    flattening(arr, n);
    return res;
};
/*
You are given a multi-dimensional array arr and an integer n. Your task is to flatten the array arr by removing sub-arrays up to a depth of n. A flattened array should only contain the actual elements from the sub-arrays, and not the sub-arrays themselves.

Use Cases:
Data Processing:

When working with data in a nested format, such as JSON or XML, flattening the structure can simplify data processing tasks. For example, if you have a nested JSON response from an API and you only need certain fields, flattening the JSON can make it easier to extract and analyze the required data.
For example:
const people = [
{name: 'Mike', items: ['hammer', 'axe']}
{name: 'Steve', items: ['rock', 'stick']}
]

const allItems = people.map(d => d.items).flat()
Tree Traversal:

In computer science, trees are often used to represent hierarchical structures. When traversing a tree-like structure, flattening can be used to convert the tree into a linear representation, allowing easier navigation and manipulation of the data.
Recursive Algorithms:

Many algorithms involve recursive operations on data structures. Flattening nested arrays can be beneficial in such cases. For instance, when implementing algorithms like depth-first search or recursive backtracking, flattening can simplify the process by providing a linear view of the data.
Database Queries:

In database systems, nested structures can be stored as arrays or JSON objects. When querying the data, flattening the nested arrays can be useful to retrieve specific elements or perform aggregations across different levels of the structure.
Approach 1: Recursive approach
Intuition:
As it is a deeply nested structure there will be some repetitive steps to acheive in the solution to make them flatten, so recursion is the go to way to the approach.

Algorithm:
Let's create a recursive function flattening which takes an array nums and a level l as arguments
Inside flattening, a for...of loop is used to iterate over the elements of the nums array.
For each element, it checks if the element is an array and if the level l is within the specified range (l > 0 and l <= n).
If the element is an array and the level condition is met, it recursively calls flattening with the nested array and decrements the level by 1 i.e., (l - 1).
If the element is not an array or the level condition is not met, it pushes the element into the res array.
The flattening function is initially called with the arr and n arguments to start the flattening process.
Finally, the res array containing the flattened elements is returned as the result.
*/
