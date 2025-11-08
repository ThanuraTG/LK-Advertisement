import React from 'react'
import '../css/contact.css'
import Navibar from '../componet/Navibar'
import Footer from '../componet/Footer'
import contact from '../image/contact.jpg'
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Contact() {
    return (
        <div>
            {/* navigation bar part here */}
            <Navibar />
            {/* body part here  */}
            <div className="contact-page">
                <div className="header-image">
                    <img src={contact} alt="Header Image" />
                    <h1>CONTACT</h1>
                </div>
                
                <div className="contact-content">
                    <h3>Get in Touch With Us</h3>
                    <p>Let’s connect! Whether you have questions, need assistance, we’re here to help. <br /> Reach out to us, and we’ll get back to you shortly.</p>
                    
                    <div className="phoneno-container">
                        <div className="phoneno">
                            <i className="fa-solid fa-phone"></i>
                            <h4>PHONE</h4>
                            <p>+94 112 34 5678</p>
                        </div>
                        <div class="phoneno">
                            <i className="fa-solid fa-envelope-open-text"></i>
                            <h4>EMAIL</h4>
                            <p>info@lkadvertisement.lk</p>
                        </div>
                        <div className="phoneno">
                            <i class="fa-solid fa-location-dot"></i>
                            <h4>ADDRESS</h4>
                            <p>No 361 Thalangama North,<br />Koswatta</p>
                        </div>
                    </div>
                    
                    <div className="map">
                        <h2>See Our Location</h2>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15245.2308724665!2d79.92372348627485!3d6.905919141180011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2574c57fb01dd%3A0xbf05b338e80f50c5!2sKoswatta%2C%20Sri%20Jayawardenepura%20Kotte!5e1!3m2!1sen!2slk!4v1752959428342!5m2!1sen!2slk"
                            width="800"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        />
                    </div>
                </div>
            </div>
            {/* <main>
                
            </main> */}
            {/* footer part here */}
            <Footer />
        </div>
    )
}
