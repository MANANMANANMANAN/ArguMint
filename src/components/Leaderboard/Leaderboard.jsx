// import React, { useEffect, useState } from "react";
// import Confetti from "react-confetti";
// import { Dialog } from "@mui/material";
// import "./Leaderboard.css";
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// const Leaderboard = ({ open, onClose}) => {
//   const location = useLocation();
//   const { debates } = useSelector((state) => state.allDebates);
//   const [showConfetti, setShowConfetti] = useState(true);
//   const queryParams = new URLSearchParams(location.search);
//   const debateId = queryParams.get('debate_id');
//   const debate = debates.find(debate => debate._id === debateId);
//   const messages = debate.messages;
//   // Stop confetti after 5 seconds and log messages
//   useEffect(() => {
//     // console.log("Messages received in Leaderboard:", messages);
//     const timer = setTimeout(() => setShowConfetti(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);
//   return (
//     <Dialog open={open} onClose={onClose} className="leaderboard-dialog">
//       {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
//       <div className="leaderboard-title">DEBATE LEADERBOARD</div>
//       <div className="leaderboard-content">
//         <table className="leaderboard-table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Side</th>
//               <th>Likes</th>
//               <th>% Likes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {winners.map((item, index) => {
//             console.log(item);
//             return (
//             <tr key={index}>
//               <td>{item.user}</td>
//               <td>{item.side}</td>
//               <td>{item.like}</td>
//               <td>{item.like}</td>
//             </tr>
//              );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </Dialog>
//   );
// };

// export default Leaderboard;

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Dialog } from "@mui/material";
import "./Leaderboard.css";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Leaderboard = ({ open, onClose }) => {
  const location = useLocation();
  const { debates } = useSelector((state) => state.allDebates);
  const [showConfetti, setShowConfetti] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const debateId = queryParams.get('debate_id');
  const debate = debates.find(debate => debate._id === debateId);
  const messages = debate.messages;

  // Calculate winners
  const winners = messages.reduce((acc, message) => {
    const { user, side, like } = message;

    // Check if the user already exists in the accumulator
    const existingUser = acc.find(item => item.user === user && item.side === side);

    if (existingUser) {
      existingUser.likes += like;
    } else {
      acc.push({ user, side, likes: like });
    }

    return acc;
  }, []);

  // Calculate total likes for percentage calculation
  const totalLikes = winners.reduce((sum, winner) => sum + winner.likes, 0);

  // Stop confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onClose={onClose} className="leaderboard-dialog">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="leaderboard-title">DEBATE LEADERBOARD</div>
      <div className="leaderboard-content">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Side</th>
              <th>Likes</th>
              <th>% Likes</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((item, index) => (
              <tr key={index}>
                <td>{item.user}</td>
                <td>{item.side}</td>
                <td>{item.likes}</td>
                <td>{((item.likes / totalLikes) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default Leaderboard;
