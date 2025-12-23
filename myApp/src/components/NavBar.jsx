import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { FaBars, FaUserCircle } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const {totalProductsInCart}=useCart()
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  if (!user || location.pathname === "/login") return null;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>

        
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
          DASHBOARD
          </Typography>
          

         
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
            >
              <FaBars size={20} />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
            >
             {user.role!="admin" && <MenuItem onClick={() => navigate("/dashboard")}>
                Dashboard
              </MenuItem>}

             {user.role!="admin" && <MenuItem onClick={() => navigate("/products")}>
                All Products
              </MenuItem>}
              <MenuItem onClick={() => navigate("/cart")}>
                CART 
              </MenuItem>

              {user.role === "admin" ? (
                <MenuItem onClick={() => navigate("/products/add")}>
                  Add Products
                </MenuItem>
              ) : (
                <MenuItem disabled>Admin Only</MenuItem>
              )}
            </Menu>
          </Box>

        
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
           {user.role!="user" && <Button color="inherit" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>}

           {user.role!="user" && <Button color="inherit" onClick={() => navigate("/products")}>
              All Products
            </Button>}
            {user.role!="admin" && <Button color="inherit" onClick={() => navigate("/cart")}>
            <Typography variant="h5">CART <sup>{totalProductsInCart}</sup></Typography>
           
            </Button>}

            {user.role === "admin" ? (
              <Button color="inherit" onClick={() => navigate("/products/add")}>
                Add Products
              </Button> 
            ) : (
              <Button color="inherit" disabled>
                Admin Only
              </Button>
            )}
          </Box>

        
          <Box>
            <Tooltip title={user.name}>
              <IconButton
                color="inherit"
                onClick={(e) => setAnchorElUser(e.currentTarget)}
              >
                <FaUserCircle size={22} />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem disabled>{user.name}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
