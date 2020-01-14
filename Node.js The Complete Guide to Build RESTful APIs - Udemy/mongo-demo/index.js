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
        // .find({
        //     author: 'Firman Abdul Jabar',
        //     isPublish: true
        // })

        //REGEX
        //starts with Firman
        .find({
            author: /^Firman/
        })
        //end with Jabar
        .find({
            author: /Jabar$/
        })
        //contain "Abdul" and add "i" for case insensitif
        .find({
            author: /.*Abdul.*/i
        })
        .limit(10).sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        })
    console.log(courses);
}

getCourses();