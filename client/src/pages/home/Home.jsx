import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const postsSection = useRef(null);
  const scrollDown = () => {
    window.scrollTo({
      top: postsSection.current.offsetTop - 50,
      behavior: "smooth",
    });
  };

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [catDropDown, setCatDropDown] = useState(false);
  const [sortDropDown, setSortDropDown] = useState(false);

  const handleCatDropDown = () => {
    setCatDropDown(!catDropDown);
  };

  const handleChooseCat = (cat) => {
    setCatDropDown(false);
    setCategory(cat);
  };

  const handleSortDropDown = () => {
    setSortDropDown(!sortDropDown);
  };

  const handleChooseSort = (sort) => {
    setSortDropDown(false);
    setSort(sort);
  };

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="headerButtonDiv">
        <button className="exploreBlogButton" onClick={scrollDown}>
          Start Exploring
        </button>
      </div>
      <div className="home" ref={postsSection}>
        <span className="postsDesc">Discover what others have to share...</span>
        <div className="dropDownList">
          <div className="dropdown">
            <button
              className="dropDownButton"
              onClick={handleCatDropDown}
              style={{
                borderRadius: catDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {category === "" ? "CATEGORIES" : category}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {catDropDown && (
              <div className="dropDownOptionList">
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseCat("all")}
                >
                  All
                </div>
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseCat("life")}
                >
                  Life
                </div>
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseCat("music")}
                >
                  Music
                </div>
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseCat("food")}
                >
                  Food
                </div>
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseCat("sport")}
                  style={{ borderRadius: "0px 0px 10px 10px" }}
                >
                  Sport
                </div>
              </div>
            )}
          </div>
          <div className="dropdown">
            <button
              className="dropDownButton"
              onClick={handleSortDropDown}
              style={{
                borderRadius: sortDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {sort === "" ? "SORT BY" : sort}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {sortDropDown && (
              <div className="dropDownOptionList">
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseSort("recent")}
                >
                  Recent
                </div>
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseSort("most liked")}
                >
                  Most Liked
                </div>
                <div
                  className="dropDownOptions"
                  onClick={() => handleChooseSort("alphabetical")}
                  style={{ borderRadius: "0px 0px 10px 10px" }}
                >
                  Alphabetical
                </div>
              </div>
            )}
          </div>
          <div className="search">
            <Link
              to={
                category && sort
                  ? `/?cat=${category}sort=${sort}`
                  : category
                  ? `/?cat=${category}`
                  : sort
                  ? `/?sort=${sort}`
                  : ""
              }
              className="link"
            >
              <li className="searchButton">SEARCH</li>
            </Link>
          </div>
        </div>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
