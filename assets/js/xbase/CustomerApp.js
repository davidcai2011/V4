import React, {useState, useEffect} from 'react';
import CustomersTable from './tables/CustomersTable';
// import Navbar from './Navbar';


const CustomerApp = () => {
    const [searchCustomer, setSearchCustomer] = useState("");

    const onChangeSearchCustomer = (e) => {
        const searchCustomer = e.target.value;
        setSearchCustomer(searchCustomer);

    };

    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    return (
        <div className="container">
            <div className="col-md-12">

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by customerName"
                        value={searchCustomer}
                        onChange={onChangeSearchCustomer}
                    />

                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        // onClick={fetchCustomerList}
                    >
                        Search
                    </button>

                </div>
            </div>
            <div className="col-md-12">
                <h4>Customers List</h4>

                <div className="row">
                    {loading || !customers ? (
                        <p>Loading...</p>
                    ) : (

                        <div className="table-responsive col-md-12">

                            <div className="seven columns">

                                <CustomersTable
                                    customers={customers}
                                    // deleteCustomer={deleteCustomer}
                                    // editCustomer={editCustomer}
                                />

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerApp
