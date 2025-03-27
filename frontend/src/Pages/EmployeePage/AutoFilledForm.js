import React, { useState, useEffect } from 'react';

function AutoFilledForm() {
    const [formData, setFormData] = useState({
        storeName: '',
        dateOfPurchase: '',
        category: '',
        items: [],
        total: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/get-autofilled-data');
                const data = await response.json();

                setFormData({
                    storeName: data.storeName || '',
                    dateOfPurchase: data.dateOfPurchase || '',
                    category: data.category || '',
                    items: data.items || [],
                    total: data.total || '',
                });
            } catch (error) {
                console.error('Error fetching autofilled data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Form submitted with autofilled data');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Store Name:
                <input type="text" value={formData.storeName} readOnly />
            </label>
            <label>
                Date of Purchase:
                <input type="text" value={formData.dateOfPurchase} readOnly />
            </label>
            <label>
                Category:
                <input type="text" value={formData.category} readOnly />
            </label>
            <label>
                Items:
                <textarea value={formData.items.join(', ')} readOnly />
            </label>
            <label>
                Total:
                <input type="text" value={formData.total} readOnly />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AutoFilledForm;
