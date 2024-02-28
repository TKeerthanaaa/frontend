import React, { useState } from "react";
import { AppBar, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(110,29,86,1) 0%, rgba(21,52,112,1) 50%, rgba(47,120,148,1) 100%)",
        }}
      >
        <Toolbar>
          <img
            className="postImg"
            src="https://graphicsfamily.com/wp-content/uploads/edd/2021/11/Letter-K-Gradient-Logo-Design-1180x664.jpg"
            alt=""
          />
          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab LinkComponent={NavLink} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={NavLink} to="/myBlogs" label="My Blogs" />
                <Tab LinkComponent={NavLink} to="/blogs/add" label="Add Blog" />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={NavLink}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10, background: "#3949ab" }}
                >
                  Login
                </Button>
                <Button
                  LinkComponent={NavLink}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10, background: "#3f51b5" }}
                >
                  Signup
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispath(authActions.logout())}
                LinkComponent={NavLink}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: "#3f51b5" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Home /> */}
    </>
  );
};

export default Header;
