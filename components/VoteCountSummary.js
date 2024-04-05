import React from 'react';

const VoteCountSummary = ({ votes ,abstain}) => {
    //console.log("votes", votes);
    //console.log("abstain", abstain);
    // If votes data is not available or empty, show a message
    if (!votes || votes.length === 0) {
        return (
            <div>
                <h4>No Votes Yet</h4>
            </div>
        );
    }

    // Initialize counters for each vote type
    let yesCount = 0;
    let noCount = 0;
    let abstainCount = 0;

    // Iterate through the votes and count each type
    votes.forEach(vote => {
        switch (vote.vote) {
            case 'Yes':
                yesCount++;
                break;
            case 'No':
                noCount++;
                break;
            case 'Abstain':
                abstainCount++;
                break;
            default:
                break;
        }
    });

    // Define the abstain display based on the abstain property
    const abstainDisplay = abstain ? abstainCount : 'Not Allowed';

    return (
        <div>
            <h4>Vote Counts</h4>
            <ul>
                <li>Yes: {yesCount}</li>
                <li>No: {noCount}</li>
                <li>Abstain: {abstainDisplay}</li>
            </ul>
        </div>
    );
};

export default VoteCountSummary;
