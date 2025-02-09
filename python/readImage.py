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

address_pattern = r"^\d{1,5}\s[A-Z\s]+(?:AVE|ST|BLVD|DR|RD)\n[A-Z\s]+,\s[A-Z]{2}\s\d{5}$"

match = re.search(address_pattern, text, re.IGNORECASE | re.MULTILINE)

if match:
    print("\nAddress:", match.group())