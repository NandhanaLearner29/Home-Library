import { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";
import { FiEdit2, FiCheck } from "react-icons/fi";

const BookDetails = () => {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const token = localStorage.getItem("token");

  const title = location.state?.title;
  const navigate = useNavigate();

  // Fetch book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/home_library/book/${title}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [title]);

  const startEditing = (field) => {
    setEditField(field);
    setFieldValue(book[field]);
  };

  const saveField = async () => {
    if (!editField) return;

    try {
      await axios.patch(
        `http://localhost:5000/home_library/update/${book.title}`,
        { [editField]: fieldValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI instantly
      setBook((prev) => ({
        ...prev,
        [editField]: fieldValue,
      }));

      setEditField(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) {
    return (
      <>
        <Header />
        <div className="book-details-page">
          <div className="book-details-empty">
            <p>No book details found 😢</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="book-details-page">
        <div className="book-details-container">
          {/* COVER IMAGE */}
          <div className="book-cover-section">
            {editField === "cover_image" ? (
              <div className="edit-input-row">
                <input
                  type="text"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
                <FiCheck className="save-icon" onClick={saveField} />
              </div>
            ) : (
              <>
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="book-details-cover"
                />
                <FiEdit2
                  className="edit-icon"
                  onClick={() => startEditing("cover_image")}
                />
              </>
            )}
          </div>

          {/* TEXT FIELDS */}
          <div className="book-info-section">
            {/* TITLE */}
            <EditableField
              field="title"
              label="Title"
              value={book.title}
              editField={editField}
              startEditing={startEditing}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              saveField={saveField}
            />

            {/* AUTHOR */}
            <EditableField
              field="author"
              label="Author"
              value={book.author}
              editField={editField}
              startEditing={startEditing}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              saveField={saveField}
            />

            {/* GENRE */}
            <EditableField
              field="genre"
              label="Genre"
              value={book.genre}
              editField={editField}
              startEditing={startEditing}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              saveField={saveField}
            />

            {/* LANGUAGE */}
            <EditableField
              field="language"
              label="Language"
              value={book.language}
              editField={editField}
              startEditing={startEditing}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              saveField={saveField}
            />

            {/* DATE */}
            <EditableField
              field="acquired_date"
              label="Acquired Date"
              value={book.acquired_date.slice(0, 10)}
              editField={editField}
              startEditing={startEditing}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              saveField={saveField}
            />

            {/* PRICE */}
            <EditableField
              field="price"
              label="Price"
              value={book.price}
              editField={editField}
              startEditing={startEditing}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              saveField={saveField}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;

// COMPONENT FOR EDITABLE ROWS
const EditableField = ({
  field,
  label,
  value,
  editField,
  startEditing,
  fieldValue,
  setFieldValue,
  saveField,
}) => {
  return (
    <p className="book-field">
      <strong>{label}: </strong>

      {editField === field ? (
        <span className="edit-input-row">
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <FiCheck className="save-icon" onClick={saveField} />
        </span>
      ) : (
        <>
          {value}
          <FiEdit2 className="edit-icon" onClick={() => startEditing(field)} />
        </>
      )}
    </p>
  );
};
