const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create association of One-User-To-Many-Posts
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// create association of Votes as Many-to-Many relationship
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
})

// create association of One User to Many Votes
User.hasMany(Vote, { foreignKey: 'user_id' });
Vote.belongsTo(User, { foreignKey: 'user_id' });

// create association of One Post to Many Votes
Post.hasMany(Vote, { foreignKey: 'post_id' });
Vote.belongsTo(Post, { foreignKey: 'post_id' });



module.exports = { User, Post, Vote };