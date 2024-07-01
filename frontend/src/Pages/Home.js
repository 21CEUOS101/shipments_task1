import React, { useEffect, useState } from 'react'

const Home = () => {

    const [file, setFile] = useState(null);

    const [errors, setErrors] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        console.log(file);

        // check if file is xl or xls file type
        if (file) {
            if (file.name.split('.').pop() === 'xls' || file.name.split('.').pop() === 'xl') {
                console.log('file is valid');
            } else {
                console.log('file is invalid');
                setErrors('File must be of type .xl or .xls');
            }
        }

    }, [file]);

  return (
      <>
          {/* Upload .xl or .xls file */}
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group files">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" multiple="" onClick={handleFileChange} />
                        </div>
                    </div>
              </div>
          </div>
          {/* Display the data from the file */}
        
          <h2>Company Data</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Company Address</th>
                            <th>Company Phone</th>
                            <th>Company Email</th>
                            <th>Company Website</th>
                            <th>Number of Employees</th>
                            <th>Founded Date</th>
                            <th>Industry Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Company Name</td>
                            <td>Company Address</td>
                            <td>Company Phone</td>
                            <td>Company Email</td>
                            <td>Company Website</td>
                            <td>Number of Employees</td>
                            <td>Founded Date</td>
                            <td>Industry Type</td>
                        </tr>
                    </tbody>
                </table>

          {/* Display Errors */}
        
          <div className=' text-red-600 '>
            {errors}
          </div>

      </>
  )
}

export default Home