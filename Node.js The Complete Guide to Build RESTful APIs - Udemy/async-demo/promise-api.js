const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('get api from facebook');
        resolve({
            from: 'Facebook',
            link: 'facebook.com',
            address: {
                city: 'cicaheum',
                country: 'indonesia'
            }
        });
    }, 5000);
});
const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('get api from Twitter');
        resolve({
            from: 'Twitter',
            link: 'Twitter.com',
            address: {
                city: 'miami',
                country: 'US'
            }
        });
    }, 2000);
});

//Jika menggunakan `Promise.all()`, salah satu promise ada yg error
//Maka semua promise akan mengembalikan nilai error (tidak ada nilai yg diresolve)
//Gunakan `Promise.race()`, jika ingin mengambil satu data tercepat.
Promise.all([p1, p2]).then(result => {
    console.log(result);
})