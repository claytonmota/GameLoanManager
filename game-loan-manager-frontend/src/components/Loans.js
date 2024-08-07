import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoanForm from './LoanForm';

const Loans = () => {
    const [loans, setLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [loanId, setLoanId] = useState('');
    const [loanById, setLoanById] = useState(null);
    const [error, setError] = useState('');
    const [action, setAction] = useState(''); // 'add' or 'edit'

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await axios.get('https://localhost:7107/api/loans');
            setLoans(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching loans');
        }
    };

    const handleFetchLoanById = async () => {
        try {
            const response = await axios.get(`https://localhost:7107/api/loans/${loanId}`);
            setLoanById(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching loan by ID');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7107/api/loans/${id}`);
            fetchLoans();
        } catch (err) {
            setError('Error deleting loan');
        }
    };

    const handleSelectLoan = (loan) => {
        setSelectedLoan(loan);
        setAction('edit');
    };

    const handleAdd = () => {
        setSelectedLoan(null);
        setAction('add');
    };

    return (
        <div>
            <h1>All Loans</h1>
            <button onClick={handleAdd}>Add New Loan</button>
            {error && <p>{error}</p>}
            <ul>
                {loans.map(loan => (
                    <li key={loan.id}>
                        ID: {loan.id} - Game ID: {loan.gameId} - Friend ID: {loan.friendId} - Loan Date: {loan.loanDate} - Return Date: {loan.returnDate}
                        <button onClick={() => handleSelectLoan(loan)}>Edit</button>
                        <button onClick={() => handleDelete(loan.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <LoanForm loan={selectedLoan} action={action} onActionCompleted={fetchLoans} />

            <h1>Find Loan by ID</h1>
            <input
                type="text"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="Enter loan ID"
            />
            <button onClick={handleFetchLoanById}>Fetch Loan</button>
            {loanById && (
                <div>
                    <h2>Loan Details</h2>
                    <p>ID: {loanById.id}</p>
                    <p>Game ID: {loanById.gameId}</p>
                    <p>Friend ID: {loanById.friendId}</p>
                    <p>Loan Date: {loanById.loanDate}</p>
                    <p>Return Date: {loanById.returnDate}</p>
                </div>
            )}
        </div>
    );
};

export default Loans;
