import { Card, CardContent, CardMedia, Typography, Button, Box, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import axios from "axios";

const EbookHorizontalCard = () => {
  const [ebook, setEbook] = useState([]);
const fetchebooks = async () => {
    try {
      const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
      const response = await axios.get(`http://localhost:8765/user/ebooks/library/ids`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
      setEbook(response.data);
     
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    }
  };
  useEffect(() => {
    fetchebooks();},[]);
  //  const ebook = 
  //   {
  //     // title: "Full Stack Web Development",
  //      mage: "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)",
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
  const handleDownload = (ebook) => {
  if (!ebook.fileUrl) {
    console.error("File URL not available");
    return;
  }

  // Open the file URL in a new tab/window
  window.open(ebook.fileUrl, "_blank");
};
  return (
   <>

      <Typography variant="h5" fontWeight={600} sx={{ mb: 3,ml:2,mt:3 }}>
        My Ebooks Library
      </Typography>
   
   <div >
  {ebook.length === 0 ? (
   
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3,ml:2,mt:3 }}>No ebooks available.</Typography>
  ) : (
    <div>
      {ebook.map((item) => (
        <Card
          key={item.id} // always add a unique key
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,m:2,
            borderRadius: 3,
            boxShadow: 3,
            gap: 2,
          }}
        >
          {/* Thumbnail */}
          <CardMedia
            component="div"
            sx={{
              width: 140,
              height: 190,
              backgroundImage: `url(${item.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          />

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" fontWeight={600}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.description}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Typography variant="caption">• {item.author}</Typography>
                <Typography variant="caption">• {item.language}</Typography>
                <Typography variant="caption">• {item.category}</Typography>
              </Stack>
            </CardContent>
          </Box>

          {/* Download Button */}
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={()=> handleDownload(item)}
            
            sx={{
              px: 3,
              height: 44,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Download
          </Button>
        </Card>
      ))}
    </div>
  )}
</div>

   </>
  );
};

export default EbookHorizontalCard;
