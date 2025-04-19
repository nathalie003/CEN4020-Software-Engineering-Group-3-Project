import React, {useState, useEffect, useRef} from 'react';

import './EditableReport.css';

function EditableReport ({selectedReceiptID, onSubmit}) {
    console.log("EditableReport mounted with receipt ID:", selectedReceiptID);
    const [categories, setCategories] = useState([]);
    const prevReceiptIDRef = useRef();
          // fetch categories once
    const [receiptData, setReceiptData] = useState({
        receipt_id: selectedReceiptID,
        receipt_total: '',
        receipt_date: "",
        payment_method: "",
        store_name: null,
        store_address: "",
        store_phone: "",
        store_website: null,
        category_id: 8,
        subcategory_name: "",
        items: [ { description: "", price: "" } ],
    });

    console.log(receiptData);

    // Add a loading state to manage the loading status
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (prevReceiptIDRef.current === selectedReceiptID) return;
        prevReceiptIDRef.current = selectedReceiptID;
        const fetchData = async () => {
          const receiptID = selectedReceiptID;
      
          if (receiptID) {
            setLoading(true);
      
            try {
                const getCategories = await fetch("http://localhost:5000/api/category");
                const catData = await getCategories.json();
                console.log("Fetched categories");
                setCategories(catData);
            
              // Fetch receipt data
              const receiptResponse = await fetch(`http://localhost:5000/api/reports/getReceipt/${receiptID}`);
              const receiptInfo = await receiptResponse.json();
              console.log("Fetched receipt:", receiptInfo);
      
              setReceiptData((prev) => ({
                ...prev,
                ...receiptInfo.reports[0], // This should include all fields except items
              }));
      
              // Fetch items
              const itemsResponse = await fetch(`http://localhost:5000/api/reports/getItems/${receiptID}`);
              const itemsData = await itemsResponse.json();
              console.log("Fetched items:", itemsData);
      
              setReceiptData((prev) => ({
                ...prev,
                items: itemsData.items || [],
              }));
      
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false); // Stop loading after both fetches are done
            }
          }
        };
      
        fetchData();
      }, [selectedReceiptID]); // Dependency array is still selectedReceiptID

    const handleChange = e => {
        const { name, value } = e.target;
        setReceiptData(f => ({ ...f, [name]: value }));
      };

        // helper for updating a single item row:
        const handleItemChange = (index, field, value) => {
            setReceiptData(f => {
            const newItems = [...f.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return { ...f, items: newItems };
            });
        };
    
        // helper to add / remove rows:
        const addItem = () =>
            setReceiptData(f => ({ ...f, items: [...f.items, { description: "", price: "" }] }));
        const removeItem = idx =>
            setReceiptData(f => ({
            ...f,
            items: f.items.filter((_, i) => i !== idx)
            }));
      
        const handleSubmit = e => {
            e.preventDefault();
            if (typeof onSubmit === 'function') onSubmit(receiptData);
        };

        if (loading) {
            return <div>Loading...</div>;
          }
    

    return(
        <form className="editableReport" onSubmit={handleSubmit}>
            <label>
                Store Name:
                <input className="fullWidthInput"
                    type="text"
                    name="store_name"
                    value={receiptData.store_name}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </label>
            <label>
                Store Address:
                <input className="fullWidthInput"
                    type="text"
                    name="store_address"
                    value={receiptData.store_address}
                    onChange={handleChange}
                    placeholder="Address"
                />
            </label>
            <label>
                Store Website:
                <input className="fullWidthInput"
                    type="text"
                    name="store_website"
                    value={receiptData.store_website}
                    onChange={handleChange}
                    placeholder="Website"
                />
            </label>
            <div className="twoColumnLayout">
                <label className="halfItem1">
                    Store Phone:
                    <input
                        type="text"
                        name="store_phone"
                        value={receiptData.store_phone}
                        onChange={handleChange}
                        placeholder="###-###-####"
                    />
                </label>
                <label className="halfItem2">
                    Date of Purchase:
                    <input
                        type="text"
                        name="receipt_date"
                        value={receiptData.receipt_date}
                        onChange={handleChange}
                        placeholder="MM/DD/YYYY"
                    />
                </label>
            </div>
            <div className="items-section">
                <label>Items Purchased:</label>
                {receiptData.items.map((it, i) => (
                    <div key={i} className="item-row">
                        <input id="descER"
                            type="text"
                            placeholder="Description"
                            value={it.description}
                            onChange={e => handleItemChange(i, "description", e.target.value)}
                        />
                        <input id="priceER"
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
                            name="receipt_total"
                            value={receiptData.receipt_total}
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
                            name="payment_method"
                            value={receiptData.payment_method}
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
                        value={receiptData.category_id}
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
                            name="subcategory_name"
                            value={receiptData.subcategory_name}
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