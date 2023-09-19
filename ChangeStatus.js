// import "./../style/datatable.scss";
import "../../style/setting.scss"
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../branch/context/AuthContext";
import { useContext } from "react";
import { base_url } from "../../api/Axios";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import CommentIcon from "@mui/icons-material/Comment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const ChangeStatus = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const url = location.state.url;
  const action = location.state.action;
  const category = location.state.category;
  const [status, setStatus] = useState("ACTIVE");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}${category}/${url}/${action}`,
        { status, pin },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
        console.log(response);
      toast.success(`The Status changed to ${status}!`);
      navigate(-1);
    } catch (error) {
      // console.log(error.response.data.pin[0]);
      if (error.response.data) {
        setPinError(error.response.data.pin[0]);
      }
      //   setPinError
    }
  };
  const theme = createTheme();
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
      <div className="formConatiner">
        <div className="top">
          Change Status
        </div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={age}
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="LOCKED">Locked</MenuItem>
                    <MenuItem value="DISABLED">Disable</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="voucher">Reason</InputLabel>
                  <OutlinedInput
                    id="Comment"
                    required
                    type="text"
                    // value={Comment}
                    // onChange={CommentChangehandler}

                    startAdornment={
                      <InputAdornment position="start">
                        <CommentIcon />
                      </InputAdornment>
                    }
                    label="Comment"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="filled-adornment-password">
                    PIN
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    required
                    type="password"
                    autoComplete={pin}
                    value={pin}
                    inputProps={{ maxLength: 4, minLength: 4 }}
                    onChange={(e) => setPin(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <VisibilityOff />
                      </InputAdornment>
                    }
                    label="PIN"
                  />
                </FormControl>
                {pinError && <p style={{ color: "red" }}>{pinError}</p>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change Status
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
    </div>
  );
};
export default ChangeStatus;
