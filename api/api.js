/**
 * Get content from wordpress via REST Api
 */



export const getCategories = async () => {

    const data = await fetch(`${API_URL}/wp-json/wp/v2/categories`);

    if( ! data.ok ) throw new Error(`Can't fetch the Categories `);

    const json = await data.json();

    return json.filter( c =>  c.slug !== "uncategorized" && c.count > 0  && c.slug !== "non-classe" );

}


export const getTags = async () => {

    const data = await fetch(`${API_URL}/wp-json/wp/v2/tags?per_page=100`);

    if( ! data.ok ) throw new Error(`Can't fetch the Tags `);

    const json = data.json();

    return json;
     
}


export const getScreenshots = async (type = 'categories', content) => {

     const data = await fetch(`${API_URL}/wp-json/wp/v2/media?${ type }=${ content.id }&per_page=100`);

     if( ! data.ok ) throw new Error(`Can't fetch the screenshot of type : ${type} and content.id : ${ content.id } `);

     const json = data.json();

     return json;

}


export const getScreenshot = async id => {

    const data = await fetch(`${API_URL}/wp-json/wp/v2/media?include=${ id }`)

    if( ! data.ok ) throw new Error(`Can't fetch the screenshot with id : ${id} `);

    const json = data.json();

    return json;

}


export const getScreenshotBySlug = async slug => {

 
     const data = await fetch(`${API_URL}/wp-json/wp/v2/media?slug=${ slug }`);

     if( ! data.ok ) throw new Error(`Can't fetch the screenshot with slug : ${slug} `);
 
     const json = data.json();
 
     return json;

}
