import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "../axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { getImageUrl } from "../utils/imageHelper";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Scroll to top when component mounts or postId changes
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="single-container">
        <article className="single-content">
          <div className="post-card-detail">
            <div className="card-inner">
              {post?.img && (
                <div className="post-header-image">
                  <img src={getImageUrl(post.img)} alt={post.title} />
                </div>
              )}
              <div className="post-body">
                <div className="post-meta">
                  <div className="user-info">
                    {post.userImg && (
                      <img
                        src={post.userImg}
                        alt={post.username}
                        className="user-avatar"
                      />
                    )}
                    <div className="user-details">
                      <span className="username">{post.username}</span>
                      <p className="post-date">Posted {moment(post.date).fromNow()}</p>
                    </div>
                  </div>
                  {currentUser && currentUser.username === post.username && (
                    <div className="post-actions">
                      <Link to={`/write?edit=2`} state={post} className="action-btn">
                        <img src={Edit} alt="Edit" />
                      </Link>
                      <button onClick={handleDelete} className="action-btn delete">
                        <img src={Delete} alt="Delete" />
                      </button>
                    </div>
                  )}
                </div>
                <h1 className="post-title">{post.title}</h1>
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </article>
        <Menu cat={post.cat}/>
      </div>
    </div>
  );
};

export default Single;
