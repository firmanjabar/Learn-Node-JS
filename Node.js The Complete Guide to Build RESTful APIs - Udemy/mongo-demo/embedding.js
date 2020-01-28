const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

createCourse('React JS', new Author({
  name: 'Firman'
}));

// async function updateAuthor(courseId) {
//   const course = await Course.update(courseId);
//   course.author.name = 'Firman Abdul Jabar';
//   course.save();
// }

// async function updateAuthor(courseId) {
//   const course = await Course.update({
//     _id: courseId
//   }, {
//     $set: {
//       'author.name': 'Firman'
//     }
//   });
//   console.log(course);
// }

async function updateAuthor(courseId) {
  const course = await Course.update({
    _id: courseId
  }, {
    $unset: {
      'author': ''
    }
  });
  console.log(course);
}

// updateAuthor('5e2faed19f244b355028b469');