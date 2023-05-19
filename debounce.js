/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout= setTimeout(()=>{fn(..args)},t);
    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 
 This question asks you to implement the debounce higher-order function. After the debounced function is called, the provided function should be called with the same arguments but with some delay t. However, if the debounced function was called again before t milliseconds have elapsed, the execution of the provided function should be cancelled and the timer reset.

To give a concrete example of debounce in action:

const start = Date.now();
function log() {
  console.log(Date.now() - start);
}

setTimeout(log, 10); // logs: 10
setTimeout(log, 20); // logs: 20
setTimeout(log, 50); // logs: 50
setTimeout(log, 60); // logs: 60
As expected, the log function is called with the delay specified by setTimeout.

However, if we debounce the log function:

const start = Date.now();
function log() {
  console.log(Date.now() - start);
}
const debouncedLog = debounce(log, 20);

setTimeout(debouncedLog, 10); // cancelled
setTimeout(debouncedLog, 20); // logs: 40
setTimeout(debouncedLog, 50); // cancelled
setTimeout(debouncedLog, 60); // logs: 80
In the above example, the function call at t=10ms is cancelled because the call at t=20ms happened within 20ms. The call at t=20ms was delayed by 20ms.

Similarly, the function call at t=50ms is cancelled because the call at t=60ms happened within 20ms. The call at t=60ms was delayed by 20ms.

Use-cases for Debounce
The main use-case is when you don't want the result of some user interaction to effect the user experience.

A classic use-case of debounce is when the user is typing into a search field. If you were to show new results every single time a character was typed, the act of re-rendering the new filtered list could potentially take longer than the time it takes to type another character. This will result in a frustrating delay when the user is typing (something you have probably experienced).

Ideally, what should happen is the function that renders the filtered list is debounced. That way, it only renders AFTER the user is done typing.

Another example would be zooming out on a chart via pinch-and-zoom. More data will need to be downloaded once zoomed out. However, it would be extremely inefficient if a new request was made at 60 frames per second as the user zooms out. Just like in the typing example, you should only query for more data when the user is DONE zooming out.

async function fetchNewData(startDate, endDate) {
  // Request Logic
}
const debouncedFetch = debounce(fetchNewData, 300);

chart.on('zoom', (startDate, endDate) => {
  debouncedFetch(startDate, endDate);
});
The library Lodash has a popular implementation of debounce.

Approach 1: setTimeout + clearTimeout
Every time the debounced function is called, we want to execute fn after some delay. We can use setTimeout to achieve that goal. But we also need to keep a reference to timeout that was returned. That way, we can cancel the execution of fn if the function was called again (via clearTimeout). It's important to note that calling clearTimeout on undefined or a finished timeout will do nothing.
 */
