import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Header() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  let param1 = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderNav = () => {
    if (param1["pathname"].includes("test")) {
      return (
        <>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Link to="/">
                <Tab label="Log out" />
              </Link>
            </Tabs>
          </Box>
          ;
        </>
      );
    } else if (param1["pathname"].includes("listques")) {
      return (
        <>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Link to="/newtest">
                <Tab label="Create a question" />
              </Link>
              <Link to="/">
                <Tab label="Log out" />
              </Link>
            </Tabs>
          </Box>
          ;
        </>
      );
    }
  };
  return <>{renderNav()}</>;
}
