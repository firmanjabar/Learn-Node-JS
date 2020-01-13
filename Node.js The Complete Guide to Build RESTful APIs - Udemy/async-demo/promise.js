const p = new Promise((resolve, reject) => {
    const cek = true;
    setTimeout(() => {
        if (cek) {
            resolve({
                name: 'firman',
                nim: 'A1C615039'
            });
        } else {
            reject(new Error('Cek is False'));
        }
    }, 2000);
});

p.then(result => {
    console.log('Result:', result);
}).catch(err => {
    console.log('Something err -', err);
})