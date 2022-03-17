import React from "react";
import moment from "moment";

const BaseTable = ({ tableHeader, tenants, handleDelete }) => (
  <table className="table">
    <thead>
      <tr>
        {tableHeader.map((title) => (
          <th>{title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tenants &&
        tenants.map((tenant) => {
          return (
            <tr key={tenant.id}>
              <th>{tenant.id}</th>
              <td>{tenant.name}</td>
              <td>{tenant.paymentStatus}</td>
              <td>{moment(tenant.leaseEndDate).format("l")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(tenant.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
    </tbody>
  </table>
);

export default BaseTable;
