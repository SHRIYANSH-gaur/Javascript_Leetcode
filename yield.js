/**
 * @return {Generator<number>}
 */
var fibGenerator = function*() {
    yield 0;
    yield 1;
    let a=0;
    let b=1;
    while(true){
        let c=a+b;
        let t=b;
        b=c;
        a=t;
        yield c;
    }
};

/**
 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 This problem presents an interesting exploration of JavaScript generator functions, with the objective of writing a generator function that yields the Fibonacci sequence. This sequence is a series of numbers in which each number is the sum of the two preceding ones, generally starting with 0 and 1. Therefore, the sequence initiates as follows: 0, 1, 1, 2, 3, 5, 8, 13 and so forth.

JavaScript generator functions are special types of functions that can control the execution flow within a function, including the ability to pause and resume at specific points. This characteristic makes them ideal for generating potentially infinite sequences like the Fibonacci sequence. By using the yield keyword, a generator function can produce a sequence of values over time, instead of computing them all at once. It can thus generate an infinite data stream, creating each value only when needed. This feature provides significant performance benefits and allows for the creation of infinite sequences without overloading memory resources.

Understanding the yield keyword in JavaScript and the concept of maintaining state between function invocations are critical to address this problem. Also, getting acquainted with how JavaScript's .next() method operates with generator objects is important as it is used to retrieve the next Fibonacci number in the sequence.

If you're not yet familiar with the Fibonacci sequence, consider starting with this problem: Fibonacci Number. This will provide a solid understanding of the sequence, which is crucial for this problem.

Finally, for a more detailed study on JavaScript functions, consider reading the Create Hello World Function Editorial. This article provides valuable insights into the behavior and usage of functions in JavaScript.

JavaScript Generator Functions
Generator functions in JavaScript are special types of functions that can be paused and resumed, enabling them to yield multiple outputs on different invocations. They are defined using the function* keyword, and they return a generator object when invoked.

This generator object is special because it conforms to both the iterable and iterator protocols in JavaScript:

The iterable protocol allows JavaScript objects to define or customize their iteration behavior. An object is iterable if it implements the @@iterator method, meaning it has a property with a Symbol.iterator key.
The iterator protocol is a protocol that defines a standard way to produce a sequence of values. An object is an iterator when it implements a next() method.
In other words, the generator object returned by a generator function is an iterator and can be used directly in a for...of loop and other JavaScript constructs that expect an iterable.

Here's an example of using a generator function with the iterator protocol:

const gen = [1,2,3][Symbol.iterator]();
console.log(gen.next()); // { value: 1, done: false }
For a deeper understanding of the iteration protocols in JavaScript, check out the MDN reference on Iteration Protocols.

The yield keyword is used within the generator function to specify the values to be returned during its execution. Each time yield is encountered, the function's execution is paused, and the yielded value is emitted. The next invocation of the generator's next() method resumes the execution from where it was last paused.

An example of a simple generator function in JavaScript:

function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
simpleGenerator is a generator function that yields the numbers 1, 2, and 3. When we invoke simpleGenerator, it returns a generator object. We then call the next() method on this object to retrieve the next value yielded by the generator function.

Maintaining State with JavaScript Generators
One of the key features of JavaScript generator functions is their ability to maintain state between invocations. This allows you to create functions that generate a series of related values over multiple calls, such as a sequence of numbers or a sequence of Fibonacci numbers.

When a generator function is invoked, it returns a generator object, but it doesn't execute any of the function's code immediately. Instead, the function's code is executed on-demand, each time the generator's next() method is invoked. This feature allows the generator to maintain its position in the code for subsequent calls, effectively preserving state between these calls.

function* countUp() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const gen = countUp();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

In this example, the countUp generator function yields an infinite series of incrementing numbers. Each time gen.next() is called, the function resumes execution from the last yield, using the current value of the count variable. This demonstrates how generators can maintain state between invocations.

The next() Method in JavaScript Generators
The next() method is a key part of the JavaScript generator function framework. When invoked on a generator object, it resumes the execution of the function until the next yield statement is encountered. The value yielded by the yield statement is returned as the value property of an object, which also includes a done property indicating whether the generator has completed execution.

Here's an example demonstrating the use of the next() method:

function* simpleGenerator() {
  yield 1;
  yield 2;
  return 3;
}

const gen = simpleGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }
Each call to gen.next() resumes the execution of the simpleGenerator function, returning an object that includes the yielded value and a flag indicating whether the function has completed its execution.

Iterators vs Generators
The concepts of iterators and generators are related and often used together in JavaScript, but they serve different purposes. It's important to distinguish between them to understand their respective roles in managing sequences of data.

An iterator is a design pattern used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers; in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.

In JavaScript, an iterator is an object which defines a sequence and potentially a return value upon its termination. Specifically, an object is an iterator when it implements a next() method with the following semantics:

On each call, it returns an object with two properties: value and done.
The value property is the value of the current item in the sequence.
The done property is a Boolean that is true if the last value in the sequence has already been produced and false otherwise.
How Do They Work Together?
When a generator function is called, it returns a generator object. This object is an iterator, meaning it has a next() method that can be called to produce a value from the generator.

Each time next() is called, the generator function's execution is resumed from its paused state, and it continues until it reaches the next yield expression. The value of the yield expression is returned from the next() method.

In conclusion, while the terms iterator and generator are related, they are not interchangeable:

Iterators are a concept and a pattern that allows you to traverse sequences of values.
Generators are a tool in JavaScript that helps create iterators with a special syntax. Generators can be paused and resumed, making it easier to create complex sequences because the function "remembers" its state.
Use Cases of Generators
Generators, with their ability to produce values on demand, can be employed effectively in various programming scenarios. Here are some of the prominent use cases:

Cancellation of Execution
Generators open the way for two-way communication between generator code and the "execution engine". Not only can you pause execution, but you can also cancel it or completely alter how the generator code behaves based on the decisions of the "engine". This unique advantage can be particularly useful when dealing with complex control flows or when you need to manage resources effectively.

function* taskRunner() {
  let taskId = 0;
  let cancelled = false;

  while (!cancelled) {
    cancelled = yield taskId++;
  }
}

const tasks = taskRunner();
tasks.next(); // starts task 0
tasks.next(); // starts task 1
tasks.next(true); // cancels the tasks
In this generator function taskRunner, we generate a sequence of task IDs. The statement cancelled = yield taskId++; pauses execution and returns the current task ID. The generator then waits for the next invocation of next() before it continues.

The single yield statement cancelled = yield taskId++; in the loop demonstrates a key feature of generators: the ability to send data back into the generator. When next() is called, the value passed as an argument to next() is returned by yield. This allows the caller to send a signal (in this case, a cancellation signal) back into the generator.

By passing true to next(), we signal the generator to cancel the tasks. As a result, cancelled becomes true, the while loop ends, and the generator function stops generating new tasks. This showcases the two-way communication feature of generators, allowing external control over the execution of a generator function.

This ability to pause and resume execution, coupled with the ability to send data back into the generator, provides a lot of flexibility in controlling execution flow, making generators a powerful feature in JavaScript for handling complex, stateful computations or tasks.

Infinite Data Streams
Generators can be implemented to create infinite sequences or data streams. For instance, one might define a generator that generates an endless sequence of incrementing numbers as follows:

function* infiniteSequence() {
  let i = 0;
  while(true) {
    yield i++;
  }
}
This generator can be iterated indefinitely to produce an endless sequence of numbers. Interestingly, this gives us the capability to employ infinite loops without the risk of the program crashing. It could also serve as a simple method to generate unique IDs. Each time you invoke the next() method on the generator, it yields a new number, incremented from the previous one.

Simulation and Game State:
If you're developing a game where a player can move in four directions and want to simulate all possible moves, you could use a generator to create the sequence of moves:

function* playerMoves() {
  const directions = ['up', 'down', 'left', 'right'];
  for(let direction of directions) {
    yield direction;
  }
}
You could certainly use a simple loop to iterate over the directions, but using a generator here provides some unique advantages, particularly in more complex game scenarios.

One key advantage of generators is their ability to maintain internal state across multiple calls, with the added benefit of pausing and resuming execution. This functionality is particularly useful in complex scenarios such as a chess game, where the ability to pause the game, store the state, and resume later can be invaluable. Unlike a simple loop, where additional logic would be necessary to manage this, generators inherently provide this functionality.

Consider a chess engine, where the number of potential game states is astronomically large. Instead of generating all possible game states upfront, which is not only impractical but also resource-intensive, a generator can produce them on-demand as each move is made. This leads to a more efficient management of game states, saving memory and computing power. Generators, therefore, can greatly enhance the performance and complexity of applications like a chess engine.

Dealing with Deeply Nested Data Structures
Generators can be used to process deeply nested data structures such as trees or arrays in a different manner compared to traditional recursion. While traditional recursive methods can result in a stack overflow for data structures with a high level of nesting, generators allow us to control the flow of data by yielding items one at a time. This characteristic doesn't inherently prevent stack overflow but provides us with a unique way of handling and processing data in complex, deeply nested structures.

function* traverseTree(node) {
  if (!node) {
    return;
  }

  yield node.value;

  if (node.left) {
    yield* traverseTree(node.left);
  }

  if (node.right) {
    yield* traverseTree(node.right);
  }
}

const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 },
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 },
  },
};

for (const value of traverseTree(tree)) {
  console.log(value); // logs: 1, 2, 4, 5, 3, 6, 7
}
The traverseTree generator function recursively traverses the nodes in the binary tree. It starts at the root, then it yields the root's value and recursively calls itself on the left child and right child if they exist. This process allows the function to handle binary trees of any level of depth.

Both generators and traditional functions in JavaScript interact with the engine's call stack and can lead to a stack overflow error if the recursion depth exceeds the stack size limit. It's a common misconception that generator functions prevent stack overflow. Generators are described as 'lazy' because they generate values only when explicitly asked for, rather than computing all values upfront. This can lead to more efficient memory usage, especially when dealing with large but finite data structures, as they generate values on demand.

However, this 'lazy' computation does not affect the call stack depth. In other words, even though generators can handle memory more efficiently by generating values on demand, they do not inherently reduce the depth of the call stack or prevent stack overflow. Therefore, it's crucial to manage recursion depth carefully when using both generators and traditional recursion.
 */
