import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        console.log("API Response:", response.data); // Log the entire response
        setBook(response.data.book); // Access the nested book object
        console.log("Updated Book:", response.data.book); // Log updated book
        setLoading(false);
      })
      .catch((error) => {
        console.error(error); // Use console.error for better visibility
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : book ? ( // Check if book is not null
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title || "N/A"}</span> {/* Optional chaining */}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author || "N/A"}</span> {/* Optional chaining */}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear || "N/A"}</span> {/* Optional chaining */}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>
              {book.createdAt
                ? new Date(book.createdAt).toLocaleString()
                : "N/A"}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>
              {book.updatedAt
                ? new Date(book.updatedAt).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
      ) : (
        <p>No book found.</p> // Fallback for when book is null
      )}
    </div>
  );
};

export default ShowBook;
