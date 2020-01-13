console.log('before');
// getUser(1)
//     .then(user => getRepo(user.username))
//     .then(repo => getCommits(repo))
//     .then(commit => {
//         commit.forEach((comm, index) => {
//             console.log(`Commit ${index+1}:`, comm)
//         });
//     });

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repo = await getRepo(user.username);
        const commit = await getCommits(repo);
        commit.forEach((comm, index) => {
            console.log(`Commit ${index+1}:`, comm);
        });
    } catch (err) {
        console.log(err);
    }
}
displayCommits();

console.log('after');

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
            // reject(new Error('Cant get repos'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`get commit from: ${repo[0]}`);
            resolve(['initial commit', 'add feature login', 'final production']);
        }, 2000);
    });
}