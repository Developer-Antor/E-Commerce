import React, { useState } from "react";
import "./Admin.css";
import { db, storage } from "../Firebase/Firebase";

function Admin() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [title1, setTitle1] = useState("");
  const [price1, setPrice1] = useState(0);
  const [rating1, setRating1] = useState(0);
  const [url1, setUrl1] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const upload = storage.ref(`images/${image.name}`).put(image);

    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("products").add({
              title: title,
              price: price,
              image: url,
              rating: rating,
            });
          });
        setPrice(0);
        setImage(null);
        setRating(0);
        setTitle("");
      }
    );
  };

  const handleSubmitUrl = (e) => {
    e.preventDefault();
    db.collection("products")
      .add({
        title: title1,
        price: price1,
        image: url1,
        rating: rating1,
      })
      .then(() => {
        alert("Added");
        setPrice1(0);
        setUrl1("");
        setRating1(0);
        setTitle1("");
      });
  };
  return (
    <div className="admin">
      <form action="">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          placeholder="Title"
          type="text"
        />
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          placeholder="Price"
          type="number"
        />
        <input
          onChange={(e) => {
            setRating(parseInt(e.target.value));
          }}
          value={rating}
          placeholder="Rating"
          type="number"
        />
        <input
          onChange={(e) => {
            if (e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          type="file"
        />

        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
      <h1>Or Use Url🔥</h1>
      <form action="">
        <input
          onChange={(e) => {
            setTitle1(e.target.value);
          }}
          value={title1}
          placeholder="Title"
          type="text"
        />
        <input
          onChange={(e) => {
            setPrice1(e.target.value);
          }}
          value={price1}
          placeholder="Price"
          type="number"
        />
        <input
          onChange={(e) => {
            setRating1(parseInt(e.target.value));
          }}
          value={rating1}
          placeholder="Rating"
          type="number"
        />
        <input
          onChange={(e) => {
            setUrl1(e.target.value);
          }}
          value={url1}
          placeholder="Url"
          type="text"
        />

        <button onClick={handleSubmitUrl} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Admin;
