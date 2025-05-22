import React, { useState, useEffect } from "react";
import { getPosts, deletePost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  // State to store all posts data fetched from the API
  const [data, setData] = useState([]);

  // State to store filtered posts data based on search query
  const [filteredData, setFilteredData] = useState([]);

  // State to store data of the post being updated
  const [updateDataApi, setUpdateDataApi] = useState([]);

  // State to store the current search query entered by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch posts data from the API
  const getPostsData = async () => {
    try {
      const response = await getPosts(); 
      setData(response.data); 
      setFilteredData(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error); 
    }
  };

  // Function to delete a post by its ID
  const handleDeletePost = async (id) => {
    const response = await deletePost(id); 
    if (response.status === 200) {
      const newUpdatedPosts = data.filter((curPost) => curPost.id !== id); 
      setData(newUpdatedPosts); 
      setFilteredData(newUpdatedPosts); 
    } else {
      console.error("Failed to delete post:", response.statusText); 
    }
  };

  // Function to set the data of the post being updated
  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  // Function to handle search input changes and filter posts
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase(); 
    setSearchQuery(query); 

    const filtered = data.filter((post) =>
      post.title.toLowerCase().includes(query) // Filter posts based on title
    );
    setFilteredData(filtered); 
  };

  // Fetch posts data when the component mounts
  useEffect(() => {
    getPostsData();
  }, []);

  // Update filtered data whenever data or search query changes
  useEffect(() => {
    const filtered = data.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filtered); 
  }, [data, searchQuery]);

  return (
    <>
      <section className="posts-header">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>

      <section className="posts-search">
        <form className="form">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </section>

      <section className="posts">
        <ol className="posts-grid">
          {filteredData.map((curElem, index) => {
            const { id, title, body } = curElem;
            return (
              <li className="post-card" key={`${id}-${index}`}>
                <h2>{title}</h2>
                <p>{body}</p>
                <div className="post-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleUpdatePost(curElem)}
                  >
                    Edit
                  </button>
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
