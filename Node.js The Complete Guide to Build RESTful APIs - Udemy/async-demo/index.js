console.log('before');
const user = getUser(1);
console.log(user);
console.log('after');

function getUser(id) {
    setTimeout(() => {
        console.log('get data from database');
        return {
            id: id,
            username: 'firman'
        }
    }, 2000);
    return id;
}