import { useEffect, useState } from "react";
import Loader from "./loader";
import Pagination from "./pagination";
import "./css/pagination.css";

const url = "https://kontests.net/api/v1/all";

const FirstComponent = ({ sortBy }) => {
  const cardsPerPage = 3;
  const [users, setUsers] = useState([]);
  const [apiData, setapiData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [currPage, setCurrPage] = useState(1);
  // const startIndex = (currPage - 1) * cardsPerPage;
  const startIndex = currPage * cardsPerPage - 3;
  const endIndex = startIndex + cardsPerPage;

  // const [containerAnimationClass, setContainerAnimationClass] = useState("");

  var img = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6OrwUbF1Og8brFhp_cJvX1kOrmMQgJI5fA&usqp=CAU",
    "https://techsteamcenter.com/wp-content/uploads/2022/01/computer-language.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJo2UIUzQup5w6ok6Gx-JJ0YrYOo934FXzBQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWY7Q6NMhKkBH6YDrW1eS7Ub_xRm30UrH4rw&usqp=CAU",
  ];

  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const result = await response.json();
        console.log(result);
        console.log(result[1].start_time);
        setUsers(result);

        setapiData(result);
      } catch (error) {
        console.log(error);
        setError(true);
      }

      setLoading(false);
    };

    dataFetcher();
  }, []);

  useEffect(() => {
    const sortContest = (sortBy) => {
      if (sortBy === "in24hrs") {
        const filteredContest = [...users].filter((c) => {
          return c.in_24_hours === "Yes";
        });
        setUsers(filteredContest);
        setCurrPage(1);
        return 0;
      }
      const sortedUsers = [...apiData].sort((a, b) => {
        if (sortBy === "name") {
          return a.name.trim().localeCompare(b.name.trim());
        } else if (sortBy === "site") {
          return a.site.trim().localeCompare(b.site.trim());
        } else if (sortBy === "shortest-duration") {
          return parseFloat(a.duration) - parseFloat(b.duration);
        } else if (sortBy === "longest-duration") {
          return parseFloat(b.duration) - parseFloat(a.duration);
        }
      });
      console.log(sortedUsers);
      setUsers(sortedUsers);
    };
    sortContest(sortBy);
  }, [sortBy]);

  useEffect(() => {
    const formatTimeString = () => {
      let Is_UTC = false;
      const formattedData = [...apiData];
      for (let i = 0; i < formattedData.length; i++) {
        if (formattedData[i].start_time.endsWith("UTC")) {
          Is_UTC = true;
        } else {
          Is_UTC = false;
        }

        if (Is_UTC == true) {
          const start = formattedData[i].start_time;
          const end = formattedData[i].end_time;
          const [startDate, startTime] = start.split(" ");
          const [endDate, endTime] = end.split(" ");

          const [s_hr, s_min] = startTime.split(":");
          const [e_hr, e_min] = endTime.split(":");

          formattedData[i].start_time = `${startDate} ${s_hr}:${s_min} UTC`;
          formattedData[i].end_time = `${endDate} ${s_hr}:${s_min} UTC`;
        } else {
          const start = formattedData[i].start_time;
          const end = formattedData[i].end_time;
          const [startDate, startTime] = start.split("T");
          const [endDate, endTime] = end.split("T");

          const [s_hr, s_min] = startTime.split(":");
          const [e_hr, e_min] = endTime.split(":");

          formattedData[i].start_time = `${startDate} ${s_hr}:${s_min}`;
          formattedData[i].end_time = `${endDate} ${e_hr}:${e_min}`;
        }
        Is_UTC = false;
      }
      setUsers(formattedData);
    };

    formatTimeString();
  }, [apiData]);

  const firstPage = () => {
    setCurrPage(1);
  };

  const prevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
      // setContainerAnimationClass("slide-right");
      // const startIndex = (currPage - 1) * cardsPerPage;
      // const endIndex = startIndex + cardsPerPage;
      // const cardsToDisplay = users.slice(startIndex, endIndex);
      // setUsers(cardsToDisplay);
    }
  };
  const nextPage = () => {
    const totalPages = Math.ceil(users.length / cardsPerPage);
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
      // setContainerAnimationClass("slide-left");
      // const startIndex = (currPage - 1) * cardsPerPage;
      // const endIndex = startIndex + cardsPerPage;
      // const cardsToDisplay = users.slice(startIndex, endIndex);
      // setUsers(cardsToDisplay);
    }
  };

  const selectPageHandler = (page) => {
    setCurrPage(page);
  };

  if (isError) {
    return <h1 style={{ color: "white" }}>Error</h1>;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div
        className={`card-container d-flex flex-wrap align-items-stretch justify-content-around flex-col`}
      >
        {users.slice(startIndex, endIndex).map((contest, index) => (
          <div className="d-flex flex-column card" key={index}>
            <div className="card-label">#{users.indexOf(contest) + 1}</div>
            {/* <img
            src={img[Math.floor(Math.random() * img.length)]}
            className="card-img-top"
            alt=""
          /> */}
            <div className="card-body">
              <div className="card-head">
                <h2 className="card-title">{contest.site}</h2>
                <h5 style={{ textDecoration: "underline" }}>{contest.name}</h5>
              </div>

              <div className="contact-footer">
                <div className="contest-timing">
                  <p className="card-text">
                    <span className="h6">Start At:</span> {contest.start_time}
                  </p>
                  <p className="card-text">
                    <span className="h6">End At:</span> {contest.end_time}
                  </p>
                  <p className="card-text">
                    <span className="h6">In 24 hours:</span>{" "}
                    {contest.in_24_hours}
                  </p>
                </div>
                <a
                  href={contest.url}
                  target="_blank"
                  className="glow-on-hover button btn"
                >
                  Visit contest
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination d-flex flex-wrap  justify-content-evenly flex-col">
        {/* <button
          className="glow-on-hover button navigation-button"
          onClick={firstPage}
          disabled={currPage === 1}
        >
          First Page
        </button> */}

        <button
          className="glow-on-hover button navigation-button"
          onClick={prevPage}
          disabled={currPage === 1}
        >
          Prev
        </button>

        <span className="pagination-numbers">
          {[...Array(Math.ceil(users.length / cardsPerPage))].map(
            (_, index) => {
              return (
                <span
                  onClick={() => selectPageHandler(index + 1)}
                  key={index}
                  className={
                    currPage === index + 1 ? "selected-page" : ""
                  }
                >
                  {index + 1}
                </span>
              );
            }
          )}
        </span>

        <button
          className="navigation-button glow-on-hover button"
          onClick={nextPage}
          disabled={currPage === Math.ceil(users.length / cardsPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FirstComponent;
