/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function*(arr) {
     if(!Array.isArray(arr)) {
        yield arr
        return
    }

    for(let i = 0; i < arr.length; i++) {
        yield* inorderTraversal(arr[i])
    }
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 We are given a multi-dimensional array of integers and arrays. We need to create a generator function that yields the integers in the same order as an inorder traversal of the array. We can utilize the power of generators beautifully by implementing a solution that allows us to lazily generate and yield the integers as they are encountered, rather than computing or storing all the values upfront. Since we are doing operations on demand it becomes much more efficient both speed wise and memory wise.

Use Cases:
Processing Large Data Sets: When dealing with large datasets, it is often impractical or impossible to load all the data into memory at once. Generators can be used to lazily iterate over the data, processing one item at a time, thus reducing memory usage. For example, when reading data from a file or fetching data from a server, generators can be used to process the data in chunks or on-the-fly.

Example: Reading a large CSV file and processing it row by row using a generator function to minimize memory usage.
Pagination and Infinite Scrolling: Generators can be helpful in scenarios where data is fetched from an API in paginated form or through infinite scrolling. Instead of loading and storing all the data at once, generators can be used to fetch and process data page by page or as the user scrolls, improving performance and reducing memory consumption.

Example: Fetching data from an API that provides paginated results, using a generator to lazily load and process each page of data as needed.
Tree Traversal: When working with tree-like data structures, such as hierarchical file systems or nested categories, generators can facilitate tree traversal algorithms. Generators can yield nodes in a specific order, such as preorder, inorder, or postorder, enabling efficient processing of the tree without the need to store the entire tree structure in memory. This is the crux of our question.

Example: Navigating through a nested directory structure and processing files in an inorder traversal using a generator to yield each file path.
State Machine and Workflow Management: Generators can be employed to build state machines or manage complex workflows. Each state or step of the workflow can be represented by a generator function, allowing for easy control flow, suspension, and resumption of execution.

Example: Imagine you are developing a chess engine that needs to handle the different states and moves of a game. Each move in chess involves a sequence of actions, such as selecting a piece, choosing a destination square, and applying the move to the game board. To manage the game state and move execution, you can use generators. Each state of the game and move can be represented by a generator function.
Also let's say if the player decides to quit, they can trigger an action that stops the generator, ending the game. This also showcases one more feature of generators i.e Two-way communication between the generator code and the 'execution engine' (In this case the game code and the player) this feature gives dynamic control flow and the ability to cancel the game based on user input.
Approach 1: Recursive Solution
Intuition:
We can use a recursive generator to yield the elements from the nested arrays.

Algorithm:
If the element is not an array, it means it is an integer. In this case, the generator function yields the element, making it available for the caller of the generator. By using the yield statement, the generator function suspends its execution, allowing the caller to retrieve the yielded value. The generator function can then be resumed from where it left off, continuing the loop and traversing the array further.
After taking care of the condition "if it's an integer" now lets check about the left out condition i.e. "if the array is a nested array". In this case we use a for loop that iterates over each element of the array using the index i.
Now since we have encountered a nested array within the original array. The generator function recursively calls itself by invoking yield* inorderTraversal(arr[i]). This recursive call applies the same logic to the nested array, ensuring that it is also traversed in an inorder manner. yield* is used when we want to delegate to another Generator (in this case the recursive call). Returns the value returned by that iterator when it's closed.
The generator yields integers in the same order as they are encountered during the traversal.
If you're still not sure about yield*, let's use an analogy to explain what "yield*" means:

Now imagine you are a tour guide taking a group of people on an adventure through a dense forest. As you navigate through the forest, you come across different paths, each leading to a new and exciting location. Instead of leading the entire group through each path all at once, you have a special ability called "yield". With this ability, you can pause and allow one person from the group to explore a path while the rest of the group waits. That person can then return and share their experience before another person takes their turn to explore a different path. This way, everyone gets a chance to discover and enjoy the various hidden treasures in the forest, one by one, using the power of "yield*". I hope this analogy will help you all.
 */
