export function* post(url: string, body?: Object) {
    const response = yield window.fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
    });
    if (!response.ok) {
        console.error(response.statusText);
    }
}
