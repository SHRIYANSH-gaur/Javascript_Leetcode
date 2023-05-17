/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
	return async function(...args) {
        
        return new Promise(async(res, rej)=>{
            const timeout = setTimeout(()=>{
                rej("Time Limit Exceeded");
            }, t);
            
            try{
                const result= await fn(...args);
                res(result);
            }
            catch(err){
                rej(err);
            }
            clearTimeout(timeout);
        });
        
    };
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 
 This question asks you to enhance an asynchronous function such that the promise it returns will automatically reject if the time limit elapses.

It is recommended you first read the Sleep Editorial as it covers topics on asynchronous programming not discussed here. You may also want to read up on the topic of functions that returns functions: Allow One Function Call Editorial and Memoize Editorial.

Use-cases for Time Limit
Long Running Processes
You may have code which repeats over and over again. A common example of this would be loading data into a cache and keeping it in sync with the data source.

async function repeatProcessIndefinitely() {
  while (true) {
    try {
      await someProcess();
    } catch (e) {
      console.error(e);
    }
  }
}
If someProcess were to ever never fulfill, the loop would get frozen and nothing would happen. Forcing someProcess to throw an error would unfreeze the process.

An important consideration is that code in someProcess can still continue executing even if the promise was rejected. So you might have multiple blocks of code executing in parallel. A better solution may be fix the underlying issue which caused the freeze or to implement proper cancellation. Consider solving Design Cancellable Function to implement true cancellation.

To force the promise someProcess() returns to reject after an hour:

const ONE_HOUR_IN_MS = 3600 * 1000;
const timeLimitedProcess = timeLimit(someProcess, ONE_HOUR_IN_MS);
Notify Users of Failure
Imagine a user requested to download a file which you expect should take less than 10 seconds to download. If the download is taking too long, rather than let the user wait, it may be better to just give up and show the user an error message.

Similar to the first use-case, this really should only be done as a last resort. It's likely better to implement a loading indicator and/or fix the underlying issue causing the slowness.
 */
