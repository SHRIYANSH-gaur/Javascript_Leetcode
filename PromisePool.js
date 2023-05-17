/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Function}
 */
var promisePool = async function(functions, n) {
   async function evalnext(){
       if(functions.length==0)return;
       const fn=functions.shift();
        await fn();
        await evalnext();
   }
    const nPromise= Array(n).fill().map(evalnext);
    await Promise.all(nPromise);
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 
 Use-case for Promise Pool
Imagine you have a long list of files you have to download, and you can only download them one at a time. If you requested all of them at once in parallel (using Promise.all), several bad things could happen:

The environment may cancel requests because it detects that there are too many to handle.
The database may become unresponsive under the heavy load.
Too much network traffic could cause higher priority requests to get delayed.
The app could become unresponsive trying to process all the data at once.
An alternative approach could be to process one file at a time:

for (const filename of files) {
  await download(filename);
}
However, this is slow and doesn't take advantage of parallelization.

The optimal approach is to decide on a reasonable limit on the number of concurrent requests and use a promise pool. Using the implementation asked for in this problem, it would look like this:

const files = ["data.json", "data2.json", "data3.json"];

// weird double arrow function because we want to create functions
// but we don't want to execute them until later
const functions = files.map(filename => () => download(filename));

const POOL_LIMIT = 2;
await promisePool(functions, POOL_LIMIT);

 We can use async/await syntax to greatly simplify the code from approach 1.

We can define a recursive function evaluateNext that:

Immediately returns if there are no functions to execute (the base case).
Removes the first function from the list of functions (using Array.shift).
Executes that same first function and waits for its completion.
Recursively calls itself and waits for its own completion. That way as soon as any function finishes, the next function in the queue is processed.
If we just call this code once, it wouldn't work (unless n = 1) because it will execute each function one-at-a-time in series. We need to initially execute evaluateNext n times in parallel to achieve the desired promise pool size. We could do this with a for loop, but that would make it hard to know when all n promises have resolved. Instead we use await Promise.all to execute n promises in parallel and wait for their completion.

On a side note, You may wonder why we can't simply write Array(n).map(evaluateNext) when initially creating the promises. This is because Array(n) creates an array of empty values which can't be mapped over. .fill() adds "real" values of undefined which can be mapped over.

On another side note, it's generally not good practice to mutate arguments within a function as the user of the function may not expect that. In a real implementation, it may be wise to clone the array initially with functions = [...functions];.
 */
