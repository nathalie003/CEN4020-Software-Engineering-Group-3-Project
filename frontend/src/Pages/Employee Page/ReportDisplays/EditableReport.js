import React, {useState, useEffect} from 'react';

import './EditableReport.css';

function EditableReport ({selectedReceiptID}) {
    const [categories, setCategories] = useState([]);
          // fetch categories once
    useEffect(() => {
        fetch("http://localhost:5000/api/category")
        .then(r => r.json())
        .then(data => setCategories(data))
        .catch(console.error);
    }, []);

    const [receiptData, setReceiptData] = useState({
        storeName:      '',
        storeAddress:   '',
        storePhone:    '',
        storeWebsite: '',
        dateOfPurchase: '',
        items: [ { description: "", price: "" } ],
        total:          '',
        paymentMethod:      '',
        category_id:       '',
        subcategory: '',
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/reports/getReceipt/${selectedReceiptID}`)
        .then(r => r.json())
        .then(recData => setReceiptData(recData))
        .catch(console.error);
    }, []);

    return(
        <form className="manualEntryForm" onSubmit={handleSubmit}>
            <label>
                Store Name:
                <input className="fullWidthInput"
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </label>
            <label>
                Store Address:
                <input className="fullWidthInput"
                    type="text"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    placeholder="Address"
                />
            </label>
            <label>
                Store Website:
                <input className="fullWidthInput"
                    type="text"
                    name="storeWebsite"
                    value={formData.storeWebsite}
                    onChange={handleChange}
                    placeholder="Website"
                />
            </label>
            <div className="twoColumnLayout">
                <label className="halfItem1">
                    Store Phone:
                    <input
                        type="text"
                        name="storePhone"
                        value={formData.storePhone}
                        onChange={handleChange}
                        placeholder="###-###-####"
                    />
                </label>
                <label className="halfItem2">
                    Date of Purchase:
                    <input
                        type="text"
                        name="dateOfPurchase"
                        value={formData.dateOfPurchase}
                        onChange={handleChange}
                        placeholder="MM/DD/YYYY"
                    />
                </label>
            </div>
            <div className="items-section">
                <label>Items Purchased:</label>
                {formData.items.map((it, i) => (
                    <div key={i} className="item-row">
                        <input id="desc"
                            type="text"
                            placeholder="Description"
                            value={it.description}
                            onChange={e => handleItemChange(i, "description", e.target.value)}
                        />
                        <input id="price"
                            type="number"
                            placeholder="Price"
                            step="0.01"
                            value={it.price}
                            onChange={e => handleItemChange(i, "price", e.target.value)}
                        />
                        <button
                            type="button"
                            className="remove-item-btn"
                            onClick={() => removeItem(i)}
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" id="add-item-btn" onClick={addItem}>+ Add Item</button>
            </div>
            <div className="twoColumnLayout">
                <div className="halfItem1">
                    <label>
                        Total:
                        <input
                            type="text"
                            name="total"
                            value={formData.total}
                            onChange={handleChange}
                            placeholder="$0.00"
                        />
                    </label>
                </div>
                <div className="halfItem2">
                    <label>
                        Payment Method:
                        <input
                            type="text"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            placeholder="Method"
                        />
                    </label>
                </div>
            </div>
            <div className="twoColumnLayout">
                <div className="halfItem1">
                    <label>
                        Category:
                        <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        >
                        <option value="">— pick one —</option>
                        {categories.map(c => (
                            <option key={c.category_id} value={c.category_id}>
                            {c.category_name}
                            </option>
                        ))}
                        </select>
                    </label>
                </div>
                <div className="halfItem2">
                    <label>
                        Subcategory:
                        <input 
                            type="text"
                            name="subcategory"
                            value={formData.subcategory} // NEED TO CHANGE VALUE
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <button id="submit-receipt-form-btn" type="submit">Submit Expense</button>
        </form>
    );
}

export default EditableReport;