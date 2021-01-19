const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models')


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
          'id', 
          'post_url', 
          'title', 
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']  
        ],
        include: [
          // includes the Comment model here
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log({posts});
            res.render('homepage', {posts});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;