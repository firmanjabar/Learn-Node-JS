// unit testing
const p = Promise.resolve({
    id: 1,
    name: 'firman'
})
p.then(user => console.log(user));

const q = Promise.reject(new Error('Write error in here!'))
q.catch(err => console.log(err));