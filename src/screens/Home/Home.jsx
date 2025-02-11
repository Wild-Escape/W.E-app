function Home() {
  return (
    <div className="p-4">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
     <p>Display experiences here:</p>
    </div>
  );
}

export default Home;
