const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDb')
    });

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    date: Date,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function exercise1() {
    return await Course
        .find({
            isPublished: true
        })
        .or([{
            price: {
                $gte: 15
            }
        }, {
            name: /.*by.*/i
        }])
        .sort('-price')
        .select('name author price')
}

async function run() {
    const courses = await exercise1();
    console.log(courses);
}

run();