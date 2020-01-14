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

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'NodeJS Tutorial',
        author: 'Firman Abdul Jabar',
        tags: ['backend', 'ssr'],
        isPublish: true
    })

    const result = await course.save();
    console.log(result);
}

createCourse();