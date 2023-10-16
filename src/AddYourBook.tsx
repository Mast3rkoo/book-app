import { useState, useEffect } from "react";

const AddYourBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setCoverImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCoverImage = () => {
    setCoverImage(null);
    // Reset the file input if needed
    const fileInput = document.getElementById("cover");
    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = "";
    }
  };

  const handleAddUserBook = async (e) => {
    if (!coverImage) {
      console.error("Please select a cover image.");
      return;
    }

    const apiKey = "ab0b78581c1c392382912a70ef29af07"; // Replace with your actual API key

    const formData = new FormData();
    formData.append("key", apiKey);

    if (typeof coverImage === "string" && coverImage) {
      const imageData = coverImage.split(",").pop();
      if (imageData) {
        formData.append("image", imageData);
      } else {
        // Handle the case where imageData is not a valid string
      }
    } else {
      // Handle the case where coverImage is not a valid string
    }

    try {
      // Upload the image to ImgBB
      const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (imgbbResponse.ok) {
        const imgbbData = (await imgbbResponse.json()) as {
          data: { url: string };
        }; // Type assertion for imgbbData
        const imageUrl = imgbbData.data.url;

        // Create the userBook object with the image URL
        const userBook = {
          title: "",
          author: "",
          genre: "",
          description: "",
          coverImage: imageUrl,
        };

        // Send the userBook object to your JSON server or perform any other desired action
        await fetch("http://localhost:8000/own-books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userBook),
        });
        console.log("Book uploaded successfully");
      } else {
        console.error("Error uploading image to ImgBB.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error adding book:", error);
    }
  };

  useEffect(() => {
    const isValid =
      title !== "" &&
      author !== "" &&
      description !== "" &&
      coverImage !== null;
    setIsFormValid(isValid);
  }, [title, author, description, coverImage]);

  return (
    <div className="add-book-container">
      <h2>Add your book form</h2>
      <form id="book-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="genre">Genre:</label>
        <select
          className="genre-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Self-help">Self-help</option>
        </select>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Book about concentration, how to use your time..."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          id="cover"
          name="cover"
          accept="image/*"
          style={{ display: "none" }}
          required
          onChange={handleCoverImageChange}
        />
        <label htmlFor="cover" className="file-upload-label">
          Upload Book Cover
        </label>
        <h5 id="required-text"> *required</h5>

        <div className="center-container">
          {coverImage && (
            <div className="cover">
              <img src={coverImage} alt="Book Cover" className="cover-image" />
              <span
                className="delete-button"
                onClick={handleDeleteCoverImage}
                title="Delete"
              >
                <i className="fa fa-times fa-lg icon-color"></i>
              </span>
            </div>
          )}
        </div>
        <div className="space"></div>
        <button
          type="submit"
          className="book-button"
          onClick={handleAddUserBook}
          disabled={!isFormValid}
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddYourBook;
