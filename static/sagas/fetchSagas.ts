export function* post(url: string, body?: Object) {
    const fetchUrl = BACKEND_HOST ? BACKEND_HOST + url : url;
    const response = yield fetch(fetchUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.error(response.statusText);
    }
}
