var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
  }
);

// Virtual for category's URL
CategorySchema
.virtual('url')
.get(function () {
  return '/category/' + this._id;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);