import { useParams } from "react-router-dom";
import "../assets/css/componentes/card.css";
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

  console.log(detail);
  return (
    <main className="container flex flex--center">
      <article className="card post">
        <h2 className="post-card__title">nombres: {detail.nombres}</h2>
        <p className="text__card">apellidos: {detail.apellidos}</p>
        <p className="text__card">email: {detail.email}</p>
        <p className="text__card">telefono: {detail.telefono}</p>
        <p className="text__card">empresa: {detail.empresa}</p>
        <p className="text__card">password: {detail.password}</p>
        {detail.desarrollador && (
          <p className="text__card">categoria: Desarrollador</p>
        )}
        {detail.cliente && <p className="text__card">categoria: Cliente</p>}
      </article>
    </main>
  );
}
