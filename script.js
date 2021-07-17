let user = {
    name: 'Jhonah',
    age: 29,
};

async function showAvatar() {
    let gitHubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let gitHubUser = await gitHubResponse.json();

    let img = document.createElement('img');
    img.src = gitHubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    img.remove()

    return gitHubUser;
}

showAvatar();//.then(alert("after async/await"));