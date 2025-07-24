import { useState, useEffect } from "react";
import { postData } from "../api/PostApi";
import { putData } from "../api/PostApi";
const Form = (props) => {
  // we are using useState hook to manage the form data
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  let isEmpty = Object.keys(props.updateDataApi).length === 0;
  // get the updated data and add it to input field
  useEffect(() => {
    props.updateDataApi &&
      setFormData({
        title: props.updateDataApi.title || "",
        body: props.updateDataApi.body || "",
      });
  }, [props.updateDataApi]);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      // console.log(prev);
      return {
        ...prev,
        // name is the field name and value is the field value
        [name]: value,
      };
    });
  };
  const addPostData = async () => {
    try {
      const res = await postData(formData);
      console.log(res);
      if (res.status === 201) {
        props.setData([...props.data, res.data]);
        setFormData({
          title: "",
          body: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updatePostData = async () => {
    try {
      const res = await putData(formData, props.updateDataApi.id);
      console.log(res);
      if (res.status === 200) {
        props.setData((prev) => {
          return prev.map((currData) => {
            if (currData.id === res.data.id) {
              return res.data;
            }
            return currData;
          });
        });
        setFormData({
          title: "",
          body: "",
        });
        props.setUpdateDataApi({});
      }
    } catch (err) {
      console.log(err);
    }
  };
  // submit form data
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else {
      updatePostData();
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={formData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
