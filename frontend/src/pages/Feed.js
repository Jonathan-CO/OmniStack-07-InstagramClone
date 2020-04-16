import React from 'react';
import './Feed.css'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

function Feed (){
    return (
        <section id="post-list">
            <article>
                <header>
                    <div className="user-info">
                        <span> Jonathan da Cunha</span>
                        <span className="place"> Diamantina </span>
                    </div>

                    <img src={more} alt="Mais"/>
                </header>

                <img src="http://localhost:3333/files/precasamento.png" alt=""/>
                <footer>
                    <div className="actions">
                        <img src={like} alt=""/>
                        <img src={comment} alt=""/>
                        <img src={send} alt=""/>
                    </div>

                    <strong>900 cutidas</strong>
                    <p> Pre-casamento Jonathan & Delaine
                        <span>#precasamento</span>
                    </p>
                </footer>
            </article>

            <article>
                <header>
                    <div className="user-info">
                        <span> Jonathan da Cunha</span>
                        <span className="place"> Diamantina </span>
                    </div>

                    <img src={more} alt="Mais"/>
                </header>

                <img src="http://localhost:3333/files/precasamento.png" alt=""/>
                <footer>
                    <div className="actions">
                        <img src={like} alt=""/>
                        <img src={comment} alt=""/>
                        <img src={send} alt=""/>
                    </div>

                    <strong>900 cutidas</strong>
                    <p> Pre-casamento Jonathan & Delaine
                        <span>#precasamento</span>
                    </p>
                </footer>
            </article>
        </section>
    )
}

export default Feed;