import React, { useState, useEffect } from "react";
import "./HomeLanding.css";
// import '../../bootstrap.css';
import "./templatemo.css";
import "../../boxicon.min.css";
import "../../bootstrap.min.css";
import "../../fslightbox.js";
import "../../jquery.min.js";
import newCatImage from "../../Components/Images/sorting categories.png";
import subcatImage from "../../Components/Images/customcat.jpg";
import reportImage from "../../Components/Images/reports.png";
import cameraImage from "../../Components/Images/camera.png";
import uploadImage from "../../Components/Images/uploadpic.jpg";
import receiptImage from "../../Components/Images/ReceiptEdit.jpg";
import dashboardImage from "../../Components/Images/dashboards.png";
import notifImage from "../../Components/Images/notifications.png";

function HomeLanding() {
  var $ = require("jquery");
  var jQueryBridget = require("jquery-bridget");
  var Isotope = require("isotope-layout");
  jQueryBridget("isotope", Isotope, $);

  useEffect(() => {
    // Initialize Isotope after component mounts
    var $projects = $(".projects").isotope({
      itemSelector: ".project",
      layoutMode: "fitRows",
    });
    $(".filter-btn").on("click", function () {
      var data_filter = $(this).attr("data-filter");
      $projects.isotope({
        filter: data_filter,
      });
      $(".filter-btn").removeClass("active");
      $(".filter-btn").removeClass("shadow");
      $(this).addClass("active");
      $(this).addClass("shadow");
      return false;
    });
  }, []);

  return (
    <div>
      <nav
        id="main_nav"
        className="navbar navbar-expand-lg navbar-dark bg-white"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <button
            className="navbar-toggler ml-auto custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsingNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="align-self-center navbar-collapse collapse flex-fill d-lg-flex justify-content-lg-between"
            id="collapsingNavbar"
          >
            <div className="flex-fill mx-xl-5 mb-2">
              <ul className="navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark">
                <li className="nav-item active">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    href="/home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    href="/services"
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    id="signUp"
                    href="/register"
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    id="login"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="banner-wrapper bg-light">
        <div
          id="index_banner"
          className="banner-vertical-center-index container-fluid pt-5"
        >
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="py-5 row d-flex align-items-center">
                  <div className="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                    <h1 className="banner-heading h1 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                      Expense Reporting, <strong>Simplified</strong> Your
                      One-Stop Solution for Efficient Expense Management
                    </h1>
                    <p className="banner-body text-muted py-3 mx-0 px-0">
                      Welcome to EERIS, the Employee Expense Reporting
                      Information System crafted to make managing
                      business-related expenses seamless. With advanced features
                      like automated receipt scanning, real-time expense
                      tracking, and customizable categories, EERIS ensures that
                      every step — from submission to approval — is efficient
                      and accurate. Upload receipts, manage expenses, and
                      generate insightful financial reports, all in one place.
                      EERIS takes the hassle out of expense reporting,
                      empowering both employees and supervisors with smoother
                      workflows.
                    </p>

                    <a
                      className="banner-button btn rounded-pill btn-outline-primary btn-lg px-4"
                      href="/services"
                      role="button"
                    >
                      Click here to learn more
                    </a>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="py-5 row d-flex align-items-center">
                  <div className="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                    <h1 className="banner-heading h1 text-secondary display-3 mb-0 pb-3 mx-0 px-0 light-300">
                      Flexible Expense Entry —{" "}
                      <strong> Automated or Manual </strong>, Your Choice
                    </h1>
                    <p className="banner-body text-muted py-3">
                      With EERIS, you have the flexibility to choose how you
                      enter your expenses. Utilize intelligent receipt scanning
                      technology to automatically extract key details from
                      receipts, saving you time and ensuring accuracy. Prefer
                      manual entry? EERIS also offers an intuitive interface for
                      easy, error-free input of expense details. Whether you're
                      uploading a receipt or entering information yourself,
                      EERIS streamlines the process to fit your preferred
                      workflow, making expense management simple and efficient.
                    </p>
                    <a
                      className="banner-button btn rounded-pill btn-outline-primary btn-lg px-4"
                      href="/services"
                      role="button"
                    >
                      Click here to learn more
                    </a>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="py-5 row d-flex align-items-center">
                  <div className="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                    <h1 className="banner-heading h1 text-secondary display-3 mb-0 pb-3 mx-0 px-0 light-300">
                      Real-Time Access & Approval —{" "}
                      <strong>Stay Informed, Anytime, Anywhere</strong>
                    </h1>
                    <p className="banner-body text-muted py-3">
                      With EERIS, managing and tracking expenses has never been
                      easier. The system provides real-time dashboards for
                      employees and supervisors, making it simple to monitor
                      submission status, review receipts, and approve or reject
                      expenses on the go. Whether you’re in the office or
                      working remotely, EERIS ensures that the expense approval
                      process is transparent and efficient, giving you peace of
                      mind and full control over your team’s expenses.
                    </p>
                    <a
                      className="banner-button btn rounded-pill btn-outline-primary btn-lg px-4"
                      href="/services"
                      role="button"
                    >
                      Click here to learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>

      <section className="service-wrapper py-3">
        <div className="container-fluid pb-3">
          <div className="row">
            <h2 className="h2 text-center col-12 py-5 semi-bold-600">
              Services
            </h2>
            <div className="service-header text-end light-300">
              <div className="text-start pb-3">
                <h2 className="h3 pb-3 col-lg-9">
                  Explore Our Comprehensive Services
                </h2>
              </div>
            </div>
          </div>
          <p className="service-footer col-10 offset-2 col-lg-9 offset-lg-3 text-start pb-3 text-muted px-2">
            At EERIS, we offer a suite of services designed to streamline your
            expense management process. From automated receipt scanning to
            real-time tracking and flexible entry methods, our system empowers
            employees and supervisors to manage expenses with ease. Dive deeper
            into our offerings below to discover how EERIS can transform the way
            your organization handles business-related expenses.
          </p>
        </div>

        <div className="service-tag py-5 bg-secondary">
          <div className="col-md-12">
            <ul className="nav d-flex justify-content-center">
              <li className="nav-item mx-lg-4">
                <a
                  className="filter-btn nav-link btn-outline-primary active shadow rounded-pill text-light px-4 light-300"
                  href="#"
                  data-filter=".project"
                >
                  All
                </a>
              </li>
              <li className="nav-item mx-lg-4">
                <a
                  className="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300"
                  href="#"
                  data-filter=".receipt"
                >
                  Receipt Uploading
                </a>
              </li>
              <li className="filter-btn nav-item mx-lg-4">
                <a
                  className="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300"
                  href="#"
                  data-filter=".categoryManagement"
                >
                  Expense Category Management
                </a>
              </li>
              <li className="nav-item mx-lg-4">
                <a
                  className="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300"
                  href="#"
                  data-filter=".notifs"
                >
                  Expense Approval & Review
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container overflow-hidden py-5">
        <div className="row gx-5 gx-sm-3 gx-lg-5 gy-lg-5 gy-3 pb-3 projects">
          <div className="col-xl-3 col-md-4 col-sm-6 project categoryManagement">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={newCatImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Pre-defined Categories
                  </span>
                  <p className="card-text">
                    Provided with a comprehensive list of pre-set categories to
                    simplify the classification of your expenses.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project categoryManagement">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={subcatImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Create Subcategories
                  </span>
                  <p className="card-text">
                    Create and personalize custom subcategories within major
                    expense types to reflect your company's needs.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project categoryManagement notifs">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={reportImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Category Reporting
                  </span>
                  <p className="card-text">
                    View detailed reports, track spending trends, and identify
                    cost-saving opportunities for better budget planning.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project receipt">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={cameraImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Snap a Photo
                  </span>
                  <p className="card-text">
                    Snap a photo, and EERIS automatically extracts and inputs
                    the receipt details into your expense report.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project receipt">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={uploadImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Upload Scanned Images
                  </span>
                  <p className="card-text">
                    Upload a scanned receipt document, and EERIS extracts the
                    data for seamless expense tracking.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project notifs receipt">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={receiptImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Review Receipt Details
                  </span>
                  <p className="card-text">
                    Manually enter your expense data or scan/upload and still
                    edit details as needed, giving you control over your
                    entries.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project notifs">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={dashboardImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Real-Time Dashboard
                  </span>
                  <p className="card-text">
                    Supervisors can use the real-time dashboard to review,
                    approve, reject, and track expenses.
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 project notifs ">
            <a
              href="/services"
              className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
            >
              <img
                className="service card-img"
                src={notifImage}
                alt="Card image"
              />
              <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                <div className="service-work-content text-left text-light">
                  <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                    Approval Notifications
                  </span>
                  <p className="card-text">
                    Receive real-time alerts for when reports are submitted and
                    approval or rejection status.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer className="w-100 bg-primary py-3">
        <div className="container">
          <div className="row py-4">
            <div className="col-md-4 my-sm-0 mt-4">
              <h3 className="h4 pb-lg-3 text-light light-300">Our Company</h3>
              <ul className="list-unstyled text-light light-300">
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/home"
                  >
                    Home
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/register"
                  >
                    Create an Account
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 my-sm-0 mt-4">
              <h2 className="h4 pb-lg-3 text-light light-300">Our Services</h2>
              <ul className="list-unstyled text-light light-300">
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Snap a Photo
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Upload a Document
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Manual Receipt Entry
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Predefined Categories
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Create subcategories
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Category Reporting
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Real-Time Dashboard
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bx-fw bx bxs-chevron-right bx-xs"></i>
                  <a
                    className="text-decoration-none text-light py-1"
                    href="/services"
                  >
                    Instant Notifications
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-100 bg-primary py-3">
          <div className="container">
            <div className="row pt-2">
              <div className="col-lg-6 col-sm-12">
                <p className="text-lg-end text-center text-light light-300">
                  Designed by <strong>Group 3</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* <!-- Bootstrap --> */}
      <script src="assets/js/bootstrap.bundle.min.js"></script>
      {/* <!-- Load jQuery require for isotope --> */}
      <script src="assets/js/jquery.min.js"></script>
      {/* <!-- Isotope --> */}
      <script src="assets/js/isotope.pkgd.js"></script>

      {/* <!-- Templatemo --> */}
      <script src="assets/js/templatemo.js"></script>
      {/* <!-- Custom --> */}
      <script src="assets/js/custom.js"></script>
    </div>
  );
}

export default HomeLanding;
