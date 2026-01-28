import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating
} from "@mui/material";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
const [ebooks, setEbooks] = useState([]);

  // const courses = [
  //   {
  //     // title: "Full Stack Web Development",
  //      image: "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)",
  //      desc: "Master MERN stack & build real-world projects.",
  //     title: "Mastering Java",
  //       description: "A complete guide to Java programming for beginners and intermediates.",
  //       author: "Dk Royce",
  //       price: 499.0,
  //       discountPrice: 399.0,
  //       category: "Programming",
  //       language: "English",
  //       rating: 4.8,
  //       isFeatured: true,
  //       thumbnailUrl: "https://example.com/images/java-book.jpg",
  //       pages: 350,
  //       fileUrl: "https://example.com/files/mastering-java.pdf",
  //       previewUrl: "https://example.com/files/mastering-java-preview.pdf",
  //       publisher: "TechBooks Publishing",
  //       isbn: "978-1-23456-789-0",
  //       createdAt: "2025-10-14T21:52:07.929633",
  //       updatedAt: "2025-10-14T21:52:07.929633"
  //   },
    // {
    //   title: "UI/UX Design Masterclass",
    //   image: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
    //   desc: "Learn modern UI/UX with Figma + Design Thinking.",
    // },
    // {
    //   title: "Artificial Intelligence Basics",
    //   image: "linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)",
    //   desc: "Understand AI, ML, Neural Networks from zero.",
    // },
    // {
    //   title: "Artificial Intelligence Basics",
    //   image: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);",
    //   desc: "Understand AI, ML, Neural Networks from zero.",
    // },
   //];
const getEbooks = async () => {
  try {
const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response = await axios.get(
        "http://localhost:8765/admin/ebooks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
setEbooks(response.data);
      console.log("Ebooks:", response.data);
    } catch (err) {
      console.error("Error fetching ebooks:", err);
    }
  };
  useEffect(() => {
  getEbooks();},[]);
  
  const handledelete = async(id)=>{
    try{
      const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response= await axios.delete(`http://localhost:8765/admin/ebooks/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      console.log("ebook deleted successfully:", response.data);
            alert("ebook deleted successfully!");
            getEbooks();
            
    }
    catch(error){  alert("Error deleting ebook: " + error)
  }}

   const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
  Boolean(localStorage.getItem("token"))
);
    const username=localStorage.getItem("username");
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/"); 
  setIsLogin(false);
  alert("admin logged out successfully");
  console.log("admin logged out");
  console.log(isLogin);
};
  return (

    <Box sx={{ bgcolor: "#f7f9fc", minHeight: "100vh", pb: 8 }}>
      <Link style={{textDecoration:"none",color:"white"}} to="/admineditadd"><Button variant="contained" sx={{
        position:"absolute", top:20,
        right:20,
            px: 4,
            py: 1.5,
            ml:0,
            fontSize: "1rem",
            borderRadius: 2,
            color:"black",
            bgcolor: "#ffffffff",
            "&:hover": { bgcolor: "#ff40ffff",    color:"white", },
          }}  >Add</Button></Link> 
      {isLogin && (
   <Typography variant="contained" sx={{
        position:"absolute", top:20,
        left:20,
            px: 4,
            py: 1.5,
            ml:0,
            fontSize: "1rem",
            borderRadius: 2,
            color:"black",
            bgcolor: "#ffffffff",
            
          }}  >{username}</Typography> )}

            {isLogin && (    <Button variant="contained" onClick={handleLogout} sx={{
         
        position:"absolute", top:20,
        right:180,
            px: 4,
            py: 1.5,
            ml:0,
            fontSize: "1rem",
            borderRadius: 2,
            color:"black",
            bgcolor: "#ffffffff",
            "&:hover": { bgcolor: "#ff40ffff",    color:"white", },
          }}  >logout</Button> )}

     {/* Featured Courses */}
      <Box sx={{ px: 4,py:4 }}>

        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3,mt:6 }}>
      Manage Trending eBooks
        </Typography>

        <Grid container spacing={3}>
          {ebooks.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                 width: "320px", 
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,

                  },
                }}
              >
               <CardMedia
  component="div"
 sx={{
    height: 190,
    backgroundImage: `url(${course.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 2,
  }}
/>
                <CardContent sx={{ minWidth: 0 }}> 
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography sx={{
    mt: 1,
    color: "gray",
                  
  }}>
                    {course.description}
                  </Typography>
 <Typography variant="caption">{course.author}• {course.category} • {course.language}</Typography>

                <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={course.rating} precision={0.5} readOnly />
                  <Typography variant="body2">({course.rating})</Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  {course.price} <Typography component="span" sx={{ textDecoration: "line-through", ml: 1 }}>{course.discountPrice}</Typography>
                </Typography>
                    <Link style={{textDecoration:"none",color:"white"}} to={`/adminedit/${course.id}`}><Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": { borderColor: "#115293" },
                    }}
                  >
                    Edit 
                  </Button></Link> 
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      ml:2,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": { borderColor: "#115293" },
                    }}
                    onClick={() => handledelete(course.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      
    </Box>
  );
}
