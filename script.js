let user = {
    name: 'Jhonah',
    age: 29,
};

fetch(`https://api.github.com/users/${user.name}`)
.then(response => response.json())
.then(gitHubUser => new Promise((resolve,reject)=>{
    let img = document.createElement('img');
    img.src = gitHubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
        img.remove()
        resolve(gitHubUser);
    }, 3000);
}))
.then(alert("before async/await"));