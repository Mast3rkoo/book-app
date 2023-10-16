import { useState, useRef, Key } from "react";
import useFetch from "./UseFetch";

const GetBooks = () => {
  const {
    data: topBooks,
    isPending,
    error,
  } = useFetch("http://localhost:8000/topBooks");

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRefTop = useRef(null);
  const carouselRefUser = useRef(null);
  const carouselRefGenre = useRef(null);
  const carouselRefOwnBooks = useRef(null);

  const handleMove = (carouselRef, direction: number) => {
    setCurrentIndex((prevIndex) => prevIndex + direction);
    scrollCarousel(carouselRef, direction);
  };

  const scrollPercentage = 0.3;

  const scrollCarousel = (carouselRef, direction: number) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = carousel.clientWidth * direction * scrollPercentage;
      carousel.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [genre, setGenre] = useState("fantasy");

  const { data: selectedGenre } = useFetch("http://localhost:8000/" + genre);

  const { data: userBooks } = useFetch("http://localhost:8000/userBooks");

  const { data: ownBooks } = useFetch("http://localhost:8000/ownBooks");

  return (
    <div>
      <div>
        <div className="space"></div>
        <h2>Saved books</h2>
        <div className="space"></div>
        <div className="userBooks">
          <div className="wrapper">
            <i
              className="fa-solid fa-angle-left"
              onClick={() => handleMove(carouselRefUser, -1)}
            ></i>
            <div className="carousel" ref={carouselRefUser}>
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {userBooks &&
                userBooks.map(
                  (book: { id: Key; coverImage: string; title: string }) => (
                    <a
                      key={book.id}
                      href={`/get-book-info/userBooks/${book.id}/${book.title}`}
                      className="book-link"
                    >
                      <img
                        key={book.id}
                        src={book.coverImage}
                        alt={book.title}
                        className="book-img"
                      />
                    </a>
                  )
                )}
            </div>
            <i
              className="fa-solid fa-angle-right"
              onClick={() => handleMove(carouselRefUser, 1)}
            ></i>
          </div>
        </div>
      </div>
      {ownBooks && ownBooks.length > 0 && (
        <div>
          <div className="space"></div>
          <h2>Your own books</h2>
          <div className="space"></div>
          <div className="ownBooks">
            <div className="wrapper">
              <i
                className="fa-solid fa-angle-left"
                onClick={() => handleMove(carouselRefOwnBooks, -1)}
              ></i>
              <div className="carousel" ref={carouselRefOwnBooks}>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {ownBooks &&
                  ownBooks.map(
                    (book: { id: Key; coverImage: string; title: string }) => (
                      <a
                        key={book.id}
                        href={`/get-book-info/ownBooks/${book.id}/${book.title}`}
                        className="book-link"
                      >
                        <img
                          key={book.id}
                          src={book.coverImage}
                          alt={book.title}
                          className="book-img"
                        />
                      </a>
                    )
                  )}
              </div>
              <i
                className="fa-solid fa-angle-right"
                onClick={() => handleMove(carouselRefOwnBooks, 1)}
              ></i>
            </div>
          </div>
        </div>
      )}
      <div className="space"></div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      />
      <h2>Top Books</h2>
      <div className="space"></div>
      <div className="wrapper">
        <i
          className="fa-solid fa-angle-left"
          onClick={() => handleMove(carouselRefTop, -1)}
        ></i>
        <div className="carousel" ref={carouselRefTop}>
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {topBooks &&
            topBooks.map(
              (book: { id: Key; coverImage: string; title: string }) => (
                <a
                  key={book.id}
                  href={`/get-book-info/topBooks/${book.id}/${book.title}`}
                  className="book-link"
                >
                  <img
                    key={book.id}
                    src={book.coverImage}
                    alt={book.title}
                    className="book-img"
                  />
                </a>
              )
            )}
        </div>
        <i
          className="fa-solid fa-angle-right"
          onClick={() => handleMove(carouselRefTop, 1)}
        ></i>
      </div>
      <div className="space"></div>
      <div className="select">
        <h2>Best books by genre:</h2>
        <div className="space"></div>
        <select
          id="standard-select"
          onChange={(e) => {
            setGenre(e.target.value);
            setTimeout(() => {
              scrollCarousel(carouselRefGenre, -100);
            }, 800);
          }}
        >
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Self-help">Self-help</option>
        </select>
      </div>
      <div className="space"></div>
      <div className="wrapper">
        <i
          className="fa-solid fa-angle-left"
          onClick={() => handleMove(carouselRefGenre, -1)}
        ></i>
        <div className="carousel" ref={carouselRefGenre}>
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {selectedGenre &&
            selectedGenre.map(
              (book: { id: Key; coverImage: string; title: string }) => (
                <a
                  key={book.id}
                  href={`/get-book-info/${genre}/${book.id}/${book.title}`}
                  className="book-link"
                >
                  <img
                    key={book.id}
                    src={book.coverImage}
                    alt={book.title}
                    className="book-img"
                  />
                </a>
              )
            )}
        </div>
        <i
          className="fa-solid fa-angle-right"
          onClick={() => handleMove(carouselRefGenre, 1)}
        ></i>
      </div>
    </div>
  );
};

export default GetBooks;
