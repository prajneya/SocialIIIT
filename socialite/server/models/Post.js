const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  body: String,
  email: String,
  createdAt: String,
  answers: [
    {
      body: String,
      email: String,
      upvotes: [
        {
          email: String,
          createdAt: String
        }
      ],
      downvotes: [
        {
          email: String,
          createdAt: String
        }
      ],
      createdAt: String
    }
  ],
  reports: [
    {
      body: String,
      email: String,
      createdAt: String
    }
  ],
  upvotes: [
    {
      email: String,
      createdAt: String
    }
  ],
  downvotes: [
    {
      email: String,
      createdAt: String
    }
  ],
  tags: [
    {
      tag: String
    }
  ]
});

module.exports = model('Post', postSchema);