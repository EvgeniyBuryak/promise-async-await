let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
];

if (!Promise.allSettled) { // Полифил для старых браузеров 
    Promise.allSettled = function (promises) {
        return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
            status: 'fulfilled',
            value: value
        }), error => ({
            status: 'rejected',
            reason: error
        }))));
    };
}

Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
        results.forEach((result, num) => {
            if (result.status == "fulfilled") {
                alert(`${urls[num]}: ${result.value.status}`);
            }
            if (result.status == "rejected") {
                alert(`${urls[num]}: ${result.reason}`);
            }
        });
    });