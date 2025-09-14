
export const contactAPI = {
    /**
     * Sends a GET request to the specified URL.
     * Returns a promise that resolves to a JSON object.
     * Catches any errors and logs them to the console.
     *
     * @param {string} url - The URL to send the GET request to.
     *
     * @returns {Promise<object>} - A promise that resolves to a JSON object.
     */
    get: (url) => {
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    }
};
