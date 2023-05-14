/**
 * @param {Function} fn
 * @return {Function}
 */
var curry = function(fn) {
    return function curried(...args) {
       if(args.length >= fn.length){
           return fn(...args);
       }
        return (...nextargs)=>curried(...args, ...nextargs);
    };
};

/**
 * function sum(a, b) { return a + b; }
 * const csum = curry(sum);
 * csum(1)(2) // 3
 Currying is a powerful technique in functional programming that transforms a function with multiple arguments into a sequence of functions. It allows you to create flexible and reusable code by enabling partial application of function arguments. In this article, we will discuss the concept and implementation of currying in JavaScript.

Example:

Suppose we have a function sum that takes three arguments and returns their sum:


We can create a curried version of this function, curriedSum. Now, we can call curriedSum in various ways, all of which should return the same result as the original sum function:


Currying in JavaScript has several practical applications that can help improve code readability, maintainability, and reusability. Here are some practical use cases of currying:

Reusable utility functions: Currying can help create reusable utility functions that can be easily customized for specific use cases. Currying allows you to create a function that returns another function with a partially applied argument. In this case, we have a curried add function that takes two arguments, a and b. When you call add with a single argument, it returns a new function that takes the second argument b and adds it to the initially provided a.

Here's the example with more explanation:


Event handling: In event-driven programming, currying can be used to create event handlers with specific configurations, while keeping the core event handling function generic.


Customizing API calls: Currying can help create more specific API calls based on a generic API call function.


Higher-order functions and functional composition: Currying enables the creation of higher-order functions that can be composed to create more complex functionality.


Currying is a valuable concept in functional programming that enables you to write more flexible and reusable code. Mastering currying will help you create cleaner and more efficient solutions for a wide range of programming problems.

Approach 1: Currying with Recursive Function Calls
Intuition
The problem requires us to transform a given function into a curried version. A curried function is a function that accepts fewer or an equal number of parameters as the original function and returns either another curried function or the same value the original function would have returned.

This can be achieved using a recursive approach that returns a new function each time it's called with fewer arguments than the original function. This continues until a sufficient amount of arguments has been collected. At that point, the original function can be called.

Algorithm
The curry function takes a function (fn) as its parameter. This is the function that will be eventually executed with the curried arguments.
It returns a new function (curried) that is responsible for accumulating the arguments passed to it until the required number of arguments is reached. This function acts as a closure, remembering the accumulated arguments at each step.
curried is defined with the rest parameter syntax (...args) to accept a variable number of arguments, allowing partial application at each step.
Inside curried, a check is performed to see if the accumulated arguments are sufficient. If the number of arguments passed (args.length) is greater than or equal to the original function's arity (fn.length), then all required arguments have been provided. This is our base case.
If the sufficient arguments check passes, invoke fn with the spread syntax (...args) to pass all the collected arguments, and return the result.
If the number of arguments passed is not sufficient, then return an anonymous function that also uses the rest parameter syntax (...nextArgs). This allows for further accumulation of arguments.
When the anonymous function is called, it invokes curried again with the accumulated arguments from both args and nextArgs. This ensures that the arguments are passed in the correct order and merged together.
The process of accumulating arguments and invoking curried continues until the necessary number of arguments is met. This enables the flexibility to apply arguments in any combination of calls.
Once the necessary number of arguments is met, the original function (fn) is called with all the accumulated arguments, providing the same result as if the original function had been called directly with those arguments.
 */
