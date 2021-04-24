import HttpError from '$lib/HttpError'

export async function getAccessToken(fetch) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": "test@example.com",
        "password": "test1234"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8055/auth/login", requestOptions)
    const result = await response.json()
    /* Return result if successful
    */
    if(response.ok) {
        return result
    } 
    /* Return HttpError if unsuccessful
    */
    else {
        throw new HttpError(response, "Could not retrieve access token at CMS.")
    }
}

export async function getPageItems(fetch, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response = await fetch("http://localhost:8055/items/pages", requestOptions)
    const result = await response.json()

    /* Return result if successful
    */
    if(response.ok) {
        return result;
    }
    /* Return HttpError if unsuccessful
    */ 
    else {
        throw new HttpError(response, "Could not retrieve page items at CMS.")
    }
}

export async function getPageItem(fetch, token, id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response = await fetch(`http://localhost:8055/items/pages/${id}`, requestOptions)
    const result = await response.json()

    /* Return result if successful
    */
    if(response.ok) {
        return result;
    }
    /* Return HttpError if unsuccessful
    */ 
    else {
        throw new HttpError(response, "Could not retrieve page item at CMS.")
    }
}