import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/PostApi";
import Form from "./Form.jsx";
import "../App.css";
const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi,setUpdateDataApi] = useState({});
  // get initial data from the API
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log(res);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);
  // we are creating a handler function which deletes the data on clicking delete button
  const handleDeletePost = async (id) => {
    try {
        const res = await deletePost(id);
        if(res.status === 200){
            // if the response is successful then we show that id which is not curr id
            const updatedData = data.filter((currData)=>{
                return currData.id !== id;
            });
            setData(updatedData);
            console.log("Post deleted successfully");
        }else{
            console.log("Failed to delete the post: " + res.status);
        }
    } catch (err) {
      console.log(err);
    }
  };
  // we are creating a handler function to update the data when clicking the edit button
  const handleUpdatePost = async(currData)=>{
    // sole purpose of this step to get the current data of the element we want to update
    setUpdateDataApi(currData);
  }
  // we used map function to display the current data
  return (
    <>
    <section className="section-form">
        <Form 
            data = {data}
            setData={setData}
            updateDataApi={updateDataApi}
            setUpdateDataApi={setUpdateDataApi}
        />
    </section>
    <section className="section-post">
      <ol>
        {data.map((currData) => {
          return (
            <li key={currData.id}>
              <p>Title: {currData.title}</p>
              <p>Body: {currData.body}</p>
              <button
                onClick={()=>handleUpdatePost(currData)}>Edit</button>
              <button
                onClick={() => handleDeletePost(currData.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ol>
    </section>
    </>
  );
};

export default Posts;
