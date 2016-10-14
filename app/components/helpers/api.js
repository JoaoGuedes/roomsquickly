/**
 * Useful functions
 */
export const _fetch = (url) => {
    return fetch(url)
        .then((data) => {
            if (data.status >= 400) {
                let error = new Error(data.statusText);
                error.status = data.status;
                return { error };
            }
            return data.json().then((data) => ({ data }));
        })
        .catch((error) => ({ error }));
};
