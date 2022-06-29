import "./write.css";
import TrainImg from "./../../images/train.jpg";
import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [category, setCategory] = useState("");
  const [catDropDown, setCatDropDown] = useState(false);

  const handleCatDropDown = () => {
    setCatDropDown(!catDropDown);
  };

  const handleChooseCat = (cat) => {
    setCatDropDown(false);
    setCategory(cat);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories:category,
      likeCount: 0,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
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
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
