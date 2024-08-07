import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanForm = ({ loan, action, onActionCompleted }) => {
    const [loanDate, setLoanDate] = useState(loan && loan.loanDate ? loan.loanDate.split('T')[0] : '');
    const [returnDate, setReturnDate] = useState(loan && loan.returnDate ? loan.returnDate.split('T')[0] : '');
    const [gameId, setGameId] = useState(loan ? loan.gameId : '');
    const [friendId, setFriendId] = useState(loan ? loan.friendId : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loanData = action === 'edit' 
            ? { returnDate: returnDate ? new Date(returnDate).toISOString() : null }
            : { 
                gameId, 
                friendId, 
                loanDate: new Date(loanDate).toISOString(), 
                returnDate: returnDate ? new Date(returnDate).toISOString() : null 
            };

        try {
            if (action === 'edit') {
                await axios.patch(`https://localhost:7107/api/loans/${loan.id}`, loanData);
            } else {
                await axios.post('https://localhost:7107/api/loans', loanData);
            }
            onActionCompleted();
        } catch (err) {
            console.error('Error saving loan', err);
        }
    };

    useEffect(() => {
        if (loan) {
            setLoanDate(loan.loanDate.split('T')[0]);
            setReturnDate(loan.returnDate ? loan.returnDate.split('T')[0] : '');
            setGameId(loan.gameId);
            setFriendId(loan.friendId);
        }
    }, [loan]);

    return (
        <form onSubmit={handleSubmit}>
            {action !== 'edit' && (
                <>
                    <div>
                        <label>Game ID:</label>
                        <input
                            type="text"
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Friend ID:</label>
                        <input
                            type="text"
                            value={friendId}
                            onChange={(e) => setFriendId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Loan Date:</label>
                        <input
                            type="date"
                            value={loanDate}
                            onChange={(e) => setLoanDate(e.target.value)}
                            required
                        />
                    </div>
                </>
            )}
            <div>
                <label>Return Date:</label>
                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
            </div>
            <button type="submit">{action === 'edit' ? 'Update Loan' : 'Add Loan'}</button>
        </form>
    );
};

export default LoanForm;
