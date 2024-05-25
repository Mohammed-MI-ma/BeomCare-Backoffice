import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "Nom du partenaire",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Numéro de téléphone",
    width: 100,
    dataIndex: "age",
    key: "age",
    sorter: true,
  },
  {
    title: "Catégorie",
    width: 100,
    dataIndex: "age",
    key: "age",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "address",
    key: "1",
  },
  {
    title: "Validé",
    dataIndex: "address",
    key: "2",
  },
  {
    title: "Crée le",
    dataIndex: "address",
    key: "2",
  },

  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];
const TablePartners = () => (
  <div style={{ maxWidth: "90vw" }}>
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      scroll={{
        x: 1300,
      }}
      bordered
      pagination={{ pageSize: 5 }} // Set the number of rows per page
    />
  </div>
);
export default TablePartners;
