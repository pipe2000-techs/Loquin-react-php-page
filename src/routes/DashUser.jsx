import Route from "../routeBackend";

export default function User({user, Updata, deleteU}) {

  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'))

  return (
    <>
      <td>{user.id_user}</td>
      <td>
        <img
          src={Route() + "img/" + (user.photo_user == null ? "noneImg.png": user.photo_user)}
          className="rounded"
          width={100}
          alt="..."
        />
      </td>
      <td>{user.userName_user}</td>
      <td>{user.name_user}</td>
      <td>{user.age_user}</td>
      <td>{user.email_user}</td>
      <td><span className="badge rounded-pill bg-success">{user.DateCreate_user}</span></td>
      <td><span className="badge rounded-pill bg-warning text-dark">{user.DateUpdate_user}</span></td>
      <td>
        <div className="bd-example">
          <button
            type="sunmit"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#Updatemodal"
            onClick={() => Updata(user)}
          >
            <i className="bi bi-vector-pen" />
          </button>
          {user.id_user == dataLogin.id_user ? (
            null
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteU(user)}
            >
              <i className="bi bi-trash3-fill" />
            </button>
          )}
        </div>
      </td>
    </>
  );

}