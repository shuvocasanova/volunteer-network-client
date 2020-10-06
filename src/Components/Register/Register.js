import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { userContext } from "../../App";

const Register = () => {
  let history = useHistory();
  const { id } = useParams();
  const [loginUser, setLoginUser] = useContext(userContext);
  const [event, setEvent] = useState({});
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    fetch(`https://volunteer-network-pro.herokuapp.com/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setFormInput({
          name: loginUser.name,
          email: loginUser.email,
          eventName: data.name,
          eventID: data._id,
        });
      });
  }, []);

  const handleFormInput = (e) => {
    const newInput = { ...formInput };
    newInput[e.target.name] = e.target.value;
    setFormInput(newInput);
  };

  const handleSubmit = (e) => {
    if (formInput.date) {
      fetch("https://volunteer-network-pro.herokuapp.com/registerEvent", {
        method: "POST",
        body: JSON.stringify(formInput),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          history.push("/profile");
        })
        .catch((error) => console.log(error));
      e.preventDefault();
    }
  };

  return (
    <div className="w-50 mx-auto mt-5 border border-secondary p-5">
      <h2 className="my-4">Register as a volunteer</h2>
      <form onSubmit={handleSubmit}>
        <input
          readOnly
          className="form-control-plaintext border-bottom my-3"
          type="text"
          placeholder="Full Name"
          value={loginUser.name}
          name="name"
        />
        <input
          readOnly
          className="form-control-plaintext border-bottom my-3"
          type="text"
          placeholder="username or email"
          value={loginUser.email}
          name="email"
        />
        <input
          required="required"
          className="form-control-plaintext border-bottom my-3"
          type="date"
          placeholder="Date"
          name="date"
          onBlur={handleFormInput}
        />
        <input
          className="form-control-plaintext border-bottom my-3"
          type="text"
          placeholder="Description"
          name="description"
          onBlur={handleFormInput}
        />
        <input
          readOnly
          className="form-control-plaintext border-bottom my-3 text-capitalize"
          type="text"
          placeholder={event.name}
          value={event.name}
          name="eventName"
        />
        <input
          readOnly
          className="d-none form-control-plaintext border-bottom my-3 text-capitalize"
          type="text"
          placeholder={event._id}
          value={event._id}
          name="eventID"
        />
        <input
          type="submit"
          value="Register"
          className="btn btn-primary w-100"
        />
      </form>
    </div>
  );
};

export default Register;
