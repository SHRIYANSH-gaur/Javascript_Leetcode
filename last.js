Array.prototype.last = function() {
    let l=this.length;
    return l===0 ? -1 : this[l-1];
};

/**
This problem invites us into an intriguing part of JavaScript programming: adding new capabilities to built-in prototypes. Although this is not typically recommended due to potential hazards, it does provide a meaningful glimpse into JavaScript's flexible and dynamic nature. For this challenge, we'll need to add a last() method to the Array prototype. This cool new method will return the last element of any array it's applied to, or -1 if the array is empty.

In JavaScript, arrays are objects, and all objects inherit properties and methods from their prototypes. The prototype is a sort of "template object" that is used as the basis for creating other objects. In this context, JavaScript’s Array object is a global object that contains methods for manipulating arrays, and this object can be extended with custom methods or properties.

For example, let's examine the built-in push() method, which adds new items to the end of an array and returns the new length. This method is part of the Array prototype and is accessible to all arrays in JavaScript:

let arr = [1, 2, 3];

console.log(Array.prototype.hasOwnProperty('push')); // This will return true as arrays have the push method

arr.push(4); // arr is now [1, 2, 3, 4]
Now, if you want to add a new method, such as last(), to all arrays, you can add it to the Array prototype:

Array.prototype.last = function() {
  // Your implementation of the last method goes here
};

All arrays you create will now have access to this last() method:

let arr = [1, 2, 3];
console.log(arr.last()); // Your implementation will decide what this outputs
Extending a built-in prototype, such as the Array's, can potentially be risky as it might lead to unforeseen behavior if your method name clashes with future JavaScript updates or with methods from other libraries. Consider, for example, an attempt to overwrite the push() method on the Array prototype:

Array.prototype.push = function() {
    console.log('The push method has been overwritten!');
};

let nums = [1, 2, 3];
nums.push(4); // The push method has been overwritten!
In this scenario, the push() method no longer appends an element to the end of the array. Instead, it merely logs a message to the console.

Overriding built-in methods like push() is generally discouraged. The push() method is widely utilized in JavaScript, and altering its functionality could result in a plethora of bugs and issues. This can become especially problematic when working with third-party libraries or other developers' code, as they would anticipate the push() method to function as expected.

If you require a modified version of a built-in method, it is usually advisable to create a separate method or function. For instance, you could develop a new function that appends an element to an array and then logs a message:

function pushAndLog(array, element) {
    array.push(element);
    console.log('Element ' + element + ' was added to the array.');
}

let nums = [1, 2, 3];
pushAndLog(nums, 4); // Element 4 was added to the array.
console.log(nums); //[1, 2, 3, 4]
In this problem, you are tasked to extend the Array prototype to incorporate a last() method, which should return the last element of an array if it exists, or -1 if the array is empty.

Understanding this task involves a grasp of JavaScript's this keyword. The this keyword in JavaScript is a complex concept as its value is contingent on the context in which a function is invoked. In the problem at hand, this will refer to the object currently invoking the last() method, which will be an array.

The behavior of this in JavaScript differs somewhat from other programming languages. Its value is determined by the context in which it's utilized, which can be perplexing for beginners. Therefore, it's crucial to understand the context and to what this refers in various scenarios.

Global context
Within the global execution context (that is, outside of any function), this refers to the global object in both strict mode and non-strict mode.

In a web browser, the global object is window, so this would refer to the window object:

console.log(this); // Logs "[object Window]" in a browser context
In a Node.js environment, the global object is not window but global. Hence, if you run the same piece of code in a Node.js context, this will refer to the global object:

console.log(this); // Logs "[object global]" in a Node.js context
Function Context
Within a regular function, the value of this depends on how the function is invoked. If a function is called in the global context, this will be undefined in strict mode, or it will reference the global object in non-strict mode.

function func() {
  console.log(this);
}

func(); // Logs "[object Window]" in browser context in non-strict mode, or "undefined" in strict mode
However, when the function acts as a method of an object, this refers to the object on which the method was invoked. This showcases that the value of this is not bound to the function itself but rather how and where the function is called, a concept known as execution context:

let obj = {
  prop: "Hello",
  func: function() {
    console.log(this.prop);
  }
}

obj.func(); // Logs "Hello"
However, arrow functions do not have their own this. Instead, they inherit this from the parent scope at the time of their creation. In other words, the value of this inside an arrow function is determined not by where or how it is called, but by the surrounding lexical context:

let obj = {
  prop: "Hello",
  func: () => {
    console.log(this.prop);
  }
}

obj.func(); // Logs "undefined" because `this` in the arrow function is not bound to `obj` but to its parent scope
This can be advantageous in some scenarios, but it also makes arrow functions unsuitable for methods that need to access other properties of the object on which they are invoked.

Event Handlers
In the context of an event handler, this refers to the element to which the event listener is attached to - the same as the same as event.currentTarget.

button.addEventListener('click', function() {
  console.log(this); // Logs the entire HTML of the button
});
It's important to note that it does not refer to the commonly used event.target property. Let's clarify the difference between event.currentTarget and event.target.

event.currentTarget: This property refers to the element to which the event handler (like addEventListener) has been attached. This is what this is bound to in the context of the event handler function.

event.target: This property refers to the actual DOM element that initiated the event. This is especially relevant for events that bubble. If you click on an inner element, the event bubbles up to the outer elements, triggering their event listeners as well. For those outer elements, event.target would be the innermost element that was actually clicked, while event.currentTarget (or this) would be the element that the current handler is attached to.

<div id="outer">Click me
  <div id="inner">Or me</div>
</div>

<script>
document.getElementById('outer').addEventListener('click', function(event) {
  console.log("currentTarget: ", event.currentTarget.id);
  console.log("this: ", this.id);
  console.log("target: ", event.target.id);
});
</script>

In this case, if you click on the outer div, all three logs will print "outer", because both the clicked element (target) and the element the handler is attached to (currentTarget) are the same. But if you click on the "Or me" text inside the inner div, event.target will be "inner" (because that's the element you clicked on), while event.currentTarget and this will still be "outer" (because that's the element the event handler is attached to).

Constructor Context
In a constructor function, this refers to the newly created object. But, what does 'newly created' mean here? To understand this, we need to explore the new keyword in JavaScript. When you use new before a function call, it tells JavaScript to do four things:

Create a new, empty object. This is not a function, an array, or null, it's just an empty object.
Make this in the function refer to that new object. The new object gets linked to the this keyword within the constructor function. This is why this.name inside Person(name) is actually modifying the new object.
Execute the function normally. It runs through the function code as it would normally do.
If the function doesn't return its own object, return the new object. If the constructor function returns an object, that object will be returned instead of the new object. If it returns anything else, the new object is returned.
The new keyword allows JavaScript developers to use the language in an object-oriented style, creating instances from constructor functions much like classes in other languages. This also means the this keyword inside constructor functions behave as you might expect if you're coming from a class-based language, referring to the new instance of the object.

function Person(name) {
  // `this` is a new, empty object when the function is invoked with `new`
  this.name = name; // `this` now has a property `name`
  // The function ends, and `this` is returned because there's no other object being returned by the function
}

let john = new Person('John'); // `john` is now the object returned by the function `Person`, which includes a property `name` with a value of 'John'
console.log(john.name); // Logs "John"
Class Context
In classes, this inside methods refers to the instance of the class:

class ExampleClass {
  constructor(value) {
    this.value = value;
  }
  
  logValue() {
    console.log(this.value);
  }
}

const exampleInstance = new ExampleClass('Hello');
exampleInstance.logValue(); // Logs "Hello"

Explicit / Implicit Binding
You can also set the context of this explicitly using the .call(), .apply(), or .bind() methods available on functions:

function logThis() {
  console.log(this);
}

const obj1 = { number: 1 };
const obj2 = { number: 2 };

logThis.call(obj1); // Logs obj1
logThis.call(obj2); // Logs obj2

const boundLogThis = logThis.bind(obj1); 
boundLogThis(); // Logs obj1

Bind Method and Permanent this Context
JavaScript provides a built-in method called bind that allows us to set the this value in methods. This method creates a new function, when invoked, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

The uniqueness of the bind method is that it creates a new function with a permanently bound this value, regardless of how the function is later called. In other words, once you have used bind to set the this value in a function, it cannot be changed — not even with call or apply. The example below demonstrates how bind provides a way to lock the this value in a function, which can be helpful in various scenarios. For example, when you're setting up event handlers and you want the this value to always refer to a specific object, or when you're working with a library or framework that calls your callback function and you want to control what this refers to inside that callback.

function greet() {
  return `Hello, I am {this.name}`;
}

let person1 = { name: 'Alice' };
let person2 = { name: 'Bob' };

// Create a bound function with "this" set to person1
let greetPerson1 = greet.bind(person1);

console.log(greetPerson1()); // Hello, I am Alice

// Attempt to change the context by using the call method; however, it still uses person1 as 'this' context
console.log(greetPerson1.call(person2)); // Hello, I am Alice

//  In contrast, a normal function call allows the 'this' context to be set by the call method
console.log(greet.call(person2)); // Hello, I am Bob

```

In JavaScript, understanding the context of `this` keyword is essential for manipulating and interacting with objects, especially when dealing with object-oriented programming, event handlers, and certain aspects of function invocation. Understanding the behavior of `this` can help improve the structure of your code and make it more predictable and easier to debug. In addition, certain design patterns, such as the Factory and Decorator patterns, make heavy use of `this`, so understanding its behavior is crucial for implementing these patterns effectively.

A crucial concept to grasp in JavaScript is that the `this` value in a function object is usually not fixed -- it often varies based on the context in which the function is invoked. In other words, the `this` value within a function is typically determined at the time of its execution, rather than at the moment of its definition. However, there are exceptions to this rule. When using `bind()`, `call()`, or `apply()` methods on a function, these methods allow you to explicitly set the value of this for the invocation of the function, thereby overriding its default behavior. Additionally, arrow functions in JavaScript behave differently. They do not bind their own `this` value. Instead, they capture the value of `this` from the outer lexical environment in which they are defined, and `this` value remains constant throughout the lifecycle of the function. These nuances make understanding and using `this` in JavaScript both challenging and important.

---

### Approach 1:  Extending Array Prototype to Include a `.last()` Method

#### Intuition
Based on the problem statement, you need to enhance all arrays to have a method `.last()` that returns the last element of an array. If there are no elements in the array, it should return -1.

To do this, you can add a new method to the Array prototype. This new method can simply return the last element of the array by accessing `this[this.length - 1]`.

The `this` keyword in a method added to the Array prototype refers to the array that the method is called on.

Note: Extending native prototypes is a powerful feature of JavaScript but it should be used sparingly. It can lead to conflicts if other code (or later versions of JavaScript) adds a method with the same name. Always exercise caution when extending native prototypes.

#### Algorithm
1. Define a new method on the Array prototype named last.
2. Inside this method, check if the array is empty. If it is, return -1.
3. If the array is not empty, return the last element of the array. The last element can be accessed as `this[this.length - 1]`.

#### Implementation

This approach can be implemented in various ways.

##### Implementation 1: Regular If Check
 */
