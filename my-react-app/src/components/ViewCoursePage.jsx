import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Rating,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewCoursePage() {
  const {prodid}=useParams();
  const [isPurchased, setIsPurchased] = useState(false);
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
  // fallback if course not passed
  // const data = course || {
  //   title: "Full Stack Web Development",
  //   banner:
  //     "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)", // image or background color
  //   desc: "Master MERN stack development by building real-world projects.",
  //   duration: "12 Weeks",
  //   level: "Beginner to Advanced",
  //   learn: [
  //     "Build full-stack apps with React + Node.js",
  //     "Learn MongoDB, Express & REST APIs",
  //     "Authentication, JWT, Security",
  //     "Deployment with Vercel & Render",
  //   ],
  // };

  // const ebook = 
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
  //       thumbnailUrl: "https://image2url.com/images/1765432406638-218db70c-1a91-4d46-b912-94ec10723642.jpg",
  //       pages: 350,
  //       fileUrl: "https://example.com/files/mastering-java.pdf",
  //       previewUrl: "https://example.com/files/mastering-java-preview.pdf",
  //       publisher: "TechBooks Publishing",
  //       isbn: "978-1-23456-789-0",
  //       createdAt: "2025-10-14T21:52:07.929633",
  //       updatedAt: "2025-10-14T21:52:07.929633"
  //   };

 // const isImage = data.banner.startsWith("http");

 const fetchpurchased = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);

    const response = await axios.get(
      `http://localhost:8765/user/ebooks/${prodid}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setIsPurchased(response.data);
  } catch (error) {
    console.error("Error fetching ebooks:", error);
  }
};
const fetchebooksWrappper = async () => {
    try {
      const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response = await axios.get(`http://localhost:8765/user/ebooks/${prodid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
      // setEbook(response.data);
      setEbook(prev => ({
        ...prev,
        ...response.data, 
        fileUrl: ""       
      }));
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    }
  };
  const fetchebooks = async () => {
    try {
      const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response = await axios.get(`http://localhost:8765/user/ebooks/${prodid}/detail`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
       setEbook(response.data);
     
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    }
  };
  const fetchFileUrl = async () => {
  try {
    const token = localStorage.getItem("token");

    const downloadRes = await axios.get(
      `http://localhost:8765/user/ebooks/${ebook.id}/fileurl`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const fileUrl = downloadRes.data;

    setEbook(prev => ({
      ...prev,
      fileUrl: fileUrl
    }));

    return fileUrl; 
    

  } catch (error) {
    console.error("Error fetching file URL:", error);
    return null;
  }
};
useEffect(() => {
  if (prodid) {
    fetchpurchased();
  }
}, [prodid]);

useEffect(() => {
  if (isPurchased === false) {
    fetchebooksWrappper();
  }

  if (isPurchased === true) {
    fetchebooks();
    fetchFileUrl();
  }
}, [isPurchased]);

const token = localStorage.getItem("token");

    const handlePayment = () => {

axios.post("http://localhost:8765/payment/create-order", {
  amount:ebook.discountPrice * 100,
  currency: "INR"
},{
    headers: {
      Authorization: `Bearer ${token}`,
    }}
)
.then(res => {
  const order = res.data;
  openRazorpayCheckout(order);
});
    }

  const openRazorpayCheckout = (order) => {
  
    const options = {
      key: "rzp_test_RUsq5u001UT8NY", 
      amount: order.amount,
      currency: order.currency,
        order_id: order.id,
        name: "Demo Store",
      description: "Test Transaction",
      
      handler: function (response) {
        console.log("Razorpay Response:", response);

 
        axios
          .post("http://localhost:8765/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
             ebookId: ebook.id
          },{
    headers: {
      Authorization: `Bearer ${token}`,
    }}
        )
          .then((res) => {
            if (res.data.success) {
              alert(" Payment Verified Successfully!");

              
      // setEbook(prev => ({
      //   ...prev,
      //   isPurchased: true
      // }));
      
  setIsPurchased(true);
  

        fetchFileUrl();

            } else {
              alert(" Payment Verification Failed!");
            }
          })
          .catch((err) => {
            console.error(err);
            alert(" Error verifying payment");
          });
      },
     
    };
    const rzp = new window.Razorpay(options);
    rzp.open();

  };
const handleDownload = async () => {
  const url = await fetchFileUrl();

  if (!url) {
    alert("Unable to download file");
    return;
  }


   window.open(ebook.fileUrl, "_blank");
};

  return (
   
    <Box sx={{ bgcolor: "#f7f9fc", minHeight: "100vh", pb: 8 }}>
      {/* Banner */}
      <Box
        sx={{
          height: { xs: 200, md: 300 },
          width: "100%",
        backgroundImage: `url(${ebook.thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <Box sx={{ px: { xs: 2, md: 6 }, mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {ebook.title}
        </Typography>

        <Typography sx={{ mt: 2, color: "gray", fontSize: "1.1rem" }}>
          {ebook.description}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Left: What You'll Learn */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
 <Typography variant="body1">• Author: {ebook.author}</Typography>
  <Typography variant="body1">• Category: {ebook.category}</Typography>
   <Typography variant="body1">• Language: {ebook.language}</Typography>
    <Typography variant="body1">• publisher: {ebook.publisher}</Typography>
</Box>

               
              
            </Card>
          </Grid>

          {/* Right: Course Info */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                ebook Details
              </Typography>

             <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={ebook.rating} precision={0.5} readOnly />
                  <Typography variant="body2">({ebook.rating})</Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  {ebook.discountPrice} <Typography component="span" sx={{ textDecoration: "line-through", ml: 1 }}>{ebook.price}</Typography>
                </Typography>

              <Chip
                label="Best Seller"
                color="primary"
                sx={{ mb: 3, fontWeight: 600 }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#115293" },
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
                onClick={isPurchased? handleDownload : handlePayment}
              >
               {isPurchased ? "Download" : "Buy Now"}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
