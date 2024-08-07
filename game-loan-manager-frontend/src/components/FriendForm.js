import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendForm = ({ friend, action, onActionCompleted }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (action === 'edit' && friend) {
            setName(friend.name);
            setEmail(friend.email);
        }
    }, [action, friend]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (action === 'add') {
                await axios.post('https://localhost:7107/api/friends', { name, email });
            } else if (action === 'edit' && friend) {
                await axios.put(`https://localhost:7107/api/friends/${friend.id}`, { name, email });
            }
            setName('');
            setEmail('');
            onActionCompleted();
        } catch (err) {
            setError('Error saving friend');
        }
    };

    return (
        <div>
            <h2>{action === 'add' ? 'Add Friend' : 'Edit Friend'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{action === 'add' ? 'Add Friend' : 'Update Friend'}</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default FriendForm;
