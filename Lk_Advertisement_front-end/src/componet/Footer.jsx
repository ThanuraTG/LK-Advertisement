import thanu from '../image/thanu.png'
import './footer.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <div>
            <section className='section_footer'>
                <div className="head">
                    <div className="logo">
                        <a href=""><img src={thanu} alt="" /></a>
                    </div>
                    <div className="information">
                        <h2>Information</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/all_category">Category</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="follow">
                        <h2>Follow Us On</h2>
                        <ul>
                            <li><a href="https://www.facebook.com"><FaFacebookSquare size={25} /></a></li>
                            <li><a href="https://www.instagram.com"><FaInstagramSquare size={25} /></a></li>
                            <li><a href="https://www.tiktok.com"><FaTiktok size={25} /></a></li>
                            <li><a href="https://www.linkedin.com"><FaLinkedin size={25} /></a></li>
                        </ul>
                    </div>
                    <div className="contac">
                        <h2>Contact Me</h2>
                        <p>222/C, Nadun Viharaya Road,</p>
                        <p>Kiriella,</p>
                        <p>Rathnapura,</p>
                        <p>Sri Lanka.</p>
                        <p>+94 70 122 6045</p>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2025 Thanu UI/UX Designer. All Rights Reserved.</p>
                </div>
            </section>
        </div>
    )
}