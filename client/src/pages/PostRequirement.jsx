import { useState } from "react";
import m from "../assets/css/componentes/PostRequirement.module.css";
import axios from "axios";

export default function PostRequirement() {
  const [dataReq, setDataReq] = useState({
    title: "",
    descripcion: "",
    tipoRequerimiento: "",
    plataforma: "",
    vista: "",
    interaccion: "",
    prioridad: "Alta",
    emailCliente: "",
    emailDesarrollador: "",
    fechaInicio: "",
    fechaFin: "",
  });

  function handleChangue(event) {
    const { name, value } = event.target;
    setDataReq({ ...dataReq, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !dataReq.title ||
      !dataReq.descripcion ||
      !dataReq.tipoRequerimiento ||
      !dataReq.plataforma ||
      !dataReq.vista ||
      !dataReq.interaccion ||
      !dataReq.prioridad ||
      !dataReq.emailCliente ||
      !dataReq.emailDesarrollador ||
      !dataReq.fechaInicio ||
      !dataReq.fechaFin
    )
      return alert("No pueden haber campos vacios");

    const [ageStart, monthStart, dayStart] = dataReq.fechaInicio.split("-");
    const [ageEnd, monthEnd, dayEnd] = dataReq.fechaFin.split("-");
    let tiempoEstimado = (ageEnd - ageStart) * 12 + (monthEnd - monthStart);
    if (tiempoEstimado < 0)
      return alert(
        "La fecha de inicio no puede ser mayor a la de finalización"
      );

    if (tiempoEstimado === 0) {
      tiempoEstimado = dayEnd - dayStart;
      if (tiempoEstimado < 0)
        return alert(
          "La fecha de inicio no puede ser mayor a la de finalización"
        );
      if (tiempoEstimado === 0)
        return alert("Las fechas no pueden ser iguales");
      tiempoEstimado += " día(s)";
    } else {
      tiempoEstimado += " mes(es)";
    }

    console.log(tiempoEstimado);

    axios
      .get(`http://localhost:3001/findUser?email=${dataReq.emailCliente}`)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        if (!data.status) throw alert(`No existe ${dataReq.emailCliente}`);
        if (!data.userFind.cliente)
          throw alert(`${dataReq.emailCliente} existe pero no es un cliente`);

        const idCliente = data.userFind.id;
        // const requerimientosCliente = data.userFind.requerimientos;

        axios
          .post(`http://localhost:3001/requirement`, {
            ...dataReq,
            tiempoEstimado,
          })
          .then(({ data }) => {
            const RequirementId = data.id;
            axios.post(`http://localhost:3001/userRequirement`, {
              UserId: idCliente,
              RequirementId,
            });

            axios
              .get(
                `http://localhost:3001/findUser?email=${dataReq.emailDesarrollador}`
              )
              .then(({ data }) => data)
              .then((data) => {
                if (!data.status)
                  throw alert(`No existe ${dataReq.emailDesarrollador}`);
                if (!data.userFind.desarrollador)
                  throw alert(
                    `${dataReq.emailDesarrollador} existe pero no es un desarrollador`
                  );

                const idDesarrollador = data.userFind.id;

                axios.post(`http://localhost:3001/userRequirement`, {
                  UserId: idDesarrollador,
                  RequirementId,
                });
              });

            alert("Listo");
          });

        //     const requerimientosDesarrollador = data.userFind.requerimientos;

        //     axios
        //       .put(`http://localhost:3001/reqUserUpdate`, {
        //         id: idCliente,
        //         requerimientos: [
        //           ...requerimientosCliente,
        //           { ...dataReq, tiempoEstimado },
        //         ],
        //       })
        //       .then(() => {
        //         axios
        //           .put(`http://localhost:3001/reqUserUpdate`, {
        //             id: idDesarrollador,
        //             requerimientos: [
        //               ...requerimientosDesarrollador,
        //               { ...dataReq, tiempoEstimado },
        //             ],
        //           })
        //           .then(() => {
        //             axios
        //               .post(`http://localhost:3001/requirement`, {
        //                 ...dataReq,
        //                 tiempoEstimado,
        //                 UserId: idCliente,
        //               })
        //               .then(() => {
        //                 alert(
        //                   "Las asignaciones y el requerimiento han sido creados"
        //                 );
        //               });
        //           });
        //       });
        //   });
      });
  }

  console.log(dataReq);

  return (
    <form className={m.mainDiv} onSubmit={handleSubmit}>
      <label htmlFor="">Título</label>
      <input
        type="text"
        name="title"
        value={dataReq.title}
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Descripcion</label>
      <textarea
        type="text"
        name="descripcion"
        value={dataReq.descripcion}
        onChange={handleChangue}
      />

      <label htmlFor="">Tipo de requerimiento</label>
      <input
        type="text"
        name="tipoRequerimiento"
        value={dataReq.tipoRequerimiento}
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Plataforma</label>
      <input
        type="text"
        name="plataforma"
        value={dataReq.plataforma}
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Vista</label>
      <input
        type="text"
        name="vista"
        value={dataReq.vista}
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Interaccion</label>
      <input
        type="text"
        name="interaccion"
        value={dataReq.interaccion}
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Prioridad</label>
      <select name="prioridad" onChange={handleChangue}>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
      </select>

      <label htmlFor="">Del cliente:</label>
      <input
        type="email"
        name="emailCliente"
        value={dataReq.emailCliente}
        placeholder="email..."
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Asignar al desarrolador</label>
      <input
        type="email"
        name="emailDesarrollador"
        value={dataReq.emailDesarrollador}
        placeholder="email..."
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Fecha de inicio</label>
      <input
        type="date"
        name="fechaInicio"
        value={dataReq.fechaInicio}
        minLength="5"
        onChange={handleChangue}
      />

      <label htmlFor="">Fecha de finalización</label>
      <input
        type="date"
        name="fechaFin"
        value={dataReq.fechaFin}
        onChange={handleChangue}
      />

      <button className={m.button}>Guardar</button>
    </form>
  );
}
