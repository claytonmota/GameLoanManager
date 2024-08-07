import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameForm from './GameForm';

const Games = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameId, setGameId] = useState('');
    const [gameById, setGameById] = useState(null);
    const [error, setError] = useState('');
    const [action, setAction] = useState(''); // 'add' or 'edit'

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('https://localhost:7107/api/games');
            setGames(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching games');
        }
    };

    const handleFetchGameById = async () => {
        try {
            const response = await axios.get(`https://localhost:7107/api/games/${gameId}`);
            setGameById(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching game by ID');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7107/api/games/${id}`);
            fetchGames();
        } catch (err) {
            setError('Error deleting game');
        }
    };

    const handleSelectGame = (game) => {
        setSelectedGame(game);
        setAction('edit');
    };

    const handleAdd = () => {
        setSelectedGame(null);
        setAction('add');
    };

    return (
        <div>
            <h1>All Games</h1>
            <button onClick={handleAdd}>Add New Game</button>
            {error && <p>{error}</p>}
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        ID: {game.id} - Title: {game.title} - Genre: {game.genre}
                        <button onClick={() => handleSelectGame(game)}>Edit</button>
                        <button onClick={() => handleDelete(game.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <GameForm game={selectedGame} action={action} onActionCompleted={fetchGames} />

            <h1>Find Game by ID</h1>
            <input
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                placeholder="Enter game ID"
            />
            <button onClick={handleFetchGameById}>Fetch Game</button>
            {gameById && (
                <div>
                    <h2>Game Details</h2>
                    <p>ID: {gameById.id}</p>
                    <p>Title: {gameById.title}</p>
                    <p>Genre: {gameById.genre}</p>
                </div>
            )}
        </div>
    );
};

export default Games;
