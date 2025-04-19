import React, {useState, useEffect, useRef} from 'react';

import './StaticReport.css';

function StaticReport ({selectedReceiptID, goBack}) {
    console.log("StaticReport mounted with receipt ID:", selectedReceiptID);
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
        category_name: "",
        subcategory_name: "",
        items: [ { item_description: "", item_price: "" } ],
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

                const category = catData.find(cat => cat.category_id === receiptInfo.reports[0].category_id);
                if (category) {
                    receiptInfo.reports[0].category_name = category.category_name; // Assign category_name to receiptInfo
                }
      
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
                    items: itemsData.reports || [],
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
    return(
        <div id="static">
            <div className="viewHeader">
                <button onClick={goBack} >&lt; Back</button>
                <h2>View Report</h2>
            </div>
            <div className="staticReport">
                <label>
                    Store Name:
                    <input className="fullWidthInput"
                        type="text"
                        name="store_name"
                        value={receiptData.store_name}
                        placeholder="-----"
                        readOnly
                    />
                </label>
                <label>
                    Store Address:
                    <input className="fullWidthInput"
                        type="text"
                        name="store_address"
                        value={receiptData.store_address}
                        placeholder="-----"
                        readOnly
                    />
                </label>
                <label>
                    Store Website:
                    <input className="fullWidthInput"
                        type="text"
                        name="store_website"
                        value={receiptData.store_website}
                        placeholder="-----"
                        readOnly
                    />
                </label>
                <div className="twoColumnLayout">
                    <label className="halfItem1">
                        Store Phone:
                        <input
                            type="text"
                            name="store_phone"
                            value={receiptData.store_phone}
                            placeholder="-----"
                            readOnly
                        />
                    </label>
                    <label className="halfItem2">
                        Date of Purchase:
                        <input
                            type="text"
                            name="receipt_date"
                            value={receiptData.receipt_date}
                            placeholder="-----"
                            readOnly
                        />
                    </label>
                </div>
                <div className="items-section">
                    <label>Items Purchased:
                    {receiptData.items.map((it, i) => (
                        <div key={i} className="item-row-static">
                            <input id="descSR"
                                type="text"
                                placeholder="-----"
                                value={it.item_description}
                                readOnly
                            />
                            <input id="priceSR"
                                type="text"
                                placeholder="-----"
                                value={it.item_price}
                                readOnly
                            />
                        </div>
                    ))}
                    </label>
                </div>
                <div className="twoColumnLayout">
                    <div className="halfItem1">
                        <label>
                            Total:
                            <input
                                type="text"
                                name="receipt_total"
                                value={receiptData.receipt_total}
                                placeholder="-----"
                                readOnly
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
                                placeholder="-----"
                                readOnly
                            />
                        </label>
                    </div>
                </div>
                <div className="twoColumnLayout">
                    <div className="halfItem1">
                        <label>
                            Category:
                            <input
                                type="text"
                                name="category_name"
                                value={receiptData.category_name}
                                readOnly
                            />
                        </label>
                    </div>
                    <div className="halfItem2">
                        <label>
                            Subcategory:
                            <input 
                                type="text"
                                name="subcategory_name"
                                value={receiptData.subcategory_name}
                                placeholder="-----"
                                readOnly
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaticReport;