import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Avatar } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
const AdminNavbar = () => {
  // Fetch admin from localStorage
  const admin = JSON.parse(localStorage.getItem("Admin"));

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div">
          Welcome, {admin?.firstname || "Admin"}
        </Typography>
       
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to="/createproduct">
          <Button
            color="inherit"
            startIcon={<AddBoxIcon />}
           
          >
           
            Create Product
          </Button>
     </Link>
          <Button
            color="inherit"
            startIcon={<ListAltIcon />}
            onClick={() => console.log("Navigate to All Orders")}
          >
            All Orders
          </Button>

          <Avatar sx={{ bgcolor: "orange" }}>
            {admin?.firstname?.charAt(0) || "A"}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;


