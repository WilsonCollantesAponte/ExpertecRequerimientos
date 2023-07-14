import ListPost from "../components/ListPost";
// import ListCategories from "../components/ListCategories";
const Home = () => {
  return (
    <main>
      <div className="container">
        <h2 className="title-page">Lista Requerimientos</h2>
      </div>

      {/* <ul className="category-list container flex">
        <button
          className={`category-list__category category-list__category--Alta`}
        >
          Alta
        </button>
        <button
          className={`category-list__category category-list__category--Media`}
        >
          Media
        </button>
      </ul> */}

      <ListPost />
    </main>
  );
};

export default Home;
