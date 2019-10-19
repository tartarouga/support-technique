var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tech', { useNewUrlParser: true }, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('connected to database...')
    }
});