// DashboardLanding.js
import React, { useState, useEffect } from "react";
import "../Home Page/templatemo.css";
import "../../Design Functionality/boxicon.min.css";
import "../../Design Functionality/bootstrap.min.css";
import "../../Design Functionality/fslightbox.js";
import "../../Design Functionality/jquery.min.js";
import { Bar, Pie } from "react-chartjs-2";
import { Table, Container, Row, Col, Form } from "react-bootstrap";

function DashboardLanding() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});
  const [supervisorId, setSupervisorId] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    

    if (username) {
      fetch(`http://localhost:5000/api/supervisor/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setSupervisorId(data.id); // 👈 supervisor id
          fetchEmployees(data.id); // Fetch the employees assigned to this supervisor
        })
        .catch((err) => console.error("Error fetching supervisor:", err));
    }
  }, []);

  const fetchEmployees = (supervisorId) => {
    fetch("http://localhost:5000/api/employeesBySupervisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supervisorId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        fetchAnalytics(supervisorId); // Get chart data after employees loaded
      })
      .catch((err) => console.error("Error fetching employees:", err));
  };

  const fetchAnalytics = (supervisorId) => {
    fetch("http://localhost:5000/api/supervisorAnalytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supervisorId }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setup bar chart and pie chart here
      })
      .catch((err) => console.error("Error fetching analytics:", err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4 text-center">Supervisor Dashboard</h2>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search employee by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee Username</th>
            <th>Total Expense Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.username}</td>
              <td>${emp.total_expenses?.toFixed(2) || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="my-5">
        <Col md={6}>
          <h4 className="text-center">Expenses by Category</h4>
          <Bar data={barData} />
        </Col>
        <Col md={6}>
          <h4 className="text-center">Category Distribution</h4>
          <Pie data={pieData} />
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardLanding;
