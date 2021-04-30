const mongoose = require('mongoose');

//quiz database model
var QuizSchema = mongoose.Schema({
    quizID: {type: Number, unique: true},
    question: {type: String, require: true},
    answer1: {type: String, require: true},
    answer2: {type: String, require: true}
});

var Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;