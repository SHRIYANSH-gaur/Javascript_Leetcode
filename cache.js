
var TimeLimitedCache = function() {
    this.cache= new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    
    const val=this.cache.get(key);
    if(val){
        clearTimeout(val.timeout);
    }
    const timeout= setTimeout(()=> this.cache.delete(key),duration);
    this.cache.set(key, {value,timeout});
    return Boolean(val);
    
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.cache.size;  
};

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 Use-case for a Cache with a Time Limit
Imagine you are maintaining a cache of files from a database. You could load each file once and keep it in memory indefinitely. The issue is if a file is updated in the database, the cache will contains out-of-date data. Another option is to constantly re-download the files every time a file is accessed (or at least send a request asking if it changed). But this could be inefficient and slow, especially if the files change infrequently.

If it is acceptable for the data to sometimes be a little out of date, a good compromise is to give the data a Time Until Expiration. This provides a good balance between performance and having up-to-date data. This type of cache is most effective when the same key is accessed in rapid succession.

Here is some code showing how to use this type of cache for that purpose:

const cache = new TimeLimitedCache();

async function getFileWithCache(filename) {
  let content = cache.get(filename);
  if (content !== -1) return content;
  content = await loadFileContents(filename);
  const ONE_HOUR = 60 * 60 * 1000;
  cache.set(filename, content, ONE_HOUR);
  return content;
}
In the above code, getFileWithCache first tries to load the data from the cache. If there was a cache-hit, it immediately returns the result. Otherwise it downloads the data and populates the cache before returning the downloaded data.

Approach 1: setTimeout + clearTimeout + Class Syntax
Every time a key-value pair is placed in the cache, we can also create a timer that deletes that key after the expiration time has elapsed. However, we need to be careful with this approach because what happens if we overwrite an existing key before the time expires? It will cause the new key to get prematurely deleted. For this reason, we need to maintain a reference to the timer so we can clear it if the key gets overwritten.

When a new instance of TimeLimitedCache is created, a new Map is created. Note that the constructor function is omitted here. Alternatively, we could have put this.cache = new Map(); in the constructor and it would have resulted in identical behavior.
In the set method, we get the associated value for the key. If the key doesn't exist valueInCache is undefined. If valueInCache in NOT undefined, we cancel the timer that was supposed to delete the old key so it doesn't delete the new key. We then create a new timer that will delete the new key. Finally, we store both the value and a reference to the timer in the Map and return if the value was found or not.
In the get method, we use a ternary expression to return value if it exists or -1 if it doesn't.
In the count method, we simply return the size of the Map. Since, all the keys are deleted as soon as they expire, we know this value is accurate.

 */
