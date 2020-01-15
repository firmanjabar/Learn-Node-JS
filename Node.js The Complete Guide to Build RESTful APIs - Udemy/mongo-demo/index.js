const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(err => {
        console.error('Cant connect to mongodb', err)
    });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublish: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'NodeJS Tutorial',
        author: 'Firman Abdul Jabar',
        tags: ['backend', 'ssr'],
        isPublish: true
    })

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({
            author: 'Firman Abdul Jabar',
            isPublish: true
        })
        .limit(10).sort({
            name: 1
        })
        .count()
    console.log(courses);
}

async function getUpdateCourse(id) {
    const course = await Course.findById(id);
    course.set({
        name: 'ReactJS Tutorial',
        author: 'Carson Fanicos'
    });

    const result = await course.save();
    console.log(result);
}

getUpdateCourse('5e1d1bd01c9a825968fa64fa');