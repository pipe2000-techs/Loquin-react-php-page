import { useState } from "react";
import { Form, redirect, NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Route from "../../routeBackend";
import ValidateCode from "./ValidateCode"
import ValidatePassword from "./ValidatePassword"

export function ValidateLogin() {
  const validate = JSON.parse(localStorage.getItem("dataLogin"));
  if (validate) {
    return redirect("/users");
  }
}

export default function ChangePassword() {

  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState('validateLogin')

  function pages(pages) {
    setPage(pages)
  }

  async function ValidateUser() {

    const response = await fetch(Route()+"Controller/ConChangePassword.php?service=validateUser&userName_user="+user)
    const data = await response.json()
  
    if (data.msg == 1) {
      localStorage.setItem("code", data.code);
      setLoading(false)
      pages('ValidateCode')
    }
  
    if (data.msg == 0) {
      setLoading(false)
      Swal.fire("¡Error!", "El usuario es incorrecto o no existe", "error");
    }
  }

  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-5">Cambiar Contraseña</h2>
            <div className="card my-5">
              <div
                id="contact-form"
                className="card-body cardbody-color p-lg-5"
              >
                {page == "validateLogin" ? (
                  <>
                    <div className="mb-3">
                      <div className="text-center text-dark mt-5">
                        Ingresa Tu usuario
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={
                          user != ""
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu usuario"
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        Rellena el campo con tu usuario
                      </div>
                    </div>
                    <div className="text-center">
                      {user != "" ? (
                        loading == true ? (
                          <button className="btn btn-warning px-5 mb-5 w-100">
                            Cargando...
                          </button>
                        ) : (
                          <button
                            className="btn btn-color px-5 mb-5 w-100"
                            onClick={() => {
                              setLoading(true);
                              ValidateUser();
                            }}
                          >
                            Validar
                          </button>
                        )
                      ) : (
                        <button
                          className="btn btn-color px-5 mb-5 w-100"
                          disabled
                        >
                          Validar
                        </button>
                      )}
                    </div>
                  </>
                ) : page == "ValidateCode" ? (
                  <ValidateCode setpage={pages} />
                ) : page == "ValidatePassword" ? (
                  <ValidatePassword getuser={user}/>
                ) : ( ""
                )}

                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-dark"
                >
                  <NavLink to={"/Login"} className="text-dark fw-bold">
                    ¿Quieres Ingresar?
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}