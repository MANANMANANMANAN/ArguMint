// import React, { useState } from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";
// import Logo from './Logo.png';  // Import the image
// import {
//     Home,
//     HomeOutlined,
//     Add,
//     AddOutlined,
//     SearchOutlined,
//     Search,
//     AccountCircle,
//     AccountCircleOutlined,
//   } from "@mui/icons-material";
//   const Header = () => {
//     const [tab, setTab] = useState(window.location.pathname);
//     return (
//       <div className="header">
//         <img src={Logo} alt="logo" />
//         <Link to="/" onClick={() => setTab("/")}>
//           {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
//         </Link>

//         <Link to="/newdebate" onClick={() => setTab("/newpost")}>
//           {tab === "/newpost" ? (
//             <Add style={{ color: "black" }} />
//           ) : (
//             <AddOutlined />
//           )}
//         </Link>

//         <Link to="/search" onClick={() => setTab("/search")}>
//           {tab === "/search" ? (
//             <Search style={{ color: "black" }} />
//           ) : (
//             <SearchOutlined />
//           )}
//         </Link>

//         <Link to="/account" onClick={() => setTab("/account")}>
//           {tab === "/account" ? (
//             <AccountCircle style={{ color: "black" }} />
//           ) : (
//             <AccountCircleOutlined />
//           )}
//         </Link>
//       </div>
//     );
//   };

//   export default Header;
import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from './Logo.png';  // Import the image
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
} from "@mui/icons-material";

const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
    return (
        <div className="header">
            <div className="left-container">
                <img 
                    src={Logo} 
                    alt="logo" 
                    width={65} 
                    height={65} 
                    style={{ marginRight: "10px", borderRadius: "20px" }} 
                />
                <span className="title">ArguMate</span> {/* Added ArguMate here */}
            </div>
            <div className="icon-container"> {/* Container for icons */}
                <Link to="/" onClick={() => setTab("/")}>
                    {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
                </Link>

                <Link to="/newdebate" onClick={() => setTab("/newpost")}>
                    {tab === "/newpost" ? (
                        <Add style={{ color: "black" }} />
                    ) : (
                        <AddOutlined />
                    )}
                </Link>

                <Link to="/search" onClick={() => setTab("/search")}>
                    {tab === "/search" ? (
                        <Search style={{ color: "black" }} />
                    ) : (
                        <SearchOutlined />
                    )}
                </Link>

                <Link to="/account" onClick={() => setTab("/account")}>
                    {tab === "/account" ? (
                        <AccountCircle style={{ color: "black" }} />
                    ) : (
                        <AccountCircleOutlined />
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Header;

