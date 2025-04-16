import React from "react";
import "./ServicesLanding.css";

function ServicesLanding() {
  return (
    <body>
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
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    id="login"
                    href="/login"
                  >
                    Log In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="section-title text-center mb-4 pb-2">
              <h4 class="title mb-4">Our Features</h4>
              <p class="text-muted para-desc mx-auto mb-0">
                Explore our robust set of features designed to streamline your
                expense management workflow.
              </p>
              <p class="text-muted para-desc mx-auto mb-0">
                From real-time tracking to comprehensive reporting, we provide
                the tools you need to take control of your finances.
              </p>
              <p class="text-muted para-desc mx-auto mb-0">
                Create an account to get started and unlock the full potential
                of seamless expense management today!
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-arrow-down-square-fill"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"></path>
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Upload Images</h5>
                <p
                  className="collapse"
                  id="collapseExample"
                  aria-expanded="false"
                >
                  Effortlessly Track Expenses by Uploading Receipts. If you have
                  a scanned copy of your receipt, simply upload it to EERIS. The
                  system’s data extraction feature will capture all necessary
                  details from the scanned image, including date, total cost,
                  and other relevant information. EERIS then automatically
                  populates these details into the appropriate fields, making it
                  easy to track your business expenses without tedious manual
                  input.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-arrow-down-square-fill"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-grid-1x2-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Predefined Categories</h5>
                <p
                  className="collapse"
                  id="collapseExample2"
                  aria-expanded="false"
                >
                  Simplify Expense Classification with Pre-Set Categories. EERIS
                  comes with a comprehensive list of pre-defined expense
                  categories designed to simplify the classification of business
                  expenses. These categories—such as travel, meals, office
                  supplies, entertainment, and training—are fully customizable
                  to fit your company’s policies.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample2"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-grid-1x2-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-bar-chart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"></path>
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Real-Time Dashboards</h5>
                <p
                  className="collapse"
                  id="collapseExample3"
                  aria-expanded="false"
                >
                  Monitor and Manage Expenses in Real-Time Supervisors and
                  employees alike can benefit from EERIS’s real-time dashboard,
                  which provides up-to-the-minute access to submitted expense
                  reports. Supervisors can quickly review, approve, or reject
                  reports, while also tracking the status of pending approvals.
                  The dashboard ensures full visibility into the entire expense
                  management process, making it easier to stay on top of
                  approvals and expenses, minimizing delays and bottlenecks in
                  reimbursement workflows.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample3"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-bar-chart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    class="bi bi-card-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Snap a Photo</h5>
                <p
                  className="collapse"
                  id="collapseExample4"
                  aria-expanded="false"
                >
                  Seamless Expense Tracking with Just a Photo With the EERIS
                  mobile or web app, you can simply snap a photo of your
                  receipt, and the system will do the rest. Using advanced image
                  processing technology, EERIS automatically extracts key
                  receipt details such as the date, amount, vendor, and expense
                  category, and populates them directly into your expense
                  report. This streamlines the reporting process, eliminates the
                  need for manual data entry, and ensures that your expenses are
                  recorded quickly and accurately.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample4"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-card-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-clipboard-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Review Receipt Details</h5>
                <p
                  className="collapse"
                  id="collapseExample5"
                  aria-expanded="false"
                >
                  Maintain Full Control Over Your Expense Entries EERIS provides
                  users the flexibility to review and edit receipt details even
                  after scanning or uploading. If any data is missing or needs
                  adjustment, you can manually enter or modify expense
                  information to ensure accuracy. This feature gives you full
                  control over the expense submission process, enabling you to
                  make corrections before submitting for approval, ensuring your
                  records are complete and error-free.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample5"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-clipboard-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-chat-square-dots-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Approval Notifications</h5>
                <p
                  className="collapse"
                  id="collapseExample6"
                  aria-expanded="false"
                >
                  Stay Informed with Real-Time Alerts EERIS sends real-time
                  notifications to both employees and supervisors whenever
                  expense reports are submitted, reviewed, or approved. You’ll
                  also receive alerts for rejected reports, complete with
                  details about why the rejection occurred. This ensures that
                  everyone stays in the loop, helping to keep the process
                  efficient and transparent.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample6"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-chat-square-dots-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-diagram-3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z"
                    />
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Create Subcategories</h5>
                <p
                  className="collapse"
                  id="collapseExample7"
                  aria-expanded="false"
                >
                  Tailor Your Expense Management System to Suit Your Business
                  Needs With EERIS, you can easily create and personalize custom
                  subcategories within major expense types. Whether it’s adding
                  subcategories for specific travel expenses like parking fees,
                  gas, or auto repairs under “Transportation,” or splitting out
                  entertainment costs for client meetings, EERIS provides the
                  flexibility to align with your company’s specific needs and
                  policies. This feature helps ensure that your expense
                  reporting system is comprehensive, organized, and fully
                  adaptable to your business operations.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample7"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-diagram-3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card service-wrapper rounded border-0 shadow p-4">
              <div class="icon text-center text-custom h1 shadow rounded bg-white">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-file-text-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
                  </svg>
                </span>
              </div>
              <div class="content mt-4" id="module">
                <h5 class="title">Category Reporting</h5>
                <p
                  className="collapse"
                  id="collapseExample8"
                  aria-expanded="false"
                >
                  Gain Insightful, Actionable Data on Your Company’s Spending
                  EERIS offers powerful category reporting that allows you to
                  generate detailed or summary reports across different expense
                  categories. Track spending trends over time, compare costs
                  across departments, and identify key areas where your company
                  can reduce waste or save money. These detailed insights will
                  help inform better budget planning and financial decisions,
                  enabling you to stay on top of your expense management.
                </p>
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapseExample8"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  class="collapsed"
                ></a>
              </div>
              <div class="big-icon h1 text-custom">
                <span class="uim-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    fill="currentColor"
                    class="bi bi-file-text-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default ServicesLanding;
