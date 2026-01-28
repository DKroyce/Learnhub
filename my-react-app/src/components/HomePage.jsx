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
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
  Boolean(localStorage.getItem("token"))
);
  const [ebooks, setEbooks] = useState([]);
  const username=localStorage.getItem("username");
  console.log("User Name in HomePage:", username);
  const courses = [
    {
      title: "Mastering Java",
      image: "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)",
       desc: "Deep dive into ES6+, and fullstack concepts.",
    },
    {
      title: "Python for Beginners",
      image: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
      desc: "Deep dive into ES6+, and fullstack concepts.",
    },
    {
      title: "JavaScript Advanced",
      image: "linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)",
      desc: "Deep dive into ES6+, and fullstack concepts.",
    },
    {
      title: "Python for Beginners",
      image: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);",
      desc: "Deep dive into ES6+, and fullstack concepts.",
    },
  ];
  const getEbooks = async () => {
  try {
const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response = await axios.get(
        "http://localhost:8765/user/ebooks",
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
    if (isLogin) {
    getEbooks();
  }

  }, []);
  
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/"); 
  setIsLogin(false);
  alert("User logged out successfully");
  console.log("User logged out");
  console.log(isLogin);
};
  return (

    <Box sx={{ bgcolor: "#f7f9fc", minHeight: "100vh", pb: 8 }}>
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


      {isLogin?(
      <Link style={{textDecoration:"none",color:"white"}} to="/library"><Button variant="contained" sx={{
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
          }}  >library</Button></Link> ):(
            <Link style={{textDecoration:"none",color:"white"}} to="/auth"><Button variant="contained" sx={{
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
          }}  >login</Button></Link>

          )}
      {/* Hero Section */}
      <Box
        sx={{
          height: "55vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)",
          px: 2,
        }}
      >
       
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Learn. Grow. Achieve.
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: "#f7f9fc" }}>
          Explore premium eCourses & eBooks to upgrade your skills.
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 2,
            color:"black",
            bgcolor: "#e0e3e7ff",
            "&:hover": { bgcolor: "#115293" },
          }}
        >
          Browse Courses
        </Button>
      </Box>
           {!isLogin && (
    
      <Box sx={{ px: 4, mt: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Trending eBooks
        </Typography>

        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
               <CardMedia
  component="div"
  sx={{
    height: 180,
    background: course.image,
  }}
/>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: "gray" }}>
                    {course.desc}
                  </Typography>

                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": { borderColor: "#115293" },
                    }}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>)}

       {/* eBooks Listing */}
      {isLogin && (
      <Box sx={{ px: 4, mt: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Trending eBooks
        </Typography>

        <Grid container spacing={3}>
          {ebooks.map((ebook, index) => (
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
    backgroundImage: `url(${ebook.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 2,
  }}
/>
                <CardContent sx={{ minWidth: 0 }}> 
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {ebook.title}
                  </Typography>
                  <Typography sx={{
    mt: 1,
    color: "gray",
                  
  }}>
                    {ebook.description}
                  </Typography>
 <Typography variant="caption">{ebook.author}• {ebook.category} • {ebook.language}</Typography>

                <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={ebook.rating} precision={0.5} readOnly />
                  <Typography variant="body2">({ebook.rating})</Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  {ebook.price} <Typography component="span" sx={{ textDecoration: "line-through", ml: 1 }}>{ebook.discountPrice}</Typography>
                </Typography>
                     <Link style={{textDecoration:"none",color:"white"}} to={`viewebook/${ebook.id}`}><Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": { borderColor: "#115293" },
                    }}
                  >
                    view 
                  </Button></Link> 
                
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>)}
    </Box>
  );
}
