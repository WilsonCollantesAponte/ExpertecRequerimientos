import { useParams } from "react-router-dom";
import "../assets/css/componentes/card.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [detailOther, setDetailOther] = useState({
    nameC: "",
    apellC: "",
    nameD: "",
    apellD: "",
  });

  useEffect(() => {
    axios(`http://localhost:3001/requirement?id=${id}`).then(({ data }) => {
      setDetail(data);
      const [user1, user2] = data?.Users;

      if (user1?.desarrollador) {
        setDetailOther({
          nameD: user1.nombres,
          apellD: user1.apellidos,
          nameC: user2.nombres,
          apellC: user2.apellidos,
        });
      }
      if (user2?.desarrollador) {
        setDetailOther({
          nameD: user2.nombres,
          apellD: user2.apellidos,
          nameC: user1.nombres,
          apellC: user1.apellidos,
        });
      }
    });
  }, [id]);

  return (
    <main className="container flex flex--center">
      <article className="card post">
        <h2 className="post-card__title">title: {detail.title}</h2>
        <p className="text__card">descripcion: {detail.descripcion}</p>
        <p className="text__card">
          tipoRequerimiento: {detail.tipoRequerimiento}
        </p>
        <p className="text__card">plataforma: {detail.plataforma}</p>
        <p className="text__card">vista: {detail.vista}</p>
        <p className="text__card">interaccion: {detail.interaccion}</p>
        <p className="text__card">prioridad: {detail.prioridad}</p>
        <p className="text__card">emailCliente: {detail.emailCliente}</p>
        <p className="text__card">
          Nombre(s) del cliente: {detailOther?.nameC}
        </p>
        <p className="text__card">
          Apellidos(s) del cliente: {detailOther?.apellC}
        </p>

        <p className="text__card">
          emailDesarrollador: {detail.emailDesarrollador}
        </p>
        <p className="text__card">
          Nombre(s) del desarrollador: {detailOther?.nameD}
        </p>
        <p className="text__card">
          Apellidos(s) del desarrollador: {detailOther?.apellD}
        </p>

        <p className="text__card">fechaInicio: {detail.fechaInicio}</p>
        <p className="text__card">fechaFin: {detail.fechaFin}</p>
        <p className="text__card">tiempoEstimado: {detail.tiempoEstimado}</p>
        <p className="text__card">
          estadoFinalAdmin: {detail.estadoFinalAdmin}
        </p>
        <p className="text__card">estadoFinalDev: {detail.estadoFinalDev}</p>
      </article>
    </main>
  );
};

export default Post;
