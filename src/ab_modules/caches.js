
/**
 * List the caches names
 * @returns {promise} cache names
 */
export const listCaches = () => {

    return new Promise( (resolve, reject) => {  
       
      caches.keys().then(function(cacheNames) {

        if( cacheNames.length === 0 ) return reject("no caches");

        return resolve(cacheNames);

      });
      
    }) 

}


/**
 * 
 * Get the requests saved ina given cache
 * @param {string} cacheName 
 * @returns {promise} keylist
 */
export const getCachedRequest = cacheName => {

    return new Promise( (resolve, reject) => {  

      caches.open(cacheName).then(function(cache) {
        
        if( cache.length === 0 ) return reject(`no requests in ${cacheName} `);

        cache.keys().then( keyList => {
        
          return resolve(keyList);
          
        });

      });  

    })

}

