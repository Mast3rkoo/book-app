import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./UseFetch";
import { OpenAI } from "openai";

const GetBookInfo = () => {
  const { genre, book_id } = useParams();
  const { data: selectedBook } = useFetch(
    `http://localhost:8000/${genre}/${book_id}`
  );
  const [isBookAdded, setIsBookAdded] = useState(false);
  const [isReadButton, setIsReadButton] = useState("");
  const [chatgptResponse, setChatgptResponse] = useState("");

  const openai = new OpenAI({
    apiKey: "apikey",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    if (selectedBook && selectedBook.id) {
      // Fetch the user's books from http://localhost:8000/userBooks
      fetch("http://localhost:8000/userBooks")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Check if the selected book is already in userBooks
          setIsBookAdded(data.some((book) => book.id === selectedBook.id));
          if (isBookAdded) {
            setIsReadButton("✅ Reading");
            return;
          } else {
            setIsReadButton("Want to read");
          }
        })
        .catch((error) => {
          console.error("Error fetching user books: " + error);
        });
    }
  });

  const SaveBook = () => {
    if (!selectedBook || !selectedBook.id) {
      return;
    }

    if (isBookAdded) {
      return;
    }

    fetch("http://localhost:8000/userBooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsBookAdded(true);
      })
      .catch((err) => {
        console.error("There was an error in uploading the book: " + err);
      });
  };

  const generateSummary = async () => {
    try {
      setChatgptResponse("Waiting for chatGPT...");
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content: `Write me a 4 simple sentence long summary of the book ${selectedBook.title} without writing the book name and author.`,
          },
        ],
        max_tokens: 500,
        temperature: 0.2,
      });
      setChatgptResponse(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching summary:", error);
      console.log("Error response:", error.response);
    }
  };

  return (
    <div>
      {selectedBook && (
        <div>
          <div className="space"></div>
          <div>
            <a href={selectedBook.url}>
              <img
                className="info-book-img"
                src={selectedBook.coverImage}
                alt="book-image"
              />
            </a>
          </div>
          <div className="space"></div>
          <div className="book-info-container">
            <h2>{selectedBook.title}</h2>
            <p>{selectedBook.author}</p>
          </div>
          <div className="space"></div>
          <button onClick={SaveBook} className="green-pill-button">
            {isReadButton}
          </button>
          <div className="space"></div>
          <button onClick={generateSummary} className="chatgpt-button">
            ChatGPT summary of the book
          </button>
          <div className="space"></div>
          {chatgptResponse && (
            <div className="chatgpt-book-summary">{chatgptResponse}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetBookInfo;
