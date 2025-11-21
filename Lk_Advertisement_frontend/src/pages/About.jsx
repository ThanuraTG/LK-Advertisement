import React from 'react'
import '../css/about.css'
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import aboutus from '../image/aboutus.jpg'

export default function About() {
    return (
        <div>
        {/* <!-- Header --> */}
            <Navibar />

        {/* <!-- About Section --> */}
            <div className="header-image">
                <img src={aboutus} alt="Header Image" />
                <h1>ABOUT US</h1>
            </div>

            <section className='about_container'>
                <div class="end_part">
                    <div class="header">
                        <h3>What is</h3>
                        <h1>LK Advertisement?</h1>
                        <img src={aboutus} alt="" />
                    </div>
                    <div class="body_part">
                        <p>Welcome to LK Advertisement — Sri Lanka’s trusted online platform for buying and selling!</p>
                        <p>We bring together thousands of users across the island to connect, trade, and discover great deals on vehicles, real estate, electronics, phones, and many more. Whether you’re looking to sell your product fast or find the perfect item for your needs, LK Advertisement makes it simple, secure, and accessible for everyone.</p>
                        <p>Our mission is to empower local communities by creating a space where people can conveniently share, explore, and grow through online trading. With user-friendly tools, transparent listings, and direct communication options, we make sure that every transaction builds trust and value.</p>
                        <p>At LK Advertisement, we believe online trading should go beyond buying and selling — it’s about connecting people, creating opportunities, and supporting the local economy.</p>
                        <p>Join us today and experience a smarter way to advertise, buy, and sell in Sri Lanka!</p>
                    </div>
                </div>
            </section>
            
        {/* footer component  */}
            <Footer />
        </div>
    )
}
