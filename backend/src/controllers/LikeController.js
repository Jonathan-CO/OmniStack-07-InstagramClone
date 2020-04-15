const Post = require('../models/Post');

module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id);
        if(post){
            post.likes += 1;
            await post.save();

            return res.json(post);
        }
    }
}