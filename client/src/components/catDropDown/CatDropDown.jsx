import React, { useState } from "react";

export default function catDropDown() {
  const [category, setCategory] = useState("");
  const [catDropDown, setCatDropDown] = useState(false);

  const handleCatDropDown = () => {
    setCatDropDown(!catDropDown);
  };

  const handleChooseCat = (cat) => {
    setCatDropDown(false);
    setCategory(cat);
  };
  return (
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
  );
}
