import React from "react";

const Navbar = ({ sortContest }) => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          borderRadius: "0px 0px 7px 7px",
          padding: "0.5rem 0.8rem",
        }}
      >
        <a className="navbar-brand" href="#">
          {/* <img src="android-chrome-192x192.png" alt="icon" width="40" height="40" style={{marginRight:"5px"}}/> */}
          <h2>CodeQuest</h2>
        </a>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="toggler-icon top-bar"></span>
          <span class="toggler-icon middle-bar"></span>
          <span class="toggler-icon bottom-bar"></span>
        </button>

        <div
          className="collapse navbar-collapse
           justify-content-end"
          id="navbarSupportedContent"
        >
          <form className="d-flex flex-wrap" role="search">
            {/* <label for="sort">Choose a Parameter:</label> */}
            <select
              onChange={(e) => sortContest(e.target.value)}
              name="sort"
              id="sort"
            >
              <option value="name">Name</option>
              <option value="site">Website</option>
              <optgroup label="Duration">
                <option value="shortest-duration">Shortest</option>
                <option value="longest-duration">Longest</option>
              </optgroup>
              <option value="in24hrs">In 24 Hrs</option>
            </select>
            <input
              id="nav-search"
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="nav-search-button glow-on-hover button "
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
