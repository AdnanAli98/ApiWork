import { useEffect, useState } from "react";
import { addPost } from "../api/PostApi";
import { updatePost } from "../api/PostApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isEmpty = !updateDataApi || Object.keys(updateDataApi).length === 0;

  const addPostData = async (e) => {
    e.preventDefault();
    const response = await addPost(addData);
    if (response.status >= 200) {
      setData([...data, response.data]);
      setAddData({ title: "", body: "" });
    } else {
      console.error("Failed to add post:", response.statusText);
    }
  };

  const UpdatePostData = async () => {
    try {
      const response = await updatePost(updateDataApi.id, addData);
      console.log(response); 
      setData((prev) => {
        return prev.map((curElem) => {
          return curElem.id === updateDataApi.id ? response.data : curElem;
        });
      });
      setAddData({ title: "", body: "" });
      setUpdateDataApi({});  
      alert("Post updated successfully!");   
    } catch (error) {
      console.log("Failed to update post:", error);
    }
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Update Post") {
      UpdatePostData();
    } else {
      addPostData(e);
    }
  };
  

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={addData.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="body"
        id="body"
        placeholder="Description"
        value={addData.body}
        onChange={handleInputChange}
        required
      />
      <button type="submit" value={isEmpty ? "Add Post" : "Update Post"}>
        {isEmpty ? "Add Post" : "Update Post"}
      </button>
    </form>
  );
};

export default Form;
