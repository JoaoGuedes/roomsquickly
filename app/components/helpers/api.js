/**
 * Useful functions
 */

export const _fetch = (url) => {
    return fetch(url)
        .then((data) => {
            if (data.status >= 400) {
                return { error: data.statusText };
            }
            return data.json();
        })
        .catch((error) => ({ error }));
};