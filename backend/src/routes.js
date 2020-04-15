const express = require ('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');


const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/' , (req, res)=>{
    return res.json({message: "Hello InstagramClone! Bem-vindo!!"})
})

routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

module.exports = routes;