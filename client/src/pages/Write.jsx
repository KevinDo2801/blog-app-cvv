import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getImageUrl } from "../utils/imageHelper";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create preview URL when file is selected
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Cleanup function to revoke the URL
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : null;

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: imgUrl ? imgUrl : state?.img || "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: imgUrl || "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <div className="write-container">
        <div className="write-content">
          <div className="write-card">
            <div className="card-inner">
              <h1 className="write-heading">{state ? "Edit Post" : "Create New Post"}</h1>
              <div className="form-group">
                <label htmlFor="title">Post Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <div className="editor-container">
                  <ReactQuill
                    className="editor"
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="write-sidebar">
          <div className="sidebar-card">
            <div className="card-inner">
              <h2 className="sidebar-title">Publish</h2>
              <div className="sidebar-info">
                <span className="info-label">Status:</span>
                <span className="info-value">Draft</span>
              </div>
              <div className="sidebar-info">
                <span className="info-label">Visibility:</span>
                <span className="info-value">Public</span>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="file-upload-btn" htmlFor="file">
                📎 {file ? "Change Image" : state?.img ? "Change Image" : "Upload Image"}
              </label>
              {file && previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                  <span className="file-name">✓ {file.name}</span>
                </div>
              )}
              {!file && state?.img && (
                <div className="image-preview">
                  <img src={getImageUrl(state.img)} alt="Current" />
                  <span className="file-name">Current image</span>
                </div>
              )}
              <div className="sidebar-actions">
                <button onClick={handleClick} className="btn-primary">Publish</button>
              </div>
            </div>
          </div>
          <div className="sidebar-card">
            <div className="card-inner">
              <h2 className="sidebar-title">Category</h2>
              <div className="category-list">
                <div className="category-item">
                  <input
                    type="radio"
                    checked={cat === "art"}
                    name="cat"
                    value="art"
                    id="art"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="art">Art</label>
                </div>
                <div className="category-item">
                  <input
                    type="radio"
                    checked={cat === "science"}
                    name="cat"
                    value="science"
                    id="science"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="science">Science</label>
                </div>
                <div className="category-item">
                  <input
                    type="radio"
                    checked={cat === "technology"}
                    name="cat"
                    value="technology"
                    id="technology"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="technology">Technology</label>
                </div>
                <div className="category-item">
                  <input
                    type="radio"
                    checked={cat === "cinema"}
                    name="cat"
                    value="cinema"
                    id="cinema"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="cinema">Cinema</label>
                </div>
                <div className="category-item">
                  <input
                    type="radio"
                    checked={cat === "design"}
                    name="cat"
                    value="design"
                    id="design"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
                </div>
                <div className="category-item">
                  <input
                    type="radio"
                    checked={cat === "food"}
                    name="cat"
                    value="food"
                    id="food"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="food">Food</label>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Write;
