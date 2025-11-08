import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdShare, IoIosMan } from "react-icons/io"
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md"
import { BsWhatsapp } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import '../css/One_page_view.css'
import aboutus from '../image/aboutus.jpg'

export default function One_Page_view() {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPostData(data);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPostData();
        }
    }, [id]);

    const handlePopup = (content) => {
        setPopupContent(content);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const handleSave = async () => {
        // Implement save to favorites functionality
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user || !token) {
            handlePopup('Please login to save posts');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    postId: id
                })
            });

            if (response.ok) {
                handlePopup('Post saved to favorites!');
            } else {
                handlePopup('Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            handlePopup('Error saving post');
        }
    };

    if (loading) {
        return (
            <div>
                <Navibar />
                <div className="loading">Loading post...</div>
                <Footer />
            </div>
        );
    }

    if (!postData) {
        return (
            <div>
                <Navibar />
                <div className="error">Post not found</div>
                <Footer />
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPostDetails = () => {
        switch (postData.categoryType) {
            case 'VEHICLE':
                return postData.vehiclePost ? [
                    `Condition: ${postData.condition}`,
                    `Brand: ${postData.vehiclePost.make}`,
                    `Model: ${postData.vehiclePost.model}`,
                    `Mileage: ${postData.vehiclePost.mileage} km`,
                    `Type: ${postData.vehiclePost.type}`,
                    `Year: ${postData.vehiclePost.year}`,
                    `Transmission: ${postData.vehiclePost.transmission}`,
                    `Body Type: ${postData.vehiclePost.bodyType}`,
                    `Fuel Type: ${postData.vehiclePost.fuelType}`,
                    `Engine: ${postData.vehiclePost.engineCapacity}`
                ] : [];
            case 'REAL_ESTATE':
                return postData.realEstatePost ? [
                    `Condition: ${postData.condition}`,
                    `Type: ${postData.realEstatePost.type}`,
                    `Bedrooms: ${postData.realEstatePost.bedrooms}`,
                    `Bathrooms: ${postData.realEstatePost.bathrooms}`,
                    `Lot Size: ${postData.realEstatePost.lotSize}`,
                    `Address: ${postData.realEstatePost.address}`
                ] : [];
            case 'PHONE':
                return postData.phonePost ? [
                    `Condition: ${postData.condition}`,
                    `Brand: ${postData.phonePost.brand}`,
                    `Model: ${postData.phonePost.model}`,
                    `Memory: ${postData.phonePost.memory}`,
                    `Battery: ${postData.phonePost.battery}`,
                    `Edition: ${postData.phonePost.edition}`
                ] : [];
            case 'ELECTRONIC':
                return postData.electronicPost ? [
                    `Condition: ${postData.condition}`,
                    `Brand: ${postData.electronicPost.brand}`,
                    `Model: ${postData.electronicPost.model}`,
                    `Type: ${postData.electronicPost.type}`,
                    `Screen Size: ${postData.electronicPost.screenSize}`
                ] : [];
            default:
                return [];
        }
    };

    return (
        <div>
            <Navibar />

            <div className="one_view_page">
                <div className="header-image2">
                    <img src={aboutus} alt="Header Image" />
                    <h1>{postData.categoryType?.replace('_', ' ') || 'POST'}</h1>
                </div>

                <div className="add_onebyone_view">
                    {/* TOP HEAD */}
                    <div className="topic_div">
                        <div className="top_head">
                            <h4>{postData.title}</h4>
                            <p>Posted on {formatDate(postData.createdAt)}</p>
                        </div>
                        <div className="top_others">
                            <a href="#">
                                <div className="share_part">
                                    <i><IoMdShare size={30} /></i>
                                    <h4>Share</h4>
                                </div>
                            </a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSave(); }}>
                                <div className="save_part">
                                    <i><MdOutlineStar size={30} /></i>
                                    <h4>Save</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* TOP SECTION */}
                    <section className="top-section">
                        <div className="image-gallery">
                            <div className="main-image">
                                <img src={aboutus} alt={postData.title} />
                            </div>
                            <div className="thumbs-container">
                                <div className="thumbs" id="thumbs">
                                    {/* Add thumbnail images here */}
                                </div>
                            </div>
                        </div>

                        {/* SELLER INFO */}
                        <div className="seller-info">
                            <div
                                className="seller_name"
                                onClick={() => handlePopup(`Seller Name: ${postData.contactName || postData.user?.firstName}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <IoIosMan size={35} color='#000' />
                                <h5>Seller Name</h5>
                            </div>

                            <div
                                className="seller_number"
                                onClick={() => handlePopup(`Call Seller: ${postData.contactPhone}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <FaPhoneAlt size={30} color='#1100ff' />
                                <h5>Phone Number</h5>
                            </div>

                            <div
                                className="seller_whatsapp"
                                onClick={() => handlePopup(`WhatsApp: ${postData.contactWhatsapp}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <BsWhatsapp size={30} color='#00f700' />
                                <h5>WhatsApp</h5>
                            </div>

                            <div
                                className="seller_chat"
                                onClick={() => handlePopup(`Start chat with ${postData.contactName || postData.user?.firstName}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <IoMdChatboxes size={30} color='#ff0000' />
                                <h5>Chat</h5>
                            </div>
                        </div>
                    </section>

                    {/* BOTTOM SECTION */}
                    <section className="bottom-section">
                        <div className="price-details">
                            <h3>Price : Rs. {postData.price?.toLocaleString()}</h3>
                            <h3>Property Details :</h3>
                            <div className="details-box">
                                <ul>
                                    {getPostDetails().map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="description">
                            <h3>Description</h3>
                            <div className="desc-box">
                                <p>{postData.description || 'No description provided.'}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* POPUP */}
            {popupVisible && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Information</h3>
                        <p>{popupContent}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}