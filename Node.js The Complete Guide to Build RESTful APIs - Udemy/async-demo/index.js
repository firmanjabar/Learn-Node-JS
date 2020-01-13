console.log('before');
getUser(1, (user) => {
    console.log('User', user);

    getRepo(user.username, (repo) => {
        console.log('Username:', user.username);
        console.log('Repositories:', repo);
    });
});
console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('get data from database');
        callback({
            id: id,
            username: 'firman'
        });
    }, 2000);
}

function getRepo(username, callback) {
    setTimeout(() => {
        console.log(`get repositories from ${username}`);
        callback(['Repo1', 'Repo2', 'Repo3']);
    }, 2000);
}