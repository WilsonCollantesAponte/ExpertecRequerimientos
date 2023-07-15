import { useParams } from "react-router-dom";
import "../assets/css/componentes/card.css";
import m from "../assets/css/componentes/UserDetail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/user?id=${id}`).then(({ data }) => {
      setDetail(data);
    });
  }, [id]);

  function handleDelete() {
    const { id, email } = detail;

    if (!id || !email)
      return alert(
        `No se puede eliminar por que falta el 'email' o el 'identificador' del usuario`
      );

    console.log(id, email);
    // axios
    //   .delete(`http://localhost:3001/user`, { id, email })
    //   .then(({ data }) => alert(data.message));
  }

  console.log(detail);
  return (
    <main className="container flex flex--center">
      <div className={m.div2}>
        <div className={m.divD}>Detalle</div>
        <article className="card post">
          <h2 className={m.p}>Nombre(s): {detail.nombres}</h2>
          <p className={m.p}>Apellido: {detail.apellidos}</p>
          <p className={m.p}>Email: {detail.email}</p>
          <p className={m.p}>Teléfono: {detail.telefono}</p>
          <p className={m.p}>Empresa: {detail.empresa}</p>
          <p className={m.p}>Password: {detail.password}</p>
          {detail.desarrollador && (
            <p className={m.p}>categoria: Desarrollador</p>
          )}
          {detail.cliente && <p className={m.p}>categoria: Cliente</p>}

          <button onClick={handleDelete}>Eliminar usuario</button>
        </article>
      </div>
    </main>
  );
}
