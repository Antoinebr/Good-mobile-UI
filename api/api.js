/**
 * Get content from wordpress via REST Api
 */



export const getCategories =  () => {


    return  fetch(`${API_URL}/wp-json/wp/v2/categories`)
    .then( (response) => response.json() )
    .then( (res) => {

        return  res.filter( c =>  c.slug !== "uncategorized" && c.count > 0  && c.slug !== "non-classe" );

    }).catch( (err) => console.log(res) );
  
}


export const getTags = () => {

    return fetch(`${API_URL}/wp-json/wp/v2/tags?per_page=100`)
    .then( (response) => response.json() )
    .then( (res) => {
  
        return res; 
    
    }).catch( (err) => console.log(res) );
     
}


export const getScreenshots = (type = 'categories', id) => {

    return fetch(`${API_URL}/wp-json/wp/v2/media?${ type }=${ id }&per_page=100`)
    .then( (response) => response.json() )
    .then( (res) => {
      
        return res; 

     }).catch( (err) => console.log(res) );

}


export const getScreenshot = (id) => {

    return fetch(`${API_URL}/wp-json/wp/v2/media?include=${ id }`)
    .then( (response) => response.json() )
    .then( (res) => {
      
        return res; 

     }).catch( (err) => console.log(res) );

}


export const getScreenshotBySlug = (slug) => {

    return fetch(`${API_URL}/wp-json/wp/v2/media?slug=${ slug }`)
    .then( (response) => response.json() )
    .then( (res) => {
      
        return res; 

     }).catch( (err) => console.log(res) );

}
