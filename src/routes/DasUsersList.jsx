import { Form, redirect, NavLink, useLoaderData, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'
import Route from "../routeBackend";
import User from './DashUser'
import React, { useState, useEffect } from 'react';

function DataTable(){
  $(document).ready( function () {
    $('#table_id').DataTable();
  } );
}


export async function LoaderData() {

  const response = await fetch(Route()+'Controller/ConUser.php?service=callUser')
  const data = await response.json()
  return {data}
  
}

export async function ActionUpdate({ request }) {

  const formData = await request.formData();
  const response = await fetch(Route()+"Controller/ConUser.php?service=UpdateUser", {
    method: "POST",
    body: formData
  })
  const data = await response.json()

  if (data.msg == 1) {
    Swal.fire("¡Actualizado!", "El usuario a sido actulizado", "success");
  }

  if (data.msg == 0) {
    Swal.fire("¡Error!", "El usuario no se pudo actuallizar", "error");
  }

  const formulario = document.getElementById('formul');
  formulario.reset();

  $("#Updatemodal").modal("hide"); //ocultamos el modal
  $("body").removeClass("modal-open"); //eliminamos la clase del body para poder hacer scroll
  $(".modal-backdrop").remove(); //eliminamos el backdrop del modal
}



export default function Users() {

  //segurdan las contrseñas para validar si coinciden
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  //tabla con datatable
  DataTable();

  //estado donde se gurda la data el usuario a actulizar 
  const [updateUser, setUpdtaeUser] = useState('')

  function UpdateUser(params) {
    setUpdtaeUser(params)
  }

  //validacion para eliminar el usuario
  function alertDelete(data){
    Swal.fire({
      title: 'Estas segur@',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(Route() + "Controller/ConUser.php?service=DeleteUser&id="+data.id_user+"&photo_user="+data.photo_user)
          .then((response) => response.json())
          .then((response) => {
            if (response.msg == 1) {
              Swal.fire("¡Eliminado!", "El usuario a sido eliminado", "success");
              location.reload();
              //const navigate = useNavigate()
              //navigate('/users')
            }
  
            if (response.msg == 0) {
              Swal.fire("¡Error!", "El usuario no se pudo eliminar", "error");
            }
          });
      }
    })
  }

  //apenas carga el componente llama a todos los usuarios
  const { data } = useLoaderData();

  return (
    <>
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Usuarios</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2"></div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm" id="table_id">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad </th>
                <th scope="col">Correo</th>
                <th scope="col">Creado</th>
                <th scope="col">Actulizado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dataUser) => {
                return (
                  <tr key={dataUser.id_user}>
                    <User
                      user={dataUser}
                      Updata={UpdateUser}
                      deleteU={alertDelete}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Update*/}
      <Form method="post" encType="multipart/form-data" id="formul">
        <div
          className="modal fade"
          id="Updatemodal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <center>
                  <div className="text-center">
                    <img
                      src={
                        Route() +
                        "img/" +
                        (updateUser.photo_user == null
                          ? "noneImg.png"
                          : updateUser.photo_user)
                      }
                      className="rounded"
                      width={200}
                      alt="..."
                    />
                  </div>
                  <br />
                </center>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="validationDefault01" className="form-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={updateUser.userName_user}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="validationDefault02" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={updateUser.name_user}
                      placeholder="Ingresa nombre"
                      name="name_user"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="validationDefault02" className="form-label">
                      Correo
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={updateUser.email_user}
                      placeholder="Ingresa correo electrónico"
                      name="email_user"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="validationDefault04" className="form-label">
                      Edad
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={updateUser.age_user}
                      required
                      name="age_user"
                      placeholder="Ingresa edad"
                    />
                  </div>

                  <div className="col-md-10">
                    <label htmlFor="validationDefault05" className="form-label">
                      Foto (Opcional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      name="photo_user"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationDefault05" className="form-label">
                      Contraseña (Opcional)
                    </label>
                    <input
                      type="password"
                      className={
                        password1 == password2
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      placeholder="Nueva contraseña (Opcional)"
                      onChange={(e) => {
                        setPassword1(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      La contraseña no coincide
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationDefault05" className="form-label">
                      Repite Contraseña (Opcional)
                    </label>
                    <input
                      type="password"
                      className={
                        password1 == password2
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      placeholder="Repite contraseña (Opcional)"
                      name="password_user"
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      La contraseña no coincide
                    </div>
                  </div>
                </div>
              </div>
              <input
                name="userName_user"
                type="hidden"
                defaultValue={updateUser.userName_user}
              />
              <input
                name="photo_userOld"
                type="hidden"
                defaultValue={updateUser.photo_user}
              />
              <div className="modal-footer">
                {password1 == password2 ? (
                  <button type="submit" className="btn btn-primary">
                    Actualizar
                  </button>
                ) : (
                  <button className="btn btn-primary" disabled>
                    Actualizar
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );

}