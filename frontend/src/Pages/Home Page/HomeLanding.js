import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeLanding.css';
import './templatemo.css';
import '../../boxicon.min.css';
import '../../bootstrap.min.css';
import '../../fslightbox.js';
import '../../jquery.min.js';
import newCatImage from '../../Components/Images/sorting categories.png';
import subcatImage from '../../Components/Images/customcat.jpg';
import reportImage from '../../Components/Images/reports.png';
import cameraImage from '../../Components/Images/camera.png';
import uploadImage from '../../Components/Images/uploadpic.jpg';
import receiptImage from '../../Components/Images/ReceiptEdit.jpg';
import dashboardImage from '../../Components/Images/dashboards.png';
import notifImage from '../../Components/Images/notifications.png';

function HomeLanding() {

  const navigate = useNavigate();
  var $ = require('jquery');
  var jQueryBridget = require('jquery-bridget');
  var Isotope = require('isotope-layout'); 
  jQueryBridget( 'isotope', Isotope, $ );
  
  useEffect(() => {
    // Initialize Isotope after component mounts
    var $projects = $('.projects').isotope({
        itemSelector: '.project',
        layoutMode: 'fitRows'
    });
    $(".filter-btn").on("click",(function() {
        var data_filter = $(this).attr("data-filter");
        $projects.isotope({
            filter: data_filter
        });
        $(".filter-btn").removeClass("active");
        $(".filter-btn").removeClass("shadow");
        $(this).addClass("active");
        $(this).addClass("shadow");
        return false;
    }));
  }, []);
  
  return (

    <body>
        <nav id="main_nav" class="navbar navbar-expand-lg navbar-dark bg-white">
            <div class="container d-flex justify-content-between align-items-center">
            <button class="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
                <div class="align-self-center navbar-collapse collapse flex-fill d-lg-flex justify-content-lg-between" id="collapsingNavbar">
                    <div class="flex-fill mx-xl-5 mb-2">
                        <ul class="navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark">
                            <li class="nav-item active">
                                <a class="nav-link btn-outline-primary rounded-pill px-3" href="/home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-outline-primary rounded-pill px-3" href="/about">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-outline-primary rounded-pill px-3" href="/services">Services</a>
                            </li>
                            <li className="nav-item">
                            <a class="nav-link btn-outline-primary rounded-pill px-3" id="signUp" href = "/signUp">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a class="nav-link btn-outline-primary rounded-pill px-3" id= "logIn" href = "/logIn">Sign In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div class="banner-wrapper bg-light">
            <div id="index_banner" class="banner-vertical-center-index container-fluid pt-5">            
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">

                        <div class="carousel-item active">

                            <div class="py-5 row d-flex align-items-center">
                                <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                    <h1 class="banner-heading h1 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                                    Expense Reporting, <strong>Simplified</strong> Your One-Stop Solution for Efficient Expense Management
                                    </h1>
                                    <p class="banner-body text-muted py-3 mx-0 px-0">
                                    Welcome to EERIS, the Employee Expense Reporting Information System crafted to make managing business-related expenses seamless. With advanced features like automated receipt scanning, real-time expense tracking, and customizable categories, EERIS ensures that every step — from submission to approval — is efficient and accurate. Upload receipts, manage expenses, and generate insightful financial reports, all in one place. EERIS takes the hassle out of expense reporting, empowering both employees and supervisors for smoother workflows. 
                                    </p>
                                    
                                    <a class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" href="/services" role="button">Click here to learn more</a>
                                    
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">

                            <div class="py-5 row d-flex align-items-center">
                                <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                    <h1 class="banner-heading h1 text-secondary display-3 mb-0 pb-3 mx-0 px-0 light-300">
                                        Flexible Expense Entry — <strong> Automated or Manual </strong>, Your Choice
                                    </h1>
                                    <p class="banner-body text-muted py-3">
                                        With EERIS, you have the flexibility to choose how you enter your expenses. Utilize intelligent receipt scanning technology to automatically extract key details from receipts, saving you time and ensuring accuracy. Prefer manual entry? EERIS also offers an intuitive interface for easy, error-free input of expense details. Whether you're uploading a receipt or entering information yourself, EERIS streamlines the process to fit your preferred workflow, making expense management simple and efficient.
                                    </p>
                                    <a class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" href="/services" role="button">Click here to learn more</a>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">

                            <div class="py-5 row d-flex align-items-center">
                                <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                    <h1 class="banner-heading h1 text-secondary display-3 mb-0 pb-3 mx-0 px-0 light-300">
                                        Real-Time Access & Approval — <strong>Stay Informed, Anytime, Anywhere</strong>
                                    </h1>
                                    <p class="banner-body text-muted py-3">
                                        With EERIS, managing and tracking expenses has never been easier. The system provides real-time dashboards for employees and supervisors, making it simple to monitor submission status, review receipts, and approve or reject expenses on the go. Whether you’re in the office or working remotely, EERIS ensures that the expense approval process is transparent and efficient, giving you peace of mind and full control over your team’s expenses.
                                    </p>
                                    <a class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" href="/services" role="button">Click here to learn more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            

            </div>
        </div>

    
        <section class="service-wrapper py-3">
            <div class="container-fluid pb-3">
                <div class="row">
                    <h2 class="h2 text-center col-12 py-5 semi-bold-600">Services</h2>
                    <div class="service-header col-2 col-lg-3 text-end light-300">
                        <i class='bx bx-gift h3 mt-1'></i>
                    </div>
                    <div class="service-heading col-10 col-lg-9 text-start float-end light-300">
                        <h2 class="h3 pb-4 typo-space-line">Explore Our Comprehensive Services</h2>
                    </div>
                </div>
                <p class="service-footer col-10 offset-2 col-lg-9 offset-lg-3 text-start pb-3 text-muted px-2">
                At EERIS, we offer a suite of services designed to streamline your expense management process. From automated receipt scanning to real-time tracking and flexible entry methods, our system empowers employees and supervisors to manage expenses with ease. Dive deeper into our offerings below to discover how EERIS can transform the way your organization handles business-related expenses.
                </p>
            </div>

            <div class="service-tag py-5 bg-secondary">
                <div class="col-md-12">
                    <ul class="nav d-flex justify-content-center">
                        <li class="nav-item mx-lg-4">
                            <a class="filter-btn nav-link btn-outline-primary active shadow rounded-pill text-light px-4 light-300" href="#" data-filter=".project">All</a>
                        </li>
                        <li class="nav-item mx-lg-4">
                            <a class="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300" href="#" data-filter=".receipt">Receipt Uploading</a>
                        </li>
                        <li class="filter-btn nav-item mx-lg-4">
                            <a class="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300" href="#" data-filter=".categoryManagement">Expense Category Management</a>
                        </li>
                        <li class="nav-item mx-lg-4">
                            <a class="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300" href="#" data-filter=".notifs">Expense Approval & Review</a>
                        </li>
                    </ul>
                </div>
            </div>

        </section>

        <section class="container overflow-hidden py-5">
            <div class="row gx-5 gx-sm-3 gx-lg-5 gy-lg-5 gy-3 pb-3 projects">

                <div class="col-xl-3 col-md-4 col-sm-6 project categoryManagement">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={newCatImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Pre-defined Categories</span>
                                <p class="card-text">Provided with a comprehensive list of pre-set categories to simplify the classification of your expenses.</p>
                            </div>
                        </div>
                    </a>
                </div>

            
                <div class="col-xl-3 col-md-4 col-sm-6 project categoryManagement">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={subcatImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Create Subcategories</span>
                                <p class="card-text">Create and personalize custom subcategories within major expense types to reflect your company's needs.</p>
                            </div>
                        </div>
                    </a>
                </div>

                
                <div class="col-xl-3 col-md-4 col-sm-6 project categoryManagement notifs">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={reportImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Category Reporting</span>
                                <p class="card-text">View detailed reports, track spending trends, and identify cost-saving opportunities for better budget planning.</p>
                            </div>
                        </div>
                    </a>
                </div>

                
                <div class="col-xl-3 col-md-4 col-sm-6 project receipt">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={cameraImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Snap a Photo</span>
                                <p class="card-text">Snap a photo, and EERIS automatically extracts and inputs the receipt details into your expense report.</p>
                            </div>
                        </div>
                    </a>
                </div>

                
                <div class="col-xl-3 col-md-4 col-sm-6 project receipt">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={uploadImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Upload Scanned Images</span>
                                <p class="card-text">Upload a scanned receipt document, and EERIS extracts the data for seamless expense tracking.</p>
                            </div>
                        </div>
                    </a>
                </div>

                
                <div class="col-xl-3 col-md-4 col-sm-6 project notifs receipt">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={receiptImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Review Receipt Details</span>
                                <p class="card-text">Manually enter your expense data or scan/upload and still edit details as needed, giving you control over your entries.</p>
                            </div>
                        </div>
                    </a>
                </div>

                
                <div class="col-xl-3 col-md-4 col-sm-6 project notifs">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={dashboardImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Real-Time Dashboard</span>
                                <p class="card-text">Supervisors can use the real-time dashboard to review, approve, reject, and track expenses.</p>
                            </div>
                        </div>
                    </a>
                </div>

                
                <div class="col-xl-3 col-md-4 col-sm-6 project notifs ">
                    <a href="/services" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                    <img class="service card-img" src={notifImage} alt="Card image" />
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">Approval Notifications</span>
                                <p class="card-text">Receive real-time alerts for when reports are submitted and approval or rejection status.</p>
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </section>

        
        <footer class="w-100 bg-primary py-3">
            
            <div class="container">
                <div class="row py-4">
                    <div class="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h3 class="h4 pb-lg-3 text-light light-300">Our Company</h3>
                        <ul class="list-unstyled text-light light-300">
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light" href="/home">Home</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/aboutus">About Us</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i>
                                <a class="text-decoration-none text-light py-1" href="/signUp">Create an Account</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 class="h4 pb-lg-3 text-light light-300">Our Services</h2>
                        <ul class="list-unstyled text-light light-300">
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Snap a Photo</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Upload a Document</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Manual Receipt Entry</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Predefined Categories</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Create subcategories</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Category Reporting</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Real-Time Dashboard</a>
                            </li>
                            <li class="pb-2">
                                <i class='bx-fw bx bxs-chevron-right bx-xs'></i><a class="text-decoration-none text-light py-1" href="/services">Instant Notifications</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div class="w-100 bg-primary py-3">
                <div class="container">
                    <div class="row pt-2">
                        <div class="col-lg-6 col-sm-12">
                            <p class="text-lg-end text-center text-light light-300">
                                Designed by <a rel="sponsored" class="text-decoration-none text-light" ><strong>Group 3</strong></a>
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


    </body>
  );
}

export default HomeLanding;
