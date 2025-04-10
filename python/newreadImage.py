from PIL import Image
from pytesseract import pytesseract
from pdf2image import convert_from_path
import os
import re
import mysql.connector
from mysql.connector import Error

#path to PDF file
image_path = r"C:\Users\giann\CEN4020-Software-Engineering-Group-3-Project\python\Receipts\Pub2.pdf"

#checks if file is found
if not os.path.exists(image_path):
    print("File not found:", image_path)
    exit(1)
else:
    print("File exists!")

#convert PDF to a list of images
images = convert_from_path(image_path)
  
#path to Tesseract executable 
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
  
#set the Tesseract executable location for pytesseract
pytesseract.tesseract_cmd = path_to_tesseract 
  
#use the first image
img = images[0]
  
#extract text from the image
text = pytesseract.image_to_string(img) 
print("Extracted text:")
print(text.rstrip())  #strip trailing whitespace

#regex patterns for receipt data
time_pattern = r"\d{1,2}:\d{2}(?:\s?[AP]M)?"
date_pattern = r"\d{1,2}(/|-)\d{1,2}(/|-)\d{2,4}"
payment_pattern = r"CASH|CREDIT CARD|DEBIT CARD|CREDIT|DEBIT"
total_pattern = r"(?:TOTAL|AMOUNT|GRAND TOTAL):?\s*\$?\s*(\d+(?:\.\d{2})?)"
address_pattern = r"^\d{1,5}\s[A-Z\s]+(?:AVE|ST|BLVD|DR|RD)(?:\.)?\n[A-Z\s]+,\s[A-Z]{2}\s\d{5}$"
phone_pattern = r"[:\t ]*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"
price_pattern = re.compile(r'(\d+\.\d{2})')


# Keywords that indicate summary lines that should not be parsed as items.
exclude_keywords = ["Total", "GRAND", "Order", "Tax", "Change", "Auth", "PRESTO", "Savings", "You Saved", "Credit Payment", "American Express"]

lines = text.split("\n")
items_found = []
i = 0

while i < len(lines):
    line = lines[i].strip()
    # Skip empty lines or lines that contain summary keywords
    if not line or any(kw in line for kw in exclude_keywords):
        i += 1
        continue

    #try to find price on the current line
    match = price_pattern.search(line)
    if match:
        #if a price is found, assume part before the price is the description.
        desc = line.split(match.group(1))[0].strip()
        price = float(match.group(1))
        #only add if description is not empty.
        if desc:
            items_found.append((desc, price))
        i += 1
    else:
        #if no price is found on the current line, check the next line for a price
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            match_next = price_pattern.search(next_line)
            if match_next:
                desc = line  #use the current line as the description
                price = float(match_next.group(1))
                items_found.append((desc, price))
                i += 2  #skip the next line (used it for the price)
                continue
        i += 1

print("\nItems found:")
for idx, (desc, price) in enumerate(items_found, start=1):
    print(f"{idx}. {desc} - ${price:.2f}")

#use regex to extract data
matchTime = re.search(time_pattern, text, re.IGNORECASE | re.MULTILINE)
matchDate = re.search(date_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPay = re.search(payment_pattern, text, re.IGNORECASE | re.MULTILINE)
matchTotal = re.search(total_pattern, text, re.IGNORECASE | re.MULTILINE)
matchAdd = re.search(address_pattern, text, re.IGNORECASE | re.MULTILINE)
matchPhn = re.search(phone_pattern, text)

#print extracted values
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


#function to insert data to database
# -------------------------------------------
def insert_into_db(total, rec_time, rec_date, pay_method, addr, phone_num):
    try:
        #create connection with database
        connection = mysql.connector.connect(
            host="cashpilot-db-1.c43w8q0oa2ju.us-east-1.rds.amazonaws.com", 
            user="cashpilotadmin",                
            password="shZBhkTS4lGd",         
            database="new_schema" #schema name
        )

        #checks if connection is created. If so, create cursor
        if connection.is_connected():
            cursor = connection.cursor()
            
            #create table if it does not exist
            create_table_query = """
            CREATE TABLE IF NOT EXISTS receipts (
                receipt_id INT AUTO_INCREMENT PRIMARY KEY,
                total VARCHAR(255),
                time VARCHAR(255),
                date VARCHAR(255),
                payment_method VARCHAR(255),
                address VARCHAR(500),
                phone VARCHAR(255)
            )
            """
            cursor.execute(create_table_query)


            #insert data into the table
            insert_query = """
                INSERT INTO receipts (total, time, date, payment_method, address, phone)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            data_tuple = (total, rec_time, rec_date, pay_method, addr, phone_num)
            cursor.execute(insert_query, data_tuple)
            receipt_id = cursor.lastrowid

            insert_query = """
                INSERT INTO item (receipt_id, description, price)
                VALUES (%s, %s, %s)
            """
            for (desc, price) in items_found:
                cursor.execute(insert_query, (receipt_id, desc, price))
            
            connection.commit() #commit changes
            print("Receipt data inserted successfully into the database.")

    except Error as e:
        print("Error while connecting to MySQL:", e)
    finally:
        #close connection to server
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed.")


#Call insert_into_db if data exists
if any([total_value, receipt_time, receipt_date, payment_method, address, phone]):
    insert_into_db(total_value, receipt_time, receipt_date, payment_method, address, phone)
else:
    print("No receipt data found to insert.")