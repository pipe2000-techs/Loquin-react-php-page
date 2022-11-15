import { useState } from "react";
import { Form, redirect, NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Route from "../../routeBackend";

export async function changePassword({request}){

  const formData = await request.formData();
  const response = await fetch(Route()+"Controller/ConChangePassword.php?service=newPassword", {
    method: "POST",
    body: formData
  })

  const data = await response.json()

  if (data.msg == 1) {
    Swal.fire("¡Actualizada!", "La contraseña a sido actualizada", "success");
    return redirect('/login');
  }

  if (data.msg == 0) {
    Swal.fire("¡Error!", "La contraseña no se pudo actualizar, intemnta mas tarde ", "error")
    return redirect('/login');
  }

}

export default function ValidatePassword({getuser}) {

  const [loading, setLoading] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  return (
    <>
      <Form method="post">
        <div className="mb-3">
          <div className="text-center text-dark mt-5">
            Ingresa La nueva contraseña
          </div>
        </div>
        <div className="mb-3">
          <input
            type="password"
            className={
              password1 == password2
                ? "form-control"
                : "form-control is-invalid"
            }
            aria-describedby="emailHelp"
            placeholder="Ingresa la contraseña"
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          />
          <div className="invalid-feedback">Las contraseñas no coinciden</div>
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password_user"
            className={
              password1 == password2
                ? "form-control"
                : "form-control is-invalid"
            }
            aria-describedby="emailHelp"
            placeholder="Repite la contraseña"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
          <input type="hidden" name="userName_user" value={getuser}/>
          <div className="invalid-feedback">Las contraseñas no coinciden</div>
        </div>
        <div className="text-center">
          {password1 != "" && password2 != "" && password1 == password2 ? (
            loading == true ? (
              <button className="btn btn-warning px-5 mb-5 w-100">
                Cargando...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-color px-5 mb-5 w-100"
                onClick={() => {
                  setLoading(true);
                }}
              >
                Cambiar contraseña
              </button>
            )
          ) : (
            <button className="btn btn-color px-5 mb-5 w-100" disabled>
              Cambiar contraseña
            </button>
          )}
        </div>
      </Form>
    </>
  );

}