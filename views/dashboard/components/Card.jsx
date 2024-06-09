import React from 'react';
import { useNavigate } from 'react-router';
import userImage from '../../../user.jpeg';
import './Card.css'; // Import the CSS file

const Card = ({ user }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(user.id);
        navigate(`/users/${user.id}`);
    }

    return (
        <div className="card-container" onClick={handleClick}>
            <div className="card-image">
                <img src={userImage} alt="user" />
            </div>

            <div className="card-content">
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>
        </div>
    );
}

export default Card;
