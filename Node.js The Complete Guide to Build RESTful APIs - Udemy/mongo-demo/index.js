const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => {
    console.error("Cant connect to mongodb", err);
  });

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match: /patterRegex/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "android", "networking"]
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      // (node:4884) DeprecationWarning: Mongoose: the `isAsync` option for custom
      // validators is deprecated. Make your async validators return a promise instead:
      // https://mongoosejs.com/docs/validation.html#async-custom-validators
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const hasil = v && v.length > 0;
          callback(hasil);
        }, 6000);
      },
      message: "A course should have at least one tag!"
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublish: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublish;
    },
    min: 10,
    max: 100
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Bootstrap Tutorial",
    category: "web",
    author: "Emilia Clarke",
    tags: null,
    isPublish: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

async function getCourses() {
  const courses = await Course.find({
    author: "Firman Abdul Jabar",
    isPublish: true
  })
    .limit(10)
    .sort({
      name: 1
    })
    .count();
  console.log(courses);
}

async function getUpdateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Carson Fanicos",
        isPublish: true
      }
    },
    {
      new: true
    }
  );
  console.log(course);
}

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

createCourse();
// removeCourse('5e1eb3496972bb0a5c85cdeb');
