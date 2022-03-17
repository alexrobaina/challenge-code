import React, { useEffect, useState } from "react";
import BaseTable from "./components/commons/BaseTable/BaseTable";
import Layout from "./components/commons/Layout/Layout";
import { Service } from "./Service";
import FiltersActions from "./components/FiltersActions";
import { TABLE_HEADER } from "./contants";
import BaseButton from "./components/commons/BaseButton/BaseButton";
import BaseTitle from "./components/commons/BaseTitle/BaseTitle";
import BaseInput from "./components/commons/BaseInput/BaseInput";
import moment from "moment";

function App() {
  const [tenants, setTenants] = useState();
  const [canAddNewTenant, setCanAddNewTenant] = useState(false);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("CURRENT");
  const [filter, setFilter] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [errorLeaseEndDate, setErrorLeaseEndDate] = useState("");

  const deleteTenant = async (id) => {
    await Service.deleteTenant(id);
    getTenants();
  };

  const getTenants = async () => {
    const result = await Service.getTenants();
    setTenants(result);
  };

  const handlePaymentLate = async () => {
    const result = await Service.sortPaymentLate();
    setTenants(result);
  };

  const handleLeaseEndDate = async () => {
    const result = await Service.sortLeaseEndDate();
    setTenants(result);
  };

  const handleSelectFilter = async (filterType) => {
    if (filterType === "All") {
      setFilter(filterType);
      return getTenants();
    }
    if (filterType === "Payment is late") {
      setFilter(filterType);
      return handlePaymentLate();
    }
    if (filterType === "Lease ends in less than a month") {
      setFilter(filterType);
      return handleLeaseEndDate();
    }
    getTenants();
  };

  const validateInputs = () => {
    const leaseEnd = moment(leaseEndDate).valueOf();
    const currentDate = moment().valueOf();
    resetErrors();

    let isValid = true;
    if (name.length < 25) {
      setErrorName("The name should have 25 characters");
      isValid = false;
    }
    if (leaseEnd > currentDate) {
      setErrorLeaseEndDate(`I can't select dates in the future`);
      isValid = false;
    }
    if (!leaseEndDate) {
      setErrorLeaseEndDate(`Please set a date`);
      isValid = false;
    }

    return isValid;
  };

  const handleChangeName = (event) => {
    validateInputs();
    return setName(event.target.value);
  };

  const handleChangeLeaseEndDate = (event) => {
    resetErrors();
    setLeaseEndDate(event.target.value);
  };

  const handleChangesetPaymentStatus = (event) => {
    setPaymentStatus(event.target.value);
  };

  const showFormNewTenant = () => {
    setCanAddNewTenant(true);
  };

  const hideFormNewTenant = () => {
    setCanAddNewTenant(false);
  };

  const resetErrors = () => {
    setErrorName("");
    setErrorLeaseEndDate("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateInputs()) {
      const data = {
        name,
        leaseEndDate,
        paymentStatus,
      };
      await Service.addTenant(data);
      getTenants();
    }
  };

  useEffect(() => {
    getTenants();
  }, []);

  return (
    <Layout>
      <div>
        <BaseTitle text="Tenants" />
        <FiltersActions
          filterSelected={filter}
          handleSelectFilter={handleSelectFilter}
        />
        <BaseTable
          tenants={tenants}
          tableHeader={TABLE_HEADER}
          handleDelete={deleteTenant}
        />
      </div>
      <div className="container">
        <BaseButton
          text="Add Tenant"
          handleButton={showFormNewTenant}
          stylesButton="btn btn-secondary"
        />
      </div>
      {canAddNewTenant && (
        <div className="container mt-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <BaseInput
                value={name}
                label="Name"
                error={errorName}
                handleChange={handleChangeName}
              />
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <select
                className="form-control"
                onChange={handleChangesetPaymentStatus}
              >
                <option>CURRENT</option>
                <option>LATE</option>
              </select>
            </div>
            <div className="form-group">
              <BaseInput
                type="date"
                value={leaseEndDate}
                label="Lease End Date"
                error={errorLeaseEndDate}
                handleChange={handleChangeLeaseEndDate}
              />
            </div>
            <BaseButton stylesButton="btn btn-primary" text="Save" />
            <BaseButton
              text="Cancel"
              stylesButton="btn"
              handleButton={hideFormNewTenant}
            />
          </form>
        </div>
      )}
    </Layout>
  );
}

export default App;
