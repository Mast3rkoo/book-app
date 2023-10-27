const Footer = () => {
  return (
    <footer>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="space"></div>
      <div className="footer">
        <div className="row">
          <a href="https://www.facebook.com/filip.noga.31">
            <i className="fa fa-facebook facebook"></i>
          </a>
          <a href="https://www.instagram.com/filipnoga/">
            <i className="fa fa-instagram instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/filip-noga-428575289/">
            <i className="fa fa-linkedin linkedin"></i>
          </a>
          <a href="https://discord.com/users/569889967204073503">
            <i className="fa fa-discord discord"></i>
          </a>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>

        <div className="row">
          BOOKSFORU Copyright © 2021 BooksForU - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
