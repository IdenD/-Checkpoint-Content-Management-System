import "./user.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mern-contact-api.onrender.com/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Erreur de récupération de données", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`https://mern-contact-api.onrender.com/api/delete/user/${userId}`)
      .then((res) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(res.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="User">
      <Link to="/add-user" type="button" className="btn btn-primary">
        Add User <i className="bi bi-person-fill-add"></i>
      </Link>

      {users.length === 0 ? (
        <div className="noData">
          <h3>Aucune donnée disponible</h3>
          <p>Veuillez ajouter des utilisateurs</p>
        </div>
      ) : (
        <table id="myTable" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>N°</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <Link
                      to={`/update-user/${user._id}`}
                      type="button"
                      className="btn btn-info"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
