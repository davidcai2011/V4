import React, {useState, useEffect} from 'react';
import CustomersTable from './tables/CustomersTable';
import Pagination from "@material-ui/lab/Pagination";
import EditCustomerForm from "./forms/EditCustomerForm";
import AddCustomerForm from "./forms/AddCustomerForm";


const CustomerApp = () => {
    const [searchCustomer, setSearchCustomer] = useState("");
    const [page, setPage] = useState(1);
    const [pagecount, setPagecount] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const pageSizes = [4, 8, 12];

    const onChangeSearchCustomer = (e) => {
        const searchCustomer = e.target.value;
        setSearchCustomer(searchCustomer);

    };

    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    const [editing, setEditing] = useState(false);
    const initialCustomer = { id: null, customerName: "", company: "" };
    const [currentCustomer, setCurrentCustomer] = useState(initialCustomer);

    const handlePageChange = (event, value) => {
        setPage(value);

    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        //   setPage(1);
    };
    const addCustomer = customer => {

        setCustomers([...customers, customer]);

        //   delete customer.id;


        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        };

        // console.log('json'+JSON.stringify(customer));
        // fetch('http://localhost:8099/api/customers', requestOptions)
        //     .then(response => response.json())
        //     .then(res => console.log(res));
        //
        //
        // fetchCustomerList();

        // console.log(customer);
        // axios.post('http://localhost:8090/api/customers', requestOptions)
        //     .then(function (response) {
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Customer saved successfully!',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //
        //     })
        //     .catch(function (error) {
        //         console.log('Error', error.response.data);
        //         Swal.fire({
        //             icon: 'error',
        //             title: {error},
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //
        //     })

    }

    const updateCustomer = (newCustomer) => {
        setCustomers(
            customers.map((customer) => (customer.id === currentCustomer.id ? newCustomer : customer))
        );
        setCurrentCustomer(initialCustomer);

        setEditing(false);

        // updateCustomer(newUser.id, newUser);
        const id=newCustomer.id;
        //   delete newCustomer.id;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCustomer)
        };

        // fetch(`/customers/${id}`, requestOptions)
        //     .then(response => response.json())
        //     .then(res => console.log(res));
    };

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
                            <div className="mt-3">
                                {"Items per Page: "}
                                <select  onChange={handlePageSizeChange} value={pageSize}>
                                    {pageSizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}

                                </select>
                                <Pagination
                                    className="my-3"
                                    count={pagecount}
                                    page={page}
                                    siblingCount={0}
                                    boundaryCount={1}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handlePageChange}
                                />
                            </div>

                            <div className="five columns">
                                {editing ? (
                                    <div>
                                        <h2>Edit customer</h2>
                                        <EditCustomerForm
                                            currentCustomer={currentCustomer}
                                            setEditing={setEditing}
                                            updateCustomer={updateCustomer}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <h2>Add customer</h2>
                                        <AddCustomerForm addCustomer={addCustomer} />
                                    </div>
                                )}
                            </div>

                        </div>



                    )}
                </div>
            </div>


        </div>
    );
}

export default CustomerApp
