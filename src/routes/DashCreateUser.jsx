import { Form, redirect, NavLink, Outlet } from "react-router-dom";
import Swal from 'sweetalert2'
import Route from "../routeBackend";
import { useState } from 'react'

async function ValidateUser(user) {
  const response = await fetch(Route() + "Controller/ConUser.php?service=validateUser&userName_user="+user);
  const data = await response.json();
  return (data.msg)
}

export async function ActionInsert({ request }) {

  const formData = await request.formData();
  const response = await fetch(Route()+"Controller/ConUser.php?service=InsertUser", {
    method: "POST",
    body: formData
  })
  const data = await response.json()

  if (data.msg == 1) {
    Swal.fire("¡Guardado!", "El usuario ha sido guardado correctamente", "success");
    return redirect('/users');
  }

  if (data.msg == 0) {
    Swal.fire("¡Error!", "El usuario no se pudo Guardar, Intenta de nuevo", "error");
  }
}


export default function CreateUser() {

  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [valUser, setValUSer] = useState(true)

  async function GetUser(user) {
    const msg = await ValidateUser(user)
    if (msg == 1) {
      setValUSer(false)
    }else{
      setValUSer(true)
    }
  }

  return (
    <>
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Crear Usuario</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>
        <div className="col-md-8 ">
          <Form
            method="post"
            encType="multipart/form-data"
            className="row g-3"
          >
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className={
                  valUser == true
                    ? "form-control"
                    : "form-control is-invalid"
                }
                name="userName_user"
                placeholder="Ingresa el usuario"
                required
                onChange={(e) => {
                  GetUser(e.target.value);
                }}
              />
              <div className="invalid-feedback">El usuario ya existe</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Nombre Completo
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa nombre"
                name="name_user"
                required
              />
            </div>
            <div className="col-5">
              <label htmlFor="inputAddress" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Ingresa el correo"
                name="email_user"
                required
              />
            </div>
            <div className="col-2">
              <label htmlFor="inputAddress2" className="form-label">
                Edad
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ingresa la edad"
                name="age_user"
                required
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="inputCity" className="form-label">
                Foto
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="photo_user"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className={
                  password1 == password2
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Ingresa la contraseña"
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
                required
              />
              <div className="invalid-feedback">La contraseña no coincide</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Repite Contraseña
              </label>
              <input
                type="password"
                className={
                  password1 == password2
                    ? "form-control"
                    : "form-control is-invalid"
                }
                name="password_user"
                placeholder="Repite la contraseña"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                required
              />
              <div className="invalid-feedback">La contraseña no coincide</div>
            </div>

            <div className="col-12">
              {password1 == password2 && valUser == true?  
                <button type="submit" className="btn btn-success" >
                  Guarar Usuario
                </button> 
                :
                <button className="btn btn-success" disabled>
                  Guarar Usuario
                </button>
              }
            </div>
          </Form>
        </div>
      </div>
    </>
  );

}