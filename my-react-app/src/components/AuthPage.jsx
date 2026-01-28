import { useState } from "react";
import axios from "axios";
import {jwtDecode  }from "jwt-decode";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
   const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [username2,setUsername2]= useState('');
    const [password2,setPassword2]= useState('');
 

  const handleLogin = async () => {
  try {
     event.preventDefault();   

    const response = await axios.post(
      "http://localhost:8765/auth/login",
      {
        username: username,
        password: password
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    
    
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Login Success from db:", response.data);
       alert("valid username or password");
          const token = response.data;
          const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    const role=decodedToken.role;
    console.log("User Role:", role);
    
      
    
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      if(role=="ROLE_USERS"){
        navigate("/");
      }
      else{
        navigate("/admin");
      }
 
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    console.error("Login Error:", error);
    alert("Invalid username or password");
  }
};   // <-- function ends here

const handlesignup=async()=>{
  try {
     event.preventDefault();
    const response = await axios.post(
      "http://localhost:8765/auth/register",
       {
        username: username2,
        password: password2
      });
      if(response.data===" User registered"){
 console.log("Signup", response.data);
    alert("Signup successful! Please log in.");
    setUsername2('');
    setPassword2('');
    setIsLogin(true);
      }
      else if(response.data==="username already exist try another one"){
        alert("username already exist try another one");
      }
      else{
         console.log("Signup", response.data);
        alert("Signup failed! Please try again.");
      }
    
  }
catch (error) {
    console.error("signup Error:", error.response?.data || error.message);
    console.error("signup Error:", error);
    alert("Invalid username or password");
  }
};
      
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f3f3",
      }}
    >
      <Card
        sx={{
            display:isLogin ? 'block' : 'none',
          width: 380,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
           Login
        </Typography>

        <form onSubmit={handleLogin}>
       
         
 <TextField
              fullWidth
              label="Username"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={(event)=>{ setUsername(event.target.value)}}
            />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mb: 2 }}
               onChange={(event)=>{ setPassword(event.target.value)}}
          />

          

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.2,
              mt: 1,
              background: "linear-gradient(135deg, #0f2027 0%, #2b4e5aff 50%, #2c5364 100%)",
              "&:hover": { background: "linear-gradient(135deg, #0f2027df 0%, #2b4e5aff 50%, #2c5364e1 100%)" },
            }}
          >
           Login
          </Button>
        </form>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
           Don't have an account?{" "}
          <Link
            component="button"
            underline="hover"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
           Sign Up
          </Link>
        </Typography>
      </Card>
      <Card 
        sx={{
            display:isLogin ? 'none' : 'block',
          width: 380,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
  Create Account
        </Typography>

        <form onSubmit={handlesignup}>
       
         
 <TextField
              fullWidth
              label="Username"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={(event)=>{ setUsername2(event.target.value)}}
            />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            onChange={(event)=>{ setPassword2(event.target.value)}}
            sx={{ mb: 2 }}
          />

       
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              onChange={(event)=>{ setPassword2(event.target.value)}}
              sx={{ mb: 2 }}
            />
          

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.2,
              mt: 1,
              background: "linear-gradient(135deg, #0f2027 0%, #2b4e5aff 50%, #2c5364 100%)",
              "&:hover": { background: "linear-gradient(135deg, #0f2027df 0%, #2b4e5aff 50%, #2c5364e1 100%)" },
            }}
          >
          Sign Up
          </Button>
        </form>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
        Already registered?{" "}
          <Link
            component="button"
            underline="hover"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
           Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}
