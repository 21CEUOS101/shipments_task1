import Axios from "axios";
import { Button } from "../components/ui/button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import Company from "../Models/Company";
import Contact from "../Models/Contact";
const BACKEND_URL = "https://shipments-task1.onrender.com/api/upload";
const xlsx = require("xlsx");

const TableWrapper = styled.div`
  max-height: 450px;
  overflow-y: auto;
  width: 1000px;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Table1 = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  font-weight: bold;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
`;

const TableBodyRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Home = () => {
  const [companyData, setCompanyData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [message, setMessage] = useState();

  const validateFileExtension = (fileName) => {
    console.log(fileName);
    // check if file is xl or xls or xlsx file type
    if (fileName) {
      if (
        fileName.split(".").pop() === "xls" ||
        fileName.split(".").pop() === "xl" ||
        fileName.split(".").pop() === "xlsx"
      ) {
        console.log("file is valid");
        return true
      } else {
        console.log("file is invalid");
        setMessage({ message : "File must be of type .xl or .xls" , type: "error"});
        return false;
      }
    }
  };

  // validate company data according to the schema
  const validateCompanyData = (companyData) => {
    companyData?.forEach(async (item, index) => {
      const company = await Company.validate(item);
      if (!company) {
        setMessage({ message : "Company data is invalid At " + index + " : " + item.name , type: "error"});
        return false;
      }
    });
    
    return true;
  };

  // validate contact data according to the schema
  const validateContactData = (contactData) => {
    contactData?.forEach(async(item, index) => {
      const contact = await Contact.validate(item);
      if (!contact) {
        setMessage({message : "Contact data is invalid At " + index + " : " + item.name , type: "error"});
        return false;
      }
    });
    
    return true;
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileName = selectedFile.name;

    if (!validateFileExtension(fileName)) {
      return;
    }
    
    const reader = new FileReader();
    var rowObject = [];

    reader.onload = (e) => {
      var data = e.target.result;
      var workbook = xlsx.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        console.log(sheet);
        rowObject = xlsx.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.log(rowObject);

        if (sheet === "Company Data") {
          // change field names to match the database field names
          const updatedCompanyData = rowObject.map((item) => {
            return {
              name: item["Company Name"],
              address: item["Company Address"],
              email: item["Company Email"],
              website: item["Company Website"],
              phone: item["Company Phone"],
              employees: item["Number of Employees"],
              founded: item["Founded Date"],
              industry: item["Industry Type"],
            };
          });
          setCompanyData(updatedCompanyData);
        } else if (sheet === "Contact Data") {
          // change field names to match the database field names
          const updatedContactData = rowObject.map((item) => {
            return {
              name: item["Contact Name"],
              email: item["Contact Email"],
              phone: item["Contact Phone"],
              dob: item["Date of Birth"],
              type: item["Contact Type"],
            };
          });

          setContactData(updatedContactData);
        }
        else
        {
          setMessage({ message : "Sheet name is invalid , Sheet name should be Company Data and Contact Data." , type: "error"});
        }
      });
    };
    reader.readAsBinaryString(selectedFile);
  };

  const uploadData = () => {
    Axios.post(BACKEND_URL, {
      company: companyData,
      contact: contactData,
    })
      .then((response) => {
        setMessage({ message : "Data uploaded successfully" , type: "success"});
        console.log(response);
      })
      .catch((error) => {
        setMessage({ message : "Error uploading data" , type: "error"});
        console.log(error);
      });
  };

  const cancelUpload = () => {
    console.log("cancel upload");
    setCompanyData(null);
    setContactData(null);
    setMessage({ message : "" , type: ""});
  };

  useEffect(() => {
      if (companyData && contactData) {
        if (!validateCompanyData(companyData) || !validateContactData(contactData)) {
          setMessage({ message : "Data is invalid" , type: "error"});
        } else {
          setMessage({ message : "Data is valid" , type: "success"});
        }
      }
      else
      {
        setMessage({ message : "" , type: ""});
      }
  }
    , [companyData , contactData]);

  return (
    <div
      className="container mx-auto p-4"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Upload .xl or .xls file */}
      <div className="container mx-auto p-4">
        <Label>Upload Your File </Label>
        <Input
          type="file"
          className="form-control"
          name="excelFile"
          onChange={handleFileChange}
        />
      </div>

      {/* Display the data from the file */}

      <TableWrapper>
        <Table1>
          <thead>
            <tr>
              <TableHeader>Sr No.</TableHeader>
              <TableHeader>company Name</TableHeader>
              <TableHeader>company address</TableHeader>
              <TableHeader>company email</TableHeader>
              <TableHeader>company website</TableHeader>
              <TableHeader>company phone</TableHeader>
              <TableHeader>company founded date</TableHeader>
              <TableHeader>Industry Type</TableHeader>
              <TableHeader>Number of Employees</TableHeader>
            </tr>
          </thead>
          <tbody>
            {companyData?.map((item, index) => (
              <TableBodyRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.address}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.website}</TableCell>
                <TableCell>{item?.phone}</TableCell>
                <TableCell>{item?.founded}</TableCell>
                <TableCell>{item?.industry}</TableCell>
                <TableCell>{item?.employees}</TableCell>
              </TableBodyRow>
            ))}
          </tbody>
        </Table1>

        <Table1>
          <thead>
            <tr>
              <TableHeader>Sr No.</TableHeader>
              <TableHeader>Contact Name</TableHeader>
              <TableHeader>Contact Email</TableHeader>
              <TableHeader>Contact Phone</TableHeader>
              <TableHeader>Date of Birth</TableHeader>
              <TableHeader>Contact Type</TableHeader>
            </tr>
          </thead>
          <tbody>
            {contactData?.map((item, index) => (
              <TableBodyRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.phone}</TableCell>
                <TableCell>{item?.dob}</TableCell>
                <TableCell>{item?.type}</TableCell>
              </TableBodyRow>
            ))}
          </tbody>
        </Table1>
      </TableWrapper>

      {/* Display Messages type : errors and success */}
      {/* Display in red if error and green if success */}
      <div className="container mx-auto p-4">
        <div
          className={`${
            message?.type === "error" ? "bg-red-200" : message?.type === "success" ? "bg-green-200" : ""
          } p-4`}
        >
          {message?.message}
        </div>
      </div>

      {/* Upload and Cancel button for data */}
      <div className="mx-auto">
        <div className="flex justify-center">
          <div className="md:w-1/2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 my-2"
              onClick={uploadData}
            >
              Upload
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={cancelUpload}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
