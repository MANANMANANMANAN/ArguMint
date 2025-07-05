import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Importing useSelector
import '../Dbate/Dbate.css';  // Importing CSS file
import { useDispatch } from 'react-redux';
import { getAllDebates } from "../../Actions/Debate";
import User from "../User/User"
// import MoneyTransfer from '../Money_Transfer';
import useMoneyTransfer from '../Money_Transfer';
// import { deposit, withdraw, getBalance } from '../Aptos';
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// const { account, signAndSubmitTransaction } = useWallet();
const Dbate_Past = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const { account, balance, connectMetaMask, deposit, withdraw } = useMoneyTransfer();
    const { debates } = useSelector((state) => state.allDebates);
    const queryParams = new URLSearchParams(location.search);
    const debateId = queryParams.get('debate_id');

    // Find the debate based on the debateId
    const debate = debates.find(debate => debate._id === debateId);
    
    // useEffect to update messages when debate changes
    useEffect(() => {
        dispatch(getAllDebates());
    }, [])
    useEffect(() => {
        // dispatch(getAllDebates());
        if (debate && debate.messages) {
            setMessages(debate.messages);
        }
    }, [debate]);
    const handleEnd = () => { 

        const queryParams = new URLSearchParams(location.search);
        const debateId = queryParams.get('debate_id');
        const debate = debates.find(debate => debate._id === debateId);
        const messages = debate.messages;
        // Dispatch action to finish the debate
        // dispatch(finish_debate(debateId));
        // setIsFinish(true);
        // const totalAmount = debate.totalAmount;  // Assuming the total amount is stored in the debate
        const userLikesMap = new Map();
        let totalLikes = 0;
        console.log(messages);
        messages.forEach(message => {
            // console.log(message.user)
            const senderId = message.user; // Assuming message has a sender object with an _id
            const likes = message.like; // Assuming message has a likes field representing the number of likes
            // Add to the user's like count
            if (userLikesMap.has(senderId)) {
                userLikesMap.set(senderId, userLikesMap.get(senderId) + likes);
            } else {
                userLikesMap.set(senderId, likes);
            }
            // Increment total likes count
            totalLikes += likes;
        });
        // connectMetaMask();
        // Iterate over the users in the map and call withdraw for each user
        const amounty = (userLikesMap.size * 100).toString()
        userLikesMap.forEach((userLikes, userId) => {
            const proportion = userLikes / totalLikes;
            const amount = proportion * amounty;
            const aptId = "0x2C4cDc1f6aDE7CDAf1cad3Ce925dd3962b8Dd6f5"
            // withdraw(amounty, aptId);
            // withdraw(account,signAndSubmitTransaction,amount,aptId);
        });
        console.log(userLikesMap);
    };
    // Render
    return (
        <div className="debate-container">
            <div className="messages-container">
                {messages.map((item, index) => (
                    <div>
                        <div className={`${item.side === 'left' ? 'l' : 'r'}`}>
                        <User name="Manan" avatar = ""/>
                        </div>
                    <div
                        key={index}
                        className={`message-box ${item.side === 'left' ? 'left' : 'right'}`}
                    >
                        <p>{item.message}</p>
                        {/* Like Section */}
                        <div className="like-section">
                            <span className="like-icon">❤️</span>
                            <span>{item.like}</span>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            <button onClick={handleEnd}>end</button>
        </div>
    );
};

export default Dbate_Past;


