//ManualEntryForm.js
import React, { useState, useEffect } from 'react';
import './ManualEntryForm.css';

export default function ManualEntryForm({
    initialData = {},
    categories = [],      // ← grab the array you passed in

    onSubmit,
}) {
    const [formData, setFormData] = useState({
        storeName:      '',
        storeAddress:   '',
        storePhone:    '',
        dateOfPurchase: '',
        items: [ { description: "", price: "" } ],
        total:          '',
        paymentMethod:      '',
        category_id:       '',
        subcategory: '',
    });

      // wire up generic changes for text/number inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };
  // **when the OCR JSON arrives**, populate the fields**
  useEffect(() => {
    if (!initialData) return;
    setFormData(f => ({
        ...f,
      storeName:      initialData.storeName      || f.storeName,
      storeAddress:   initialData.storeAddress   || f.storeAddress,
      storePhone:    initialData.storePhone    || f.storePhone,
      dateOfPurchase: initialData.dateOfPurchase || f.dateOfPurchase,
      items: Array.isArray(initialData.items)
      ? initialData.items.map(it => ({ description: it.description, price: it.price }))
      : [{ description: "", price: "" }],
      total:          initialData.total          || f.total,
      paymentMethod:      initialData.paymentMethod || f.paymentMethod,
      category_id:       initialData.category_id       || f.category_id,
    }));
  }, [initialData]);

    // helper for updating a single item row:
    const handleItemChange = (index, field, value) => {
        setFormData(f => {
        const newItems = [...f.items];
        newItems[index] = { ...newItems[index], [field]: value };
        return { ...f, items: newItems };
        });
    };

    // helper to add / remove rows:
    const addItem = () =>
        setFormData(f => ({ ...f, items: [...f.items, { description: "", price: "" }] }));
    const removeItem = idx =>
        setFormData(f => ({
        ...f,
        items: f.items.filter((_, i) => i !== idx)
        }));
  
    const handleSubmit = e => {
        e.preventDefault();
        if (typeof onSubmit === 'function') onSubmit(formData);
    };

    return (
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