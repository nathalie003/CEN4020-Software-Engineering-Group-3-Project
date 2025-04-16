// ManualEntryForm.js
import React, { useState, useEffect } from 'react';

function ManualEntryForm({ initialData, onConfirm }) {
  // pull in total, time, date, payment_method, address, phone, items
  const [form, setForm] = useState({
    total: '', time: '', date: '',
    payment_method:'', address:'', phone:'',
    status: 'Pending'
  });

  // when OCR returns, seed the form
  useEffect(()=>{
    if (!initialData) return;
    setForm({
      ...form,
      total: initialData.total || '',
      time:  initialData.time  || '',
      date:  initialData.date  || '',
      payment_method: initialData.payment_method|| '',
      address: initialData.address|| '',
      phone: initialData.phone   || '',
      status: 'Pending'
    });
  }, [initialData]);

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <form onSubmit={handleSubmit} className="manualEntryForm">
      <input name="total"            value={form.total}            onChange={handleChange} />
      <input name="time"             value={form.time}             onChange={handleChange} />
      <input name="date"             value={form.date}             onChange={handleChange} />
      <input name="payment_method"   value={form.payment_method}   onChange={handleChange} />
      <textarea name="address"       value={form.address}          onChange={handleChange} />
      <input name="phone"            value={form.phone}            onChange={handleChange} />
      {/* status is hidden but submitted */}
      <input type="hidden" name="status" value={form.status} />

      <button type="submit">Submit to Database</button>
    </form>
  );
}

export default ManualEntryForm;
