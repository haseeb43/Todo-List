import React, { useState } from "react";
import "./todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import pngwing from "../images/pngwing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setEditItem] = useState(null);
  const addItem = () => {
    if (!inputData) {
      alert("Please input data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setEditItem(null);
    } else {
      const allInputData = {
        // id: new Date().getTime.toString(),
        id: Math.random().toString(36),

        name: inputData,
      };

      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  // Delete Items

  const deleteItem = (index) => {
    const updateditems = items.filter((element) => {
      return index !== element.id;
    });

    setItems(updateditems);
  };
  const removeAll = () => {
    setItems([]);
  };
  // Edit Item

  const editItem = (id) => {
    let newEditItem = items.find((element) => {
      return element.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditItem(id);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div  d-flex flex-column align-items-center  ">
          <figure className="mt-5">
            <img src={pngwing} alt="todologo" className="img-fluid" />
            <figcaption className="text-white">Add Your List Here </figcaption>
          </figure>

          <div className="addItem">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <FontAwesomeIcon
                icon={faPlus}
                className="text-primary add-btn"
                title="Add Item"
                onClick={addItem}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEdit}
                className="text-primary edit-btn"
                title="Update Item"
                onClick={addItem}
              />
            )}
          </div>

          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h4>{element.name}</h4>
                  <div className="card-btn">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-primary edit-btn me-3"
                      title="Edit Item"
                      onClick={() => {
                        editItem(element.id);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-primary del-btn"
                      title="Delete Item"
                      onClick={() => {
                        deleteItem(element.id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove All Button */}
          <div className="removeItems">
            <button
              className="btn btn-md btn-secondary mt-3"
              onClick={removeAll}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
