console.log('before');
getUser(1, getRepos);
console.log('after');

function getRepos(user) {
    console.log('User', user);
    getRepo(user.username, getComm);
}

function getComm(repo) {
    console.log('Repositories:', repo);
    getCommits(repo, displayCommits);
}

function displayCommits(commit) {
    console.log('Commits:', commit);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('get data from database');
            resolve({
                id: id,
                username: 'firman'
            });
        }, 2000);
    });
}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`get repositories from: ${username}`);
            resolve(['Repo1', 'Repo2', 'Repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`get commit from: ${repo[0]}`);
            resolve(['Commit1', 'Commit2', 'Commit3']);
        }, 2000);
    });
}