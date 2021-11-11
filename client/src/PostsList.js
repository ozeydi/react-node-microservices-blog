import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostsList = () => {
  const [posts, setposts] = useState({});
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setposts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = Object.values(posts).map((post) => {
    return (
      <div className="card" style={{ width: "30%", marginBottom: "20px"}} key={post.id}>
          <div className="card-body">
              <h3>{post.title}</h3>
              <CommentsList comments={post.comments} />
              <CommentCreate postId={post.id} />
          </div>
      </div>
    );
  });

  return <div className="d-flex flew-row flew-wrap justify-content-between">
      {renderPosts}
    </div>;
};

export default PostsList;
