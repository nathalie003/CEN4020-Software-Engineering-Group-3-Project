from PIL import Image 
from pytesseract import pytesseract 
from pdf2image import convert_from_path
import os
import re

image_path = r"C:\SWE-Project\EERIS-3v2\CEN4020-Software-Engineering-Group-3-Project\python\Receipts\Pub2.pdf"
if not os.path.exists(image_path):
    print("File not found:", image_path)
else:
    print("File exists!")
images = convert_from_path(image_path)
  
# Defining paths to tesseract.exe 
# and the image we would be using 
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

  
# Opening the image & storing it in an image object 
img = images[0]
  
# Providing the tesseract executable 
# location to pytesseract library 
pytesseract.tesseract_cmd = path_to_tesseract 
  
# Passing the image object to image_to_string() function 
# This function will extract the text from the image 
text = pytesseract.image_to_string(img) 
  
# Displaying the extracted text 
print(text[:-1])

'''
 You may save several receipts per photo/page as long as each receipt clearly shows its data of name,
 phone, address, web site (if available) of store/shop/payee, date and time of the receipt, 
 description of line items of purchase or service charged, total payment, and pay method.
'''
print("="*40)
time_pattern = r"\d{1,2}:\d{2}(?:\s?[AP]M)?" 
date_pattern = r"\d{1,2}(/|-)\d{1,2}(/|-)\d{2,4}"
payment_pattern = r"CASH|CREDIT CARD|DEBIT CARD|CREDIT|DEBIT"
total_pattern = r"(?:TOTAL|AMOUNT|GRAND TOTAL):?\s*\$?\s*(\d+(?:\.\d{2})?)"
address_pattern = r"^\d{1,5}\s[A-Z\s]+(?:AVE|ST|BLVD|DR|RD)(?:\.)?\n[A-Z\s]+,\s[A-Z]{2}\s\d{5}$"
phone_pattern = r"[:\t ]*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"

matchTime = re.search(time_pattern, text, re.IGNORECASE | re.MULTILINE)
matchDate = re.search(date_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPay = re.search(payment_pattern, text, re.IGNORECASE | re.MULTILINE)
matchTotal = re.search(total_pattern, text, re.IGNORECASE | re.MULTILINE)
matchAdd = re.search(address_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPhn = re.search(phone_pattern, text)

if matchTotal:
    print("\nTotal: $"+matchTotal.group(1))
if matchTime:
    print("\nTime:", matchTime.group())
if matchDate:
    print("\nDate:", matchDate.group())
if matchPay:
    print("\nPayment Method:", matchPay.group().title())
if matchAdd:
    print("\nAddress:", matchAdd.group())
if matchPhn:
    print("\nPhone:", matchPhn.group())