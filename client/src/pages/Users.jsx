import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { type } = useParams();

  useEffect(() => {
    if (type === "Desarrolladores")
      axios(`http://localhost:3001/allDev`).then(({ data }) => setUsers(data));

    if (type === "Clientes")
      axios(`http://localhost:3001/allClients`).then(({ data }) =>
        setUsers(data)
      );
  }, [type]);

  function handleSearch(event) {
    const { value, name } = event.target;

    if (type === "Clientes" && name === "buttonSearch") {
      axios(`http://localhost:3001/allClients?name=${search}`).then(
        ({ data }) => {
          console.log(data);
          const { customersFound } = data;
          setUsers(customersFound);
        }
      );
    }
    if (type === "Desarrolladores" && name === "buttonSearch") {
      axios(`http://localhost:3001/allDev?name=${search}`).then(({ data }) => {
        console.log(data);
        const { devsFind } = data;
        setUsers(devsFind);
      });
    }

    setSearch(value);
  }

  console.log(search);

  console.log(users, type);

  return (
    <div>
      <label>-----</label>{" "}
      <input type="search" value={search} onChange={handleSearch} />
      <button value={search} name="buttonSearch" onClick={handleSearch}>
        Buscar
      </button>
      <section className="posts container">
        {users?.map((users) => {
          const { id, nombres, apellidos } = users;
          return (
            <Link to={`/UsersDetail/${id}`} className={`post__card`} key={id}>
              <article>
                <h3 className="post-card__title">{nombres}</h3>
                <p className="post-card__meta">{apellidos}</p>
                {/* {(administrador || desarrollador) && (
                <div>
                  <span>Estado de finalizacion del desarrollador</span>
                  {estadoFinalAdmin ? <span>✅</span> : <span>❌</span>}
                  <br />
                  <span>Aprobacion del administrador</span>
                  {estadoFinalDev ? <span>✅</span> : <span>❌</span>}
                </div>
              )}
              {cliente && (
                <div>
                  <span>Terminado</span>
                  {estadoFinalAdmin && estadoFinalDev ? (
                    <span>✅</span>
                  ) : (
                    <span>❌</span>
                  )}
                </div>
              )} */}
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
