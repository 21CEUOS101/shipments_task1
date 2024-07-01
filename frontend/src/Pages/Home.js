import Axios from 'axios';
import { Button } from '../components/ui/button';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
const xlsx = require('xlsx');

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

    const [errors, setErrors] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const fileName = selectedFile.name;

        // check if file is xl or xls or xlsx file type
        if (fileName) {
            if (fileName.split('.').pop() === 'xls' || fileName.split('.').pop() === 'xl' || fileName.split('.').pop() === 'xlsx') {
                console.log('file is valid');
            } else {
                console.log('file is invalid');
                setErrors('File must be of type .xl or .xls');
                return;
            }
        }

        console.log(fileName);
        const reader = new FileReader();
        var rowObject = [];

        reader.onload = (e) => {
            var data = e.target.result;
            var workbook = xlsx.read(data, { type: 'binary' });
            workbook.SheetNames.forEach(sheet => {
                console.log(sheet);
                rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);

                if (sheet === 'Company Data') {
                    // change field names to match the database field names
                    const updatedCompanyData = rowObject.map(item => {
                        return {
                            name: item['Company Name'],
                            address: item['Company Address'],
                            email: item['Company Email'],
                            website: item['Company Website'],
                            phone: item['Company Phone'],
                            employees: item['Number of Employees'],
                            founded: item['Founded Date'],
                            industry: item['Industry Type']
                        }
                    });
                    setCompanyData(updatedCompanyData);
                }
                else if (sheet === 'Contact Data') {
                    // change field names to match the database field names
                    const updatedContactData = rowObject.map(item => {
                        return {
                            name: item['Contact Name'],
                            email: item['Contact Email'],
                            phone: item['Contact Phone'],
                            dob: item['Date of Birth'],
                            type: item['Contact Type']
                        }
                    });

                    setContactData(updatedContactData);
                }
            });
        }
        reader.readAsBinaryString(selectedFile);
    }

    const uploadData = () => {
        console.log('upload data');
        
        console.log({
            companyData: companyData,
            contactData: contactData
        });
        
        Axios.post('http://localhost:3001/api/upload', {
            company :companyData,
            contact: contactData
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    const cancelUpload = () => {
        console.log('cancel upload');
        setCompanyData(null);
        setContactData(null);
    }

    useEffect(() => {
        
    }, [companyData]);

  return (
      <>
          {/* Upload .xl or .xls file */}
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group files">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name='excelFile' onChange={handleFileChange} />
                        </div>
                    </div>
              </div>
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
                      <TableHeader>
                      Number of Employees</TableHeader>
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

          {/* Display Errors */}
        
          <div className=' text-red-600 '>
            {errors}
          </div>

          {/* Upload and Cancel button for data */}
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                    <Button className="btn btn-primary" onClick={uploadData} >Upload</Button>
                    <Button className="btn btn-danger" onClick={cancelUpload}>Cancel</Button>
                </div>
              </div>
          </div>

      </>
  )
}

export default Home