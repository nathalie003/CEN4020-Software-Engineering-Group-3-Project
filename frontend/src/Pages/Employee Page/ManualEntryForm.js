import React, { useState } from 'react';

function ManualEntryForm() {
    const [formData, setFormData] = useState({
        storeName: '',
        dateOfPurchase: '',
        category: '',
        items: '',
        total: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Form submitted with manual entry data');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Store Name:
                <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Date of Purchase:
                <input
                    type="text"
                    name="dateOfPurchase"
                    value={formData.dateOfPurchase}
                    onChange={handleChange}
                />
            </label>
            <label>
                Category:
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
            </label>
            <label>
                Items:
                <textarea
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                />
            </label>
            <label>
                Total:
                <input
                    type="text"
                    name="total"
                    value={formData.total}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ManualEntryForm;
