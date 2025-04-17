//ManualEntryForm.js
import React, { useState, useEffect } from 'react';

export default function ManualEntryForm({
    initialData = {},
    onSubmit,
}) {
    const [formData, setFormData] = useState({
        storeName:      '',
        storeAddress:   '',
        storePhone:    '',
        dateOfPurchase: '',
        items:          '',
        total:          '',
        payMethod:      '',
        category:       '',
    });
  // **when the OCR JSON arrives**, populate the fields**
  useEffect(() => {
    if (!initialData) return;
    setFormData({
      storeName:      initialData.storeName      || '',
      storeAddress:   initialData.storeAddress   || '',
      storePhone:    initialData.storePhone    || '',
      dateOfPurchase: initialData.dateOfPurchase || '',
      items:          Array.isArray(initialData.items)
                      ? initialData.items
                        .map(it => `${it.description} - $${it.price}`)
                        .join(', ')
                      : initialData.items || '',
      total:          initialData.total          || '',
      payMethod:      initialData.paymentMethod || '',
      category:       initialData.category       || '',
    });
  }, [initialData]);
  
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
    };
    

    const handleSubmit = e => {
        e.preventDefault();
        if (typeof onSubmit === 'function') onSubmit(formData);
    };

    return (
        <form className="manualEntryForm" onSubmit={handleSubmit}>
            <label>
                Store Name:
                <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </label>
            <label>
                Store Address:
                <input
                    type="text"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    placeholder="Address"
                />
            </label>
            <div className="twoColumnLayout">
                <label className="halfItem1">
                    Store Number:
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
            <label>
                Items:
                <textarea
                    type="text"
                    rows="4"
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                    placeholder=" Item 1,
                    Item 2, 
                    Item 3..."
                />
            </label>
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
                            name="payMethod"
                            value={formData.payMethod}
                            onChange={handleChange}
                            placeholder="Method"
                        />
                    </label>
                </div>
            </div>
            <label>
                Category:
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit to database</button>
        </form>
    );
}

// export default ManualEntryForm;
