# readimgandfillform.py
from PIL import Image
from pytesseract import pytesseract
from pdf2image import convert_from_path
import os
import json
import re
import sys

def main(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"Error: file not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)

    # 1) render first page of PDF → PIL image
    # poppler_path = r"C:\Users\terry\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"  # Replace with your actual poppler bin path

    images = convert_from_path(pdf_path)  # for VM poppler_path='/usr/bin'
    img = images[0]

    # 2) OCR
    path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    pytesseract.tesseract_cmd = path_to_tesseract
    # for VM: pytesseract.tesseract_cmd = '/usr/bin/tesseract'
    text = pytesseract.image_to_string(img)
    lines = [l.strip() for l in text.splitlines() if l.strip()]

    # 3) vendor name = first non‐empty line
    store_name = lines[0] if lines else ""

    # 4) patterns
    date_pattern    = r"\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4}"
    payment_pattern = r"CASH|CREDIT CARD|DEBIT CARD|CREDIT|DEBIT"
    total_pattern   = r"(?:TOTAL|AMOUNT|GRAND TOTAL):?\s*\$?\s*([\d\.]+)"
    address_pattern = r"^\d{1,5}\s+[A-Z0-9\s]+(?:AVE|ST|BLVD|DR|RD)[\S\s]+?\d{5}$"
    phone_pattern   = r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"
    price_pattern   = re.compile(r"(\d+\.\d{2})")

    # 5) extract date/payment/total/address/phone
    receipt_date    = first_match(date_pattern, text)
    payment_method  = first_match(payment_pattern, text, flags=re.IGNORECASE)
    total_value     = first_match(total_pattern, text, group=1, flags=re.IGNORECASE)
    store_address   = first_match(address_pattern, text, flags=re.IGNORECASE)
    store_phone     = first_match(phone_pattern, text)

    # 6) items: scan lines for prices (skip keywords)
    exclude = ["Total", "GRAND", "Order", "Tax", "Change", "Auth", 
               "PRESTO", "Savings", "You Saved", "Credit Payment", "American Express"]
    items = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if any(kw.lower() in line.lower() for kw in exclude):
            i += 1
            continue

        m = price_pattern.search(line)
        if m:
            desc = line[: m.start(1)].strip()
            price = float(m.group(1))
            if desc:
                items.append({"description": desc, "price": price})
            i += 1
        else:
            i += 1

    # 7) build the manual‐entry form payload
    form_data = {
        "storeName":        store_name,
        "storeAddress":     store_address or "",
        "storePhone":      store_phone or "",
        "dateOfPurchase":   receipt_date or "",
        "category":         "",            # fill in if you have logic
        "items":            items,
        "total":            total_value   or "",
        "paymentMethod":    payment_method or ""
    }

    # 8) output JSON only
    print(json.dumps(form_data))


def first_match(pattern, text, group=0, flags=0):
    m = re.search(pattern, text, flags)
    return m.group(group) if m else None


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python readImage.py <path_to_pdf>", file=sys.stderr)
        sys.exit(1)
    main(sys.argv[1])
