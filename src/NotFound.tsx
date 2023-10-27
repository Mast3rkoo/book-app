const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-header">404 - Page Not Found</h1>
        <p className="not-found-paragraph">
          Oops! It seems you've stumbled upon a missing page.
        </p>
        <p className="not-found-paragraph">Let's get you back on track:</p>
        <ul className="not-found-list">
          <li className="not-found-list-item">
            <a className="not-found-link" href="/">
              Go to Homepage
            </a>
          </li>
          <li className="not-found-list-item">
            <a className="not-found-link" href="/add-your-book">
              Add your own book
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
