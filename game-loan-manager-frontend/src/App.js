import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Friends from './components/Friends';
import Games from './components/Games';
import Loans from './components/Loans';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/friends">Friends</Link>
                        </li>
                        <li>
                            <Link to="/games">Games</Link>
                        </li>
                        <li>
                            <Link to="/loans">Loans</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/loans" element={<Loans />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
