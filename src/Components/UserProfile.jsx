import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userColumns, setUserColumns] = useState([]);
  const [record, setRecord] = useState([]);
  const [addressColumns, setAddressColumns] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [phoneColumns, setPhoneColumns] = useState([]);
  const [phones, setPhones] = useState([]);
  const [infoColumns, setInfoColumns] = useState([]);
  const [info, setInfo] = useState([]);
  const [picLink, setPicLink] = useState();
  const [infoBio, setInfoBio] = useState();
  const user_id = window.sessionStorage.getItem("user_id");

  useEffect(() => {
    if (!window.sessionStorage.getItem("auth")) navigate("/unauthorized");
    fetch(
      process.env.REACT_APP_API_URL_BASE +
        "/api/webusers/webuser/" +
        user_id +
        "/"
    )
      .then((res) => res.json())
      .then((data) => {
        setUserColumns(Object.keys(data.user));
        setRecord(data.user);
        setInfoColumns(Object.keys(data.info[0]));
        setInfo(data.info);
        setInfoBio(data.info[0].profile_bio);
        setPicLink(data.info[0].profile_picture);
        setAddressColumns(Object.keys(data.addresses[0]));
        setAddresses(data.addresses);
        setPhoneColumns(Object.keys(data.phones[0]));
        setPhones(data.phones);
        console.log(picLink);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("auth");
    window.sessionStorage.removeItem("user_id");
    window.sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <br />
      <div className="page shadow">
        <div className="main-container shadow">
          <MDBContainer>
            <br />
            <MDBRow>
              <MDBCol>
                <div className="container">
                  <img
                    src={picLink}
                    alt={record.first_name}
                    style={{ width: "20%", borderRadius: "48%" }}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <div class="container">
                  <h3>
                    {record.first_name} {record.last_name}
                  </h3>

                  <p>{infoBio}</p>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <table className="user-table">
                <thead>
                  <tr>
                    <th key="1">USER ID</th>
                    <th key="2">EMAIL</th>
                    <th key="3">USER SINCE</th>
                    <th key="4">LAST LOGIN</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    <tr key={record.web_user_id}>
                      <td>{record.web_user_id}</td>
                      <td>{record.email}</td>
                      <td>
                        {new Date(record.created_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(record.last_login).toLocaleString()}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </MDBRow>
            <br />
          </MDBContainer>
        </div>
      </div>

      <br />
      <h2>Address</h2>
      <table className="user-table">
        <thead>
          <tr>
            {addressColumns.map((c, i) => (
              <th key={i}>{c.replaceAll("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, i) => (
            <tr key={address.user_address_id}>
              <td>{address.user_address_id}</td>
              <td>{address.street_1}</td>
              <td>{address.street_2}</td>
              <td>{address.city}</td>
              <td>{address.st}</td>
              <td>{address.zip}</td>
              <td>{address.country}</td>
              <td>{new Date(address.created_date).toLocaleDateString()}</td>
              <td>{address.web_user.web_user_id}</td>
              <td>{address.address_type.address_type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Phone</h2>
      <table className="user-table">
        <thead>
          <tr>
            {phoneColumns.map((c, i) => (
              <th key={i}>{c.replaceAll("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {phones.map((phone, i) => (
            <tr key={phone.user_phone_id}>
              <td>{phone.phone_number}</td>
              <td>{phone.phone_type.phone_type}</td>
              <td>{String(phone.is_active)}</td>
              <td>{new Date(phone.created_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="login-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
