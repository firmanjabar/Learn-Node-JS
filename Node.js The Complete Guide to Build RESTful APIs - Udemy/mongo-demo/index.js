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
    //operator for queries:
    //eq = equal
    //ne = not equal
    //gt = greater than
    //gte = greater than or equal
    //lt = less than
    //lte = less than or equal
    //in = digunkan untuk mencari beberapa data misal: harga $10,$20 dan $30
    //nin = not in
    const courses = await Course
        // .find({
        //     author: 'Firman Abdul Jabar',
        //     isPublish: true
        // })

        //mencari harga lebih dari sama dengan $10
        .find({
            price: {
                $gte: 10
            }
        })

        //mencari harga $10 s.d. $30
        .find({
            price: {
                $gte: 10,
                $lte: 30
            }
        })

        //in = digunkan untuk mencari beberapa data misal: harga $10,$20 dan $30
        .find({
            price: {
                $in: [10, 20, 30]
            }
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