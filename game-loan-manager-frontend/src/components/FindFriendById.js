import React, { useState } from 'react';
import axios from 'axios';

const FindFriendById = () => {
    const [friendId, setFriendId] = useState('');
    const [friend, setFriend] = useState(null);
    const [error, setError] = useState('');
    
    const fetchFriendById = async () => {
        try {
            const response = await axios.get(`https://localhost:7107/api/friends/${friendId}`);
            setFriend(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching friend');
            setFriend(null);
        }
    };

    return (
        <div>
            <h1>Find Friend by ID</h1>
            <input
                type="text"
                placeholder="Enter friend ID"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
            />
            <button onClick={fetchFriendById}>Fetch Friend</button>

            {error && <p>{error}</p>}
            {friend && (
                <div>
                    <h2>Friend Details</h2>
                    <p>ID: {friend.id}</p>
                    <p>Name: {friend.name}</p>
                    <p>Email: {friend.email}</p>
                </div>
            )}
        </div>
    );
};

export default FindFriendById;
