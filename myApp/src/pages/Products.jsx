import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();
  const [category, setCategory] = useState();
  const [sort, setSort] = useState();
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(Infinity);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchProducts() {
  
    let url = "https://inventory-management-system-backend-qi6b.onrender.com/products?";

    if (search) url += `search=${search}&`;
    if (category && category !== "all") url += `category=${category}&`;
    if (sort) url += `sort=${sort}&`;
    if (pages) url += `page=${pages}&`;
    if (limit) url += `limit=${limit}&`;

    try {
      const res = await axios.get(url);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handlePage(val) {
    if (val === "next") setPages(pages + 1);
    if (val === "prev") setPages(pages - 1);
  }

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, pages, limit]);

  if (loading) return <div className="loader"></div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="products-text">Products</h2>

      <div className="search-container" style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothes">Clothes</option>
          <option value="home">Home</option>
          <option value="mobile">Mobiles</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
          <option value="name_asc">Name A → Z</option>
          <option value="name_desc">Name Z → A</option>
        </select>

        <select onChange={(e) => setLimit(e.target.value)}>
          <option value="none">Products Per Page</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>

        {/* <button
          disabled={pages === totalPages}
          onClick={() => handlePage("next")}
        >
          Next
        </button>

        <span>{`${pages} of ${totalPages}`}</span>

        <button disabled={pages === 1} onClick={() => handlePage("prev")}>
          Prev
        </button> */}
      </div>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 900,
          margin: "20px auto",
          borderRadius: 2,
          maxHeight: 500, 
          overflow:"auto",
          boxShadow:"0px 4px 8px 0px #8F8F8F",
          "@media(max-width:600px)":{
            maxWidth:"100%",
            margin:"10px auto"
          }
        }}
      >
        <Table stickyHeader aria-label="products table">
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "white",
                zIndex: 10,
                position: "sticky",
                top: 0,
                fontSize:{xs:"12px",sm:"14px"},
                padding:{xs:"6px",sm:"10px"}
              },
            }}
          >
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Category</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Stock</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 ? (
              products.map((item) => (
                <TableRow
                  key={item._id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/products/${item._id}`)}
                >
                  <TableCell sx={{fontSize:{xs:"12px",sm:"14px"}}}>{item.name}</TableCell>
                  <TableCell sx={{fontSize:{xs:"12px",sm:"14px"}}}>{item.category}</TableCell>
                  <TableCell sx={{fontSize:{xs:"12px",sm:"14px"}}}>₹{item.price}</TableCell>
                  <TableCell sx={{fontSize:{xs:"12px",sm:"14px"}}}>{item.stock}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No Products Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Stack spacing={2} sx={{ alignItems: "center", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={pages}
          onChange={(e, value) => setPages(value)} 
          color="primary"
          size="medium"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </div>
  );
};

export default Products;
