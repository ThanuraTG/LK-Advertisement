import React from 'react'
import { useState } from 'react'
import { IoMdShare, IoIosMan } from "react-icons/io"
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineStar  } from "react-icons/md"
import { BsWhatsapp } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import '../css/One_page_view.css'
import aboutus from '../image/aboutus.jpg'

export default function One_Page_view_phone() {
    const [name, setName] = useState('THANURA');
    return (
        <div>
            {/* navigration bar component here */}
            <Navibar />
                {/* <!-- ===== MAIN ===== --> */}
            <div className="one_view_page">
                <div className="header-image2">
                    <img src={aboutus} alt="Header Image" />
                    <h1>MOBILE PHONES</h1>
                </div>
                <div className="add_onebyone_view">
                    <div className="topic_div">
                        <div className="top_head">
                            <h7>name</h7>
                            <p>post on time and date</p>
                        </div>
                        <div className="top_others">
                            <a href="">
                                <div className="share_part">
                                    <i><IoMdShare size={30} /></i>
                                    <h4>Share</h4>
                                </div>
                            </a>
                            <a href="">
                                <div className="save_part">
                                <i><MdOutlineStar  size={30} /></i>
                                <h4>Save</h4>
                            </div>
                            </a>
                        </div>
                    </div>
                {/* <!-- top section --> */}
                    <section class="top-section">
                        <div class="image-gallery">
                            <div class="main-image">
                                <img src={aboutus} alt="" />
                            </div>
                            <div class="thumbs-container">
                                <div class="thumbs" id="thumbs">
                                    <div class="thumb"><img src="" alt="" /></div>
                                    <div class="thumb"><img src="" alt="" /></div>
                                    <div class="thumb"><img src="" alt="" /></div>
                                    <div class="thumb"><img src="" alt="" /></div>
                                    <div class="thumb"></div>
                                    <div class="thumb"></div>
                                    <div class="thumb"></div>
                                    <div class="thumb"></div>
                                </div>
                            </div>
                        </div>

                        <div class="seller-info">
                            <a href="">
                                <div className="seller_name">
                                    <IoIosMan size={35} color='#000000ff' />
                                    <h5>Seller Name</h5>
                                </div>
                            </a>
                            <a href="">
                                <div className="seller_number">
                                    <FaPhoneAlt size={30} color='#1100ffff' />
                                    <h5>Phone Number</h5>
                                </div>
                            </a>
                            <a href="">
                                <div className="seller_whatsapp">
                                    <BsWhatsapp size={30} color='#00f700ff' />
                                    <h5>WhatsApp</h5>
                                </div>
                            </a>
                            <a href="">
                                <div className="seller_chat">
                                    <IoMdChatboxes size={30} color='#ff0000ff' />
                                    <h5>Chat</h5>
                                </div>
                            </a>
                        </div>
                    </section>
                {/* <!-- bottom section --> */}
                    <section className="bottom-section">
                        <div class="price-details">
                            <h3>Price : {}</h3>
                            <h3>Property Details :</h3>
                            <div class="details-box">
                                <ul>
                                    <li>Condition : {name}</li>
                                    <li>Brand : {name}</li>
                                    <li>Model : {name}</li>
                                    <li>Type : {name}</li>
                                    <li>Memory : {name}</li>
                                    <li>Battery : {name}</li>
                                    <li>Cam Size : {name}</li>
                                    <li>Features : {name}</li>
                                    <li>Item type : {name}</li>
                                    <li>Edition : {name}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="description">
                            <h3>Description</h3>
                            <div class="desc-box">
                                <p>
                                    ****************************************************<br/>
                                    ****************************************************<br/>
                                    ****************************************************<br/>
                                    ****************************************************
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {/* footer component here */}
            {/* <Footer /> */}
        </div>
    )
}
