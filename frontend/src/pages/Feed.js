import React, { useEffect, useState } from 'react';
import api from '../services/api';

import './Feed.css'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

function Feed() {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await api.get('posts')
            setFeed(response.data)
        }
        getPosts();
    }, [])

    async function handleLike(id){
        await api.post(`posts/${id}/like`)
    }

    return (
        <section id="post-list">
            {feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>

                        <img src={more} alt="Mais" />
                    </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt="" />
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={()=>handleLike(post._id)}>
                                <img src={like} alt="" />
                            </button>

                            <img src={comment} alt="" />

                            <img src={send} alt="" />

                        </div>

                        <strong>{post.likes} cutidas</strong>
                        <p> {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            ))}

        </section>
    )
}

export default Feed;