import thanu from '../image/thanu.png'
import './footer.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert("Thank you for subscribing with: ${email}");
            setEmail('');
        }
    };

    return (
        <div>
            <section className='section_footer'>
                

                <div className="head">
                    <div className="logo-section">
                        <div className="logo">
                            <a href="/"><img src={thanu} alt="Company Logo" /></a>
                        </div>
                        <p className="description">
                            Creating beautiful and functional user experiences through 
                            innovative UI/UX design. We transform ideas into engaging, 
                            intuitive, and impactful digital solutions that not only look
                             stunning but also deliver seamless interactions and real results. 
                             Our design approach focuses on blending creativity with strategy 
                             to craft experiences that users truly love and remember.
                        </p>
                        <div className="social-links">
                            <a href="https://www.facebook.com" className="social-link">
                                <FaFacebookSquare size={20} />
                            </a>
                            <a href="https://www.instagram.com" className="social-link">
                                <FaInstagramSquare size={20} />
                            </a>
                            <a href="https://www.tiktok.com" className="social-link">
                                <FaTiktok size={20} />
                            </a>
                            <a href="https://www.linkedin.com" className="social-link">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="information">
                        <h2>Information</h2>
                        <ul>
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="/all_category" className="footer-link">Category</a></li>
                            <li><a href="/about" className="footer-link">About</a></li>
                            <li><a href="/contact" className="footer-link">Contact</a></li>
                            <li><a href="*" className="footer-link">Privacy Policy</a></li>
                            <li><a href="/terms" className="footer-link">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div className="resources">
                        <h2>Resources</h2>
                        <ul>
                            <li><a href="/blog" className="footer-link">Design Blog</a></li>
                            <li><a href="/tutorials" className="footer-link">Tutorials</a></li>
                            <li><a href="/tools" className="footer-link">Design Tools</a></li>
                            <li><a href="/templates" className="footer-link">Free Templates</a></li>
                            <li><a href="/portfolio" className="footer-link">Portfolio</a></li>
                            <li><a href="/support" className="footer-link">Support Center</a></li>
                        </ul>
                    </div>

                    <div className="contac">
                        <h2>Contact Me</h2>
                        <div className="contact-info">
                            <p>222/C, Nadun Viharaya Road,</p>
                            <p>Kiriella, Rathnapura,</p>
                            <p>Sri Lanka.</p>
                            <p className="phone">+94 70 122 6045</p>
                            <p className="email">thanu@example.com</p>
                        </div>
                    </div>
                </div>
                
                <div className="copyright">
                    <p>&copy; 2025 Thanu UI/UX Designer. All Rights Reserved.</p>
                    <div className="footer-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
