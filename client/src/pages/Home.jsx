import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../axios";
import { getImageUrl } from "../utils/imageHelper";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    // Scroll to top when component mounts or category changes
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className="home">
      <div className="home-content">
        <div className="posts-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="card-inner">
                {post.img && (
                  <div className="post-media">
                    <img src={getImageUrl(post.img)} alt={post.title} />
                  </div>
                )}
                <div className="post-content">
                  {post.cat && (
                    <div className="post-category">{post.cat}</div>
                  )}
                  <Link className="link" to={`/post/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                  </Link>
                  <div className="post-meta">
                    <div className="post-date">
                      <span className="meta-icon">🕒</span>
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <div className="post-excerpt">
                    {getText(post.desc)}
                  </div>
                  <Link className="link" to={`/post/${post.id}`}>
                    <button className="btn-primary">Continue reading →</button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
