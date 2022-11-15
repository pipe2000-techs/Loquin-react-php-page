import { useState } from "react";
import { Form, redirect, NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Route from "../../routeBackend";


export default function ValidateCode({setpage}) {

  const [codigo, setCodigo] = useState("")
  const [attempts, setAttempts] = useState(3)
  const [loading, setLoading] = useState(false)

  async function ValidateCode() {

    const codeBack = localStorage.getItem("code");
    const response = await fetch(Route()+"Controller/ConChangePassword.php?service=validateCode&code="+codigo+"&codeBack="+codeBack)
    const data = await response.json()
  
    if (data.msg == 1) {
      setpage('ValidatePassword')
      setLoading(false)
    }
  
    if (data.msg == 0) {

        setLoading(false)

        if (attempts < 2) {
            Swal.fire("¡Error!", "Ya has superado el límite de intentos permitidos intenta más tarde", "error")
            location.reload();
        }else{
            Swal.fire("¡Error!", "El Codigo es incorrecto", "error")
        }
        setAttempts(attempts-1)
   
    }
  }

  return (
    <>
      <div className="mb-3">
        <div className="text-center text-dark mt-5">Ingresa el codigo que llego al correo</div>
        <div className="text-center text-dark mt-1">Tienes <span className="badge rounded-pill bg-success">{attempts}</span> intentos</div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className={codigo != "" ? "form-control" : "form-control is-invalid"}
          aria-describedby="emailHelp"
          placeholder="Ingresa tu usuario"
          onChange={(e) => {
            setCodigo(e.target.value);
          }}
        />
        <div className="invalid-feedback">Rellena el campo con El codigo</div>
      </div>
      <div className="text-center">
        {codigo != "" ? (
          loading == true ? (
            <button className="btn btn-warning px-5 mb-5 w-100">
              Cargando...
            </button>
          ) : (
            <button
              className="btn btn-color px-5 mb-5 w-100"
              onClick={() => {
                setLoading(true);
                ValidateCode();
              }}
            >
              Validar
            </button>
          )
        ) : (
          <button className="btn btn-color px-5 mb-5 w-100" disabled>
            Validar
          </button>
        )}
      </div>
    </>
  );

}