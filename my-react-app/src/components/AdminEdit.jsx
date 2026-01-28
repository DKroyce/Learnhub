import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { useParams } from "react-router-dom";
import axios from "axios";

// PURE UI VERSION — NO LOGIC, NO STATE, NO API — STATIC UI ONLY
// You can wrap this with form logic later.

export default function AdminEdit() {
  const {prodid}=useParams();

    const [ebook, setEbook] = useState({
    id:  prodid || "",
    title: "",
    description: "",
    author: "",
    price: "",
    discountPrice: "",
    category: "",
    language: "",
    rating: "",
    isFeatured: "",
    thumbnailUrl: "",
    previewUrl: "",
    fileUrl: "",
    publisher:"",
    pages:"",
    isbn:"",
     
  });
    const handleChange = (e) => {
    setEbook({
      ...ebook,
      [e.target.name]: e.target.value,
    });};
    const handleSwitchChange = (e) => {
  setEbook({
    ...ebook,
    [e.target.name]: e.target.checked,
  });
};


  
  useEffect(() => {
  const fetchebooks = async () => {
    try {
      const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response = await axios.get(`http://localhost:8765/admin/ebooks/${prodid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
      setEbook(response.data);
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    }
  };
  fetchebooks();
},[prodid]);
const handleUpdate =async (event) => {
       event.preventDefault();
  
    
    try{
      const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response= await axios.put(`http://localhost:8765/admin/ebooks/${prodid}`, ebook,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      console.log("ebook updated successfully:", response.data);
            alert("ebook updated successfully!");
           
            
    }
    catch(error){  alert("Error updating product: " + error)}
    
};
  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          eBook Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField label="Title" fullWidth margin="dense" name="title" value={ebook.title}
              onChange={handleChange} />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="dense"
              name="description"
              value={ebook.description}
              onChange={handleChange}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Author" fullWidth margin="dense"  name="author" value={ebook.author}
              onChange={handleChange} />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="Price"
                  fullWidth
                  margin="dense"
                   name="price" value={ebook.price}
              onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="Discount Price"
                  fullWidth
                  margin="dense"
                   name="discountPrice" value={ebook.discountPrice}
              onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Category</InputLabel>
                  <Select label="Category"
                   name="category"
    value={ebook.category}
  
    onChange={handleChange}
                  >
                    <MenuItem value="Programming">Programming</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Fiction">Fiction</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Language</InputLabel>
                  <Select label="Language"
                   name="language"
    value={ebook.language}
  
    onChange={handleChange}>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField label="Publisher" fullWidth margin="dense" name="publisher" value={ebook.publisher}    onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="ISBN" fullWidth margin="dense" name="isbn" value={ebook.isbn}    onChange={handleChange}/>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} sm={3}>
                <TextField label="Pages" fullWidth margin="dense" name="pages" value={ebook.pages}    onChange={handleChange}/>
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField label="Rating" fullWidth margin="dense"  onChange={handleChange}   name="rating"
    value={ebook.rating}
   />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel control={<Switch  onChange={handleSwitchChange} name="isFeatured" checked={ebook.isFeatured}/>} label="Featured" />
              </Grid>
            </Grid>

            <TextField label="Thumbnail URL" fullWidth margin="dense" name="thumbnailUrl" value={ebook.thumbnailUrl}    onChange={handleChange} />
            <TextField label="File URL" fullWidth margin="dense" name="fileUrl" value={ebook.fileUrl}    onChange={handleChange} />

            

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" onClick={handleUpdate}>Update</Button>
              
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }} variant="outlined">
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Thumbnail Preview
              </Typography>

            {ebook.thumbnailUrl ? (
  <Box
    sx={{
      height: 180,
      borderRadius: 1,
      backgroundImage: `url(${ ebook.thumbnailUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />
) : (
  <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 1 }}>
    <Typography variant="caption">No thumbnail selected</Typography>
  </Box>
)}
              <Box sx={{ mt: 2, textAlign: "left" }}>
                <Typography variant="subtitle2">Meta</Typography>
                <Typography variant="body2">ID: {ebook.id}</Typography>
                <Typography variant="body2">createdAt: {ebook.createdAt}</Typography>
                <Typography variant="body2">updatedAt: {ebook.updatedAt}</Typography>
               
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Live Preview</Typography>
                <Typography variant="h6" sx={{ mt: 1 }} noWrap>
                  {ebook.title}
                </Typography>
                <Typography variant="caption">{ebook.author}• {ebook.category} • {ebook.language}</Typography>

                <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={ebook.rating} precision={0.5} readOnly />
                  <Typography variant="body2">({ebook.rating})</Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  {ebook.price} <Typography component="span" sx={{ textDecoration: "line-through", ml: 1 }}>{ebook.discountPrice}</Typography>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
