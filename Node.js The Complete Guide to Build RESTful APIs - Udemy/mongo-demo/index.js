const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(err => {
        console.error('Cant connect to mongodb', err)
    });

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
        // name: 'ReactJS Tutorial',
        author: 'Carson Fanicos',
        tags: ['frontend', 'spa'],
        isPublish: true
    })

    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
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
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Carson Fanicos',
            isPublish: true
        }
    }, {
        new: true
    });
    console.log(course);
}

async function removeCourse(id) {
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

createCourse();
// removeCourse('5e1eb3496972bb0a5c85cdeb');