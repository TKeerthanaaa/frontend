import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get(`https://long-ruby-jellyfish-tux.cyclic.app/api/blog/user/${id}`)
  //     .catch((err) => console.log(err));

  //   const data = await res.data;
  //   return data;
  // };
  const sendRequest = async () => {
    try {
      const res = await axios.get(
        `https://long-ruby-jellyfish-tux.cyclic.app/api/blog/user/${id}`
      );
      return res.data; // Return the data directly
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      return null;
    }
  };

  // useEffect(() => {
  //   sendRequest().then((data) => setUser(data.user));
  // }, []);
  // console.log(user);
  useEffect(() => {
    sendRequest().then((data) => setUser(data && data.user)); // Handle the promise
  }, []);
  console.log(user);
  return (
    <div>
      {""}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            name={blog.userName}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
