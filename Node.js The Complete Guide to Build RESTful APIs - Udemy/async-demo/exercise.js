// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendTopMoviesToEmail() {
  try {
    const cust = await getCustomer(1);
    console.log('Customer: ', cust);
    if (cust.isGold) {
      const mov = await getTopMovies();
      console.log('Top movies: ', mov);
      await sendEmail(cust.email, mov);
      console.log('Email sent...');
    }
  } catch (err) {
    console.log(err);
  }
}
sendTopMoviesToEmail();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Firman Abdul Jabar',
        isGold: true,
        email: 'firmanabduljabar@gmail.com'
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}