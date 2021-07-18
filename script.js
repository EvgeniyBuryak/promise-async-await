class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    
    let response = await fetch(url);

    if (response.status == 200) {
        let json = await response.json();
        return json;
    }
    
    throw new HttpError(response);        
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {

    let name,
        user,
        isHttpError;

    do {
        try {
            name = prompt("Введите логин?", "iliakan");

            user = await loadJson(`https://api.github.com/users/${name}`);
            alert(`Полное имя: ${user.name}.`);
            isHttpError = false;
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                isHttpError = true;
                
            } else {
                throw err;
            }
        }
    } while (isHttpError)
    
    return user;
}

demoGithubUser();