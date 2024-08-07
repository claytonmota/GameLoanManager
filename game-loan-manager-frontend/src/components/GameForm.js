import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameForm = ({ game, action, onActionCompleted }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        if (game) {
            setTitle(game.title);
            setGenre(game.genre);
        } else {
            setTitle('');
            setGenre('');
        }
    }, [game]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (action === 'edit' && game) {
                await axios.put(`https://localhost:7107/api/games/${game.id}`, { title, genre });
            } else {
                await axios.post('https://localhost:7107/api/games', { title, genre });
            }
            onActionCompleted();
        } catch (err) {
            console.error('Error saving game', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{action === 'edit' ? 'Edit Game' : 'Add Game'}</h2>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Genre:
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
            </label>
            <button type="submit">{action === 'edit' ? 'Update Game' : 'Add Game'}</button>
        </form>
    );
};

export default GameForm;
