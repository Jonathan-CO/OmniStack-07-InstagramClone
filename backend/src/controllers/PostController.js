const Post = require('../models/Post');
// const sharp = require('sharp'); 
// So, using jimp... 
const jimp = require('jimp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index (req, res){
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res){
        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;
        
        jimp.read(req.file.path, (err, img)=>{
            if(err) {
                console.log("Erro ao carregar a imagem")
                return res.json({error: "Erro ao carregar a imagem"})
            }
            // image.resize(500);
            const image_w = img.getWidth();
            const image_h = img.getHeight();
            
            (image_h > image_w) ? img.resize(jimp.AUTO, 500) : img.resize(500, jimp.AUTO);
            img.quality(80);
            img.write(path.resolve(req.file.destination, 'resized', image))

        });

        fs.unlinkSync(req.file.path);

        // await sharp(req.file.path)
        // .resize(500)
        // .jpeg({quality: 70})
        // .toFile(
        //     path.resolve(req.file.destination, 'resized', image)
        // )

        const post = await Post.create({
            author, 
            place, 
            description, 
            hashtags,
            image
        });

        req.io.emit('post', post);

        return res.json(post);
    }
}
