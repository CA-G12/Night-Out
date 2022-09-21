const checkResponse = response => {
    if (response.status !== 200) {
        console.log(`Error with the request! ${response.status}`);
        return;
    }
    return response.json();
};

export const getData = () => {
    return fetch(`https://yts.mx/api/v2/list_movies.json`)
        .then(checkResponse)
        .catch(err => {
            throw new Error(`fetch getData failed ${err}`);
        });
};