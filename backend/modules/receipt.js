//receipt.js file
class Receipt {
    //create a new Receipt instance
    constructor(receiptID, imageData) {
      this._receiptID = receiptID; //unique identifier for the receipt.
      this._imageData = imageData; //binary data for the receipt image (going to use hash later)
    }
    //getter for receiptID
    get receiptID() {
      return this._receiptID;
    }
    //setter for receiptID
    set receiptID(newID) {
      this._receiptID = newID;
    }
    //getter for imageData
    get imageData() {
      return this._imageData;
    }
    //setter for imageData
    set imageData(newData) {
      this._imageData = newData;
    }
    //returns the raw binary data for the receipt.
    getRawData() {
      return this._imageData;
    }
  }
  //example usage
  const fs = require('fs');
  //read an image file as a Buffer
  const imageBuffer = fs.readFileSync('path/to/receipt-image.png');
  //create a new Receipt instance
  const receipt = new Receipt(101, imageBuffer);
  
  console.log('Receipt ID:', receipt.receiptID);
  console.log('Raw Image Data:', receipt.getRawData());
  