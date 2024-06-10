import React, { useState } from 'react';

const PrevDescription = ({ descriptions }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    
    const fetchDescriptions = async () => {
        try {
            const response = await fetch('/api/descriptions'); // Replace with your API endpoint
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDescriptions(Array.isArray(data) ? data : []); // Ensure data is an array
        } catch (error) {
            console.error('Failed to fetch descriptions:', error);
            setDescriptions([]); // Set to empty array on error
        }
    };
    const handleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    // Check if descriptions is an array
    if (!Array.isArray(descriptions)) {
        console.error('descriptions is not an array:', descriptions);
        return null; // or return some default UI
    }

    return (
        <div className="prev-description-container">
            {descriptions.map((des, index) => (
                <div 
                    key={index} 
                    onClick={() => handleExpand(index)}
                    className="prev-description-card"
                    style={{ 
                        width: expandedIndex === index ? '300px' : '150px', // Expand only the selected card
                        height: expandedIndex === index ? 'auto' : '150px', // Adjust height based on expansion
                    }}
                >
                    <h3 style={{ fontSize: '1em', color: '#007BFF' }}>{des.name}</h3>
                    <p style={{ fontSize: '0.8em', wordWrap: 'break-word' }}>{des.description}</p>
                    {expandedIndex === index && (
                        <div style={{ 
                            marginTop: '10px',
                            backgroundColor: '#444', // Dark background for expanded view
                            border: '1px solid #007BFF',
                            borderRadius: '5px',
                            padding: '10px',
                            width: '100%', // Ensures the expanded view takes full width of the card
                            textAlign: 'left',
                            color: '#fff', // White text for readability
                        }}>
                            <p><strong>Description:</strong> {des.description}</p>
                            <p><strong>Prescription:</strong> {des.prescription}</p>
                            <p><strong>Created at:</strong> {des.createat}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PrevDescription;
