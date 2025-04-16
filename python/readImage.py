# readImage.py file
from PIL import Image
from pytesseract import pytesseract
from pdf2image import convert_from_path
import os
import json
import re
import sys

# -------------------------------------------
# YOUR RECEIPT PARSING CODE STARTS HERE
# -------------------------------------------

if len(sys.argv) < 2:
    print("Usage: python readImage.py <path_to_pdf>")
    exit(1)

image_path = sys.argv[1]
if not os.path.exists(image_path):
    print("File not found:", image_path)
    exit(1)
# else:
    # print("File exists!")

# Convert PDF to a list of images, specifying poppler_path
# poppler_path = r"C:\Users\terry\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"  # Replace with your actual poppler bin path
images = convert_from_path(image_path, poppler_path='/usr/bin')

# Path to Tesseract executable 
path_to_tesseract = '/usr/bin/tesseract'

# Set the Tesseract executable location for pytesseract
pytesseract.tesseract_cmd = path_to_tesseract

# Use the first image (or adjust if the PDF contains multiple pages)
img = images[0]

# Extract text from the image
text = pytesseract.image_to_string(img)
# print("Extracted text:")
# print(text.rstrip())  # strip trailing whitespace

# Regex patterns for receipt data
time_pattern = r"\d{1,2}:\d{2}(?:\s?[AP]M)?"
date_pattern = r"\d{1,2}(/|-)\d{1,2}(/|-)\d{2,4}"
payment_pattern = r"CASH|CREDIT CARD|DEBIT CARD|CREDIT|DEBIT"
total_pattern = r"(?:TOTAL|AMOUNT|GRAND TOTAL):?\s*\$?\s*(\d+(?:\.\d{2})?)"
address_pattern = r"^\d{1,5}\s[A-Z\s]+(?:AVE|ST|BLVD|DR|RD)(?:\.)?\n[A-Z\s]+,\s[A-Z]{2}\s\d{5}$"
phone_pattern = r"[:\t ]*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"
price_pattern = re.compile(r'(\d+\.\d{2})')

# Keywords that indicate summary lines that should not be parsed as items
exclude_keywords = [
    "Total", "GRAND", "Order", "Tax", "Change", "Auth", 
    "PRESTO", "Savings", "You Saved", "Credit Payment", "American Express"
]

lines = text.split("\n")
items_found = []
i = 0

while i < len(lines):
    line = lines[i].strip()
    # Skip empty lines or lines that contain summary keywords
    if not line or any(kw in line for kw in exclude_keywords):
        i += 1
        continue

    # Try to find a price on the current line
    match = price_pattern.search(line)
    if match:
        # If a price is found, assume the part before the price is the description.
        desc = line.split(match.group(1))[0].strip()
        price = float(match.group(1))
        # Only add if description is not empty.
        if desc:
            items_found.append((desc, price))
        i += 1
    else:
        # If no price on the current line, check the next line for a price
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            match_next = price_pattern.search(next_line)
            if match_next:
                desc = line  # Use current line as the description
                price = float(match_next.group(1))
                items_found.append((desc, price))
                i += 2  # Skip the next line (we used it for the price)
                continue
        i += 1

# Optional debugging for items:
# print("\nItems found:")
# for idx, (desc, price) in enumerate(items_found, start=1):
#     print(f"{idx}. {desc} - ${price:.2f}")

# Use regex to extract other receipt data
matchTime = re.search(time_pattern, text, re.IGNORECASE | re.MULTILINE)
matchDate = re.search(date_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPay = re.search(payment_pattern, text, re.IGNORECASE | re.MULTILINE)
matchTotal = re.search(total_pattern, text, re.IGNORECASE | re.MULTILINE)
matchAdd = re.search(address_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPhn = re.search(phone_pattern, text, re.IGNORECASE | re.MULTILINE)

if matchTotal:
    total_value = matchTotal.group(1)
else:
    total_value = None

if matchTime:
    receipt_time = matchTime.group()
else:
    receipt_time = None

if matchDate:
    receipt_date = matchDate.group()
else:
    receipt_date = None

if matchPay:
    payment_method = matchPay.group().title()
else:
    payment_method = None

if matchAdd:
    address = matchAdd.group()
else:
    address = None

if matchPhn:
    phone = matchPhn.group()
else:
    phone = None

# print("="*40)

# Convert items_found (list of tuples) into an array of item objects
let_items = [{"description": desc, "price": price} for (desc, price) in items_found]
# In Python, you can use a list comprehension:
items_array = [{"description": desc, "price": price} for (desc, price) in items_found]

# Build a dictionary with the extracted data, including the items array.
receipt_data = {
    "total": total_value,
    "time": receipt_time,
    "date": receipt_date,
    "payment_method": payment_method,
    "address": address,
    "phone": phone,
    "items": items_array
}

# Print the dictionary as JSON
print(json.dumps(receipt_data))
