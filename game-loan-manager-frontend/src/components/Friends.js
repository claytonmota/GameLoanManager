import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FriendForm from './FriendForm';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friendId, setFriendId] = useState('');
    const [friendById, setFriendById] = useState(null);
    const [error, setError] = useState('');
    const [action, setAction] = useState(''); // 'add' or 'edit'

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await axios.get('https://localhost:7107/api/friends');
            setFriends(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching friends');
        }
    };

    const handleFetchFriendById = async () => {
        try {
            const response = await axios.get(`https://localhost:7107/api/friends/${friendId}`);
            setFriendById(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching friend by ID');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7107/api/friends/${id}`);
            fetchFriends();
        } catch (err) {
            setError('Error deleting friend');
        }
    };

    const handleSelectFriend = (friend) => {
        setSelectedFriend(friend);
        setAction('edit');
    };

    const handleAdd = () => {
        setSelectedFriend(null);
        setAction('add');
    };

    return (
        <div>
            <h1>All Friends</h1>
            <button onClick={handleAdd}>Add New Friend</button>
            {error && <p>{error}</p>}
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        ID: {friend.id} - Name: {friend.name} - Email: {friend.email}
                        <button onClick={() => handleSelectFriend(friend)}>Edit</button>
                        <button onClick={() => handleDelete(friend.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <FriendForm friend={selectedFriend} action={action} onActionCompleted={fetchFriends} />

            <h1>Find Friend by ID</h1>
            <input
                type="text"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                placeholder="Enter friend ID"
            />
            <button onClick={handleFetchFriendById}>Fetch Friend</button>
            {friendById && (
                <div>
                    <h2>Friend Details</h2>
                    <p>ID: {friendById.id}</p>
                    <p>Name: {friendById.name}</p>
                    <p>Email: {friendById.email}</p>
                </div>
            )}
        </div>
    );
};

export default Friends;
