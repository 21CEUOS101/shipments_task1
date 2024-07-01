# Data Import Functionality for Company and Contact Models

## Objective
Implemented a feature that allows users to upload an Excel sheet containing company and contact data. Upon upload, display the data in a table for review and confirmation before storing it in the database.

## Requirements
1. **Upload Feature**: Allow users to upload an Excel (.xls or .xlsx) file containing data for companies and contacts:
    - **Company Model**:
        - Company Name (string, required)
        - Company Address (string, optional)
        - Company Phone (string, optional)
        - Company Email (string, optional)
        - Company Website (string, optional)
        - Number of Employees (integer, optional)
        - Founded Date (date, optional)
        - Industry Type (enum: "Technology", "Finance", "Healthcare", "Retail", "Other", required)
    - **Contact Model**:
        - Contact Name (string, required)
        - Contact Email (string, required)
        - Contact Phone (string, optional)
        - Date of Birth (date, optional)
        - Contact Type (enum: "Primary", "Secondary", "Other", required)
    - Company can have multiple contacts.

2. **Displayed Table**: Displayed the contents of the uploaded Excel sheet in a table format for user review.

3. **Database Storage**: Stored the validated data into the database after user confirmation.

4. **Data Validation**: Validated the uploaded data to ensure it meets the required format and constraints (e.g., data types, mandatory fields).

5. **Error Handling**: Handling errors gracefully and provide feedback to users in case of invalid data or other issues during the upload process.

---

## Usage Instructions

### Uploading an Excel File
1. Click on the "Choose File" button and select an Excel (.xls or .xlsx) file.
2. Click on the "Upload" button to upload the file.
3. Cancel Upload If you want to.

### Reviewing Data
1. After uploading, the data from the Excel file will be displayed in a table format.
2. Review the data to ensure it is correct.

### Confirming Upload
1. If the data is correct, click on the "Upload" button to store the data in the database.
2. If there are errors or issues, click on the "Cancel" button to discard the upload.

### Handling Errors
1. If there are any errors during the upload or validation process, appropriate error messages will be displayed.
2. Follow the instructions in the error messages to resolve any issues.

---

## Technical Setup

### Frontend
- ReactJs is used for the file upload form and table display.

### Backend
- Express (Node.js) for handling and database storage.

### Database
- Database schema for Company and Contact models.

## Installation

### Clone the repository
```bash
git clone
