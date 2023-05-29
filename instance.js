/**
 * @param {any} obj
 * @param {any} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (obj === null || obj === undefined || typeof classFunction !== "function")
    return false;

  let inputObj = obj;
  if (typeof obj !== "object") {
    inputObj = Object(obj);
  }
     // Make sure it's an object so instanceof has direct access to the constructor function
  return inputObj instanceof classFunction;
};

/**
 * checkIfInstanceOf(new Date(), Date); // true
 Before diving into the main problem and its solution, it's crucial to understand how prototypal inheritance works in JavaScript. Unlike class-based languages such as Java or C++, JavaScript is a prototype-based language, which means it relies on objects and their prototypes rather than classes and inheritance.

Every object in JavaScript has a prototype, which is another object that the current object inherits properties and methods from. When you access a property or method on an object, JavaScript first checks if the object itself has the requested property. If it doesn't, the engine looks down the prototype chain, checking each prototype object until it finds the requested property or reaches the end of the chain.

To illustrate this, let's consider an example:


This prototype-based inheritance mechanism is at the core of JavaScript's object-oriented programming model, and understanding it is essential to working with instances, classes, and superclasses effectively."

A key aspect of object-oriented programming is understanding the relationship between objects and their classes or superclasses. One common task in this domain is determining whether a given object is an instance of a specific class or its superclass. This problem challenges you to create a function, checkIfInstanceOf(obj, classFunction), that serves this purpose in a generic way.

The function accepts two arguments: an object and a class, and returns a boolean value indicating whether the object is an instance of the given class or its superclass. An object is considered an instance of a class if it can access the class's methods.

The challenge in this problem lies in accommodating various data types and handling cases where the instanceof keyword may not produce the expected result. For instance, the function should recognize that primitives have indirect access to methods and prototypes of their appropriate constructors.

In JavaScript, the concept of "instance of" is a bit different than other languages as JavaScript is a prototype-based language, rather than a class-based language like Java or C++. In JavaScript, an object is considered an instance of a constructor function (or class) if it has been created using the new keyword with that constructor function, or if it inherits from the prototype of the constructor function. In other words, an object is an instance of a constructor function if it is linked to the constructor's prototype in its prototype chain.

Now regarding test cases like checkIfInstance(5, Number) - in JavaScript, the value 5 is a primitive value of type number. It is not an instance of the Number object (which is a wrapper object for numeric values) in the sense that you might expect from object-oriented programming languages like Java or C++. However, that's where things get interesting. When you access a property or method on a primitive value, JavaScript temporarily coerces the primitive value into an object (a process called "boxing") so that you can access the property or method.

The constructor property is one such property that is accessible on a number primitive. When you use (5).constructor (numbers need to be wrapped, as otherwise, javascript considers it's a decimal point, for strings you can use dot notation without any changes e.g. “myString”.length) or other other methods like Object.getPrototypeOf(5), JavaScript coerces the number primitive 5 into a Number object, allowing you to access the constructor property, which points to the Number constructor function. Even though (5).constructor points to the Number constructor, it doesn't mean that 5 is an instance of Number, as you might expect from object-oriented languages. In JavaScript, 5 is still a primitive value and not an actual instance of the Number object. You can verify this by checking with the instanceof operator:

console.log(5 instanceof Number); // Output: false
And that's why instanceof behaves in that way, which is actually correct but in this particular problem we consider a value to be an instance of a given class when (as the prompt reads) the value ‘has access to that class's methods’ and it’s meant by the author that indirect access to class’s methods through the boxing process described above to be also considered. Example 4 clarifies that and that’s why using instanceof won’t work as a solution to this problem. In contrast, if you create a Number object using the Number constructor, it will be an instance of Number:

const num = new Number(5);
console.log(num instanceof Number); // Output: true
By mastering this problem, you will gain a deeper understanding of object-oriented programming concepts in JavaScript and improve your ability to work with instances, classes, and superclasses.

Approach 1: Iterating Through Prototype Chain
Intuition
The problem requires checking if a given object is an instance of a specified class or one of its superclasses. The object is considered an instance of a class if it has access to that class's methods including indirect access through boxing as described in the overview section.

The provided solution focuses on traversing the prototype chain of the given object to determine if it's an instance of the specified class or one of its superclasses. By iterating through the prototype, we can identify if the object has access to the class's methods.

Algorithm
The checkIfInstanceOf function accepts two parameters: obj (the object to check, possibly could be primitive value) and classFunction (the class to check against). The algorithm proceeds as follows:

If obj is null or undefined, or classFunction is not a function, return false. This step ensures that the input is valid before proceeding.

Initialize a variable currPotentialPrototype with the prototype of obj. The prototype is an object containing the methods and properties accessible by obj.

Use a while loop to iterate through the prototype chain of obj. For each iteration, perform the following steps:

a. Check if currPotentialPrototype is equal to the prototype of classFunction. If so, obj is an instance of classFunction, and the function returns true.

b. If the prototypes are not equal, move down the prototype chain by setting currPotentialPrototype to the prototype of its current value.

If the loop finishes without finding a matching prototype, return false, as obj is not an instance of classFunction or its superclasses in this case.
 */
