import React, { useState, useEffect } from "react";
import { getPosts } from "../api/PostApi";
import { deletePost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState([]);

  const getPostsData = async () => {
    try {
      const response = await getPosts();
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleDeletePost = async (id) => {
    const response = await deletePost(id);
    if (response.status === 200) {
      const newUpdatedPosts = data.filter((curPost) => curPost.id !== id);
      setData(newUpdatedPosts);
    } else {
      console.error("Failed to delete post:", response.statusText);
    }
  };

  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <>
      <section className="posts-header">
        <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
      </section>
      <section className="posts">
        <ol className="posts-grid">
          {data.map((curElem, index) => {
            const { id, title, body } = curElem;
            return (
              <li className="post-card" key={`${id}-${index}`}>
                <h2>{title}</h2>
                <p>{body}</p>
                <div className="post-buttons">
                  <button 
                  className="edit-btn"
                  onClick={() => handleUpdatePost(curElem)}
                  >Edit</button>
                  <button
                    className="del-btn"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
