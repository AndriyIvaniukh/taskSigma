const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
    let [resource, config] = args;

    await window.fetch('http://localhost:5000/prebidInfo', {
        method: 'POST',
        body: JSON.stringify({'requestLink': resource}),
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
    return await originalFetch(resource, config);
}
