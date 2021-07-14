function loadJson(url) {
    return fetch(url)
        .then(response => response.json());
}

function loadGitHubUser(name) {
    return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
}

let user = {
    name: 'Jhonah',
    age: 29,
};

function showAvatar(gitHubUser) {
    return new Promise(function (resolve, reject) {
        let img = document.createElement('img');
        img.src = gitHubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove()
            resolve(gitHubUser);
        }, 3000);
    });        
}

//loadJson('/article/promise-chaining/user.json')
    //.then(user => loadGitHubUser(user.name))
loadGitHubUser(user.name)
    .then(showAvatar) // (gitHubUser => showAvatar(gitHubUser))   
    .then(gitHubUser => alert(`Закончили показ ${gitHubUser.name}`));
    //... и так далее, другие .then