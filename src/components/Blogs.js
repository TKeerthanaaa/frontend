import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog.js";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      const data = res.data;
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        setBlogs(data.blogs);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          description={blog.description}
          userName={blog.userName}
          imageURL={blog.image}
        />
      ))}
    </div>
  );
};

export default Blogs;
