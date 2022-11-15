import { Form, redirect, NavLink } from "react-router-dom";
import Route from "../routeBackend";
import Swal from "sweetalert2";

export async function Action({ request, params }) {
  const formData = await request.formData();
  const response = await fetch(Route() + "Controller/ConLogin.php", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  if (data.id_user) {
    localStorage.setItem("dataLogin", JSON.stringify(data));
    return redirect("/users");
  }

  if (data.msg) {
    Swal.fire({
      title: "Error!",
      text: data.msg,
      icon: "error",
    });
  }
}

export function ValidateLogin() {
  const validate = JSON.parse(localStorage.getItem("dataLogin"));
  if (validate) {
    return redirect("/users");
  }
}

export default function Login() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-5">Admin Usuarios</h2>
            <div className="text-center mb-5 text-dark">
              Made with bootstrap
            </div>
            <div className="card my-5">
              <Form
                method="post"
                id="contact-form"
                className="card-body cardbody-color p-lg-5"
              >
                <div className="text-center">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    aria-describedby="emailHelp"
                    placeholder="Usuario"
                    name="user"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    name="psw"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Ingresar
                  </button>
                </div>
                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-dark"
                >
                  <NavLink to={"/changePassword"} className="text-dark fw-bold">
                    ¿Has olvidado la contraseña?
                  </NavLink>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
