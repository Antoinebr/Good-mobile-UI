/**
 * Get content from wordpress via REST Api
 */
import he from 'he';


export const getCategories = async () => {

    const data = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/categories`);

    if (!data.ok) throw new Error(`Can't fetch the Categories `);

    const json = await data.json();

    return json.filter(c => c.slug !== "uncategorized" && c.count > 0 && c.slug !== "non-classe");

}


export const getTags = async () => {

    const data = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/tags?per_page=100`);

    if (!data.ok) throw new Error(`Can't fetch the Tags `);

    const json = data.json();

    return json;

}


export const getScreenshots = async (type = 'categories', content) => {

    const data = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/media?${ type }=${ content.id }&per_page=100`);

    if (!data.ok) throw new Error(`Can't fetch the screenshot of type : ${type} and content.id : ${ content.id } `);

    const json = data.json();

    return json;

}


export const getScreenshot = async id => {

    const data = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/media?include=${ id }`)

    if (!data.ok) throw new Error(`Can't fetch the screenshot with id : ${id} `);

    const json = data.json();

    return json;

}


export const getScreenshotBySlug = async slug => {

    const data = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/media?slug=${ slug }`);

    if (!data.ok) throw new Error(`Can't fetch the screenshot with slug : ${slug} `);

    const json = data.json();

    return json;

}


export const registerUser = async userInfos => {

    const { username, email, password } = userInfos;

    const res = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/create/user/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    if (!res.ok) {

        const { message } = await res.json();

        throw new Error(message);
    }

    const json = await res.json();

    return json;
}


export const login = async credentials => {

    const { username, password } = credentials;

    if (typeof login === "undefined") {
        throw new Error('login can\'t be empty');
    }

    if (typeof password === "undefined") {
        throw new Error('password can\'t be empty');
    }

    const res = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/jwt-auth/v1/token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!res.ok) {
        console.log(await res.json());
        throw new Error(`${await res.json()}`);
    }

    const json = await res.json();

    console.log(json);
    const { token } = json;

    if (typeof token === "undefined") {
        throw new Error(`We didn't get a valid JWT we got : ${JSON.stringify(json, null, 2)}`);
    }

    return token;

}


export const updateScreenshotInfos = async infos => {

    const { id, caption, title } = infos;

    if (typeof caption === "undefined") {
        throw new Error('Caption can\'t be empty');
    }

    const res = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/media/${id}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            caption,
            title
        })
    });

    const json = await res.json();

    return json;

}



export const getCurrentUserInfo = async () => {

    const res = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });

    if (!res.ok) {
        console.log(await res.json());
        throw new Error(`${await res.json()}`);
    }

    const json = await res.json();

    return json; 
}


export const getUserScreenshot = async () => {


    const {id} = await getCurrentUserInfo();

    const res = await fetch(`${process.env.VUE_APP_API_URL}/wp-json/wp/v2/media?author=${id}`);

    const json = await res.json();

    json.map(file => {

        if (!file.title.raw) {
            file.title.raw = he.decode(file.title.rendered.replace(/(<([^>]+)>)/ig, ""));
        }

        if (!file.caption.raw) {
            file.caption.raw = he.decode(file.caption.rendered.replace(/(<([^>]+)>)/ig, ""));
        }

        file.isEditing = false;

        return file

    });

    return json;

}