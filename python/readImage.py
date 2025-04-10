#readImage.py file
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
else:
    print("File exists!")
# Convert PDF to a list of images, specifying poppler_path
poppler_path = r"C:\Users\terry\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"  # Replace with the actual path where you extracted Poppler
images = convert_from_path(image_path, poppler_path=poppler_path)

# Path to Tesseract executable 
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Set the Tesseract executable location for pytesseract
pytesseract.tesseract_cmd = path_to_tesseract 
  
# Use the first image (or adjust if the PDF contains multiple pages)
img = images[0]
  
# Extract text from the image
text = pytesseract.image_to_string(img) 
print("Extracted text:")
print(text.rstrip())  # strip trailing whitespace

# Define regex patterns for various receipt data
time_pattern = r"\d{1,2}:\d{2}(?:\s?[AP]M)?"
date_pattern = r"\d{1,2}(/|-)\d{1,2}(/|-)\d{2,4}"
payment_pattern = r"CASH|CREDIT CARD|DEBIT CARD|CREDIT|DEBIT"
total_pattern = r"(?:TOTAL|AMOUNT|GRAND TOTAL):?\s*\$?\s*(\d+(?:\.\d{2})?)"
address_pattern = r"^\d{1,5}\s[A-Z\s]+(?:AVE|ST|BLVD|DR|RD)(?:\.)?\n[A-Z\s]+,\s[A-Z]{2}\s\d{5}$"
phone_pattern = r"[:\t ]*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"

# Use regex to extract data
matchTime = re.search(time_pattern, text, re.IGNORECASE | re.MULTILINE)
matchDate = re.search(date_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPay = re.search(payment_pattern, text, re.IGNORECASE | re.MULTILINE)
matchTotal = re.search(total_pattern, text, re.IGNORECASE | re.MULTILINE)
matchAdd = re.search(address_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPhn = re.search(phone_pattern, text)

# Print extracted values
if matchTotal:
    total_value = matchTotal.group(1)
    print("\nTotal: $" + total_value)
else:
    total_value = None

if matchTime:
    receipt_time = matchTime.group()
    print("\nTime:", receipt_time)
else:
    receipt_time = None

if matchDate:
    receipt_date = matchDate.group()
    print("\nDate:", receipt_date)
else:
    receipt_date = None

if matchPay:
    payment_method = matchPay.group().title()
    print("\nPayment Method:", payment_method)
else:
    payment_method = None

if matchAdd:
    address = matchAdd.group()
    print("\nAddress:", address)
else:
    address = None

if matchPhn:
    phone = matchPhn.group()
    print("\nPhone:", phone)
else:
    phone = None

print("="*40)

#dictionary with the extracted data.
receipt_data = {
    "total": total_value,
    "time": receipt_time,
    "date": receipt_date,
    "payment_method": payment_method,
    "address": address,
    "phone": phone
}

# Print as JSON
print(json.dumps(receipt_data))
