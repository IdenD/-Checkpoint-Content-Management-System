import { Link, useNavigate, useParams } from "react-router-dom";
import "./updateUser.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`https://mern-contact-api.onrender.com/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://mern-contact-api.onrender.com/api/update/user/${id}`, user)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        toast.success(res.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AddUser">
      <Link
        to="/"
        type="button"
        className="btn btn-secondary"
        style={{ marginBottom: "4 0px" }}
      >
        <i className="bi bi-arrow-left"></i> Retour
      </Link>
      <h3 style={{ textAlign: "center" }}>Update User</h3>
      <form action="" className="AddUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            value={user.name}
            autoComplete="off"
            placeholder="Nom"
            required
          />
        </div>
        <div className="inputGroup">
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Email"
            required
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            value={user.address}
            autoComplete="off"
            placeholder="Adresse"
            required
          />
        </div>
        <div className="inputGroup">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ paddingBlock: "10px" }}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};
