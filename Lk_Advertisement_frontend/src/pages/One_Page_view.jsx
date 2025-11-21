import { useEffect, useState } from 'react';
import { BsWhatsapp } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMan, IoMdChatboxes, IoMdShare } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { useParams } from 'react-router-dom';
import Footer from '../componet/Footer';
import Navibar from '../componet/Navibar';
import '../css/One_page_view.css';
import aboutus from '../image/aboutus.jpg';
import phone from '../image/phone.jpg';
import vehicle from '../image/vehicle.jpg';
import estate from '../image/estate.webp';
import elecronic from '../image/elecronic.jpg';

export default function One_Page_view() {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);          // actual Post object (post fields)
    const [categoryData, setCategoryData] = useState({       // vehicle/realEstate/phone/electronic
        vehicle: null,
        realEstate: null,
        phone: null,
        electronic: null
    });
    const [allImages, setAllImages] = useState([]);          // flattened ImageBlob objects { id, fileName, ... }
    const [mainImage, setMainImage] = useState(null);        // a URL to use in <img>
    const [loading, setLoading] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/api/posts/${id}`);
                if (!res.ok) {
                    console.error("Post fetch failed:", res.status);
                    setPostData(null);
                    return;
                }
                const data = await res.json();

                // data is FullPostDTO: { post, vehiclePost, realEstatePost, phonePost, electronicPost, images }
                setPostData(data.post || null);

                setCategoryData({
                    vehicle: data.vehiclePost || null,
                    realEstate: data.realEstatePost || null,
                    phone: data.phonePost || null,
                    electronic: data.electronicPost || null
                });

                // Flatten images: data.images is List<ImageFile>, each has .images (list of ImageBlob)
                const flattened = (data.images || []).flatMap(imageFile => imageFile.images || []);
                setAllImages(flattened);
                console.log("Flattened images:", flattened);

                // Choose main image: prefer first blob id -> /api/images/image/{id} else fallback to /api/images/post/{id}/first
                if (flattened.length > 0 && flattened[0].id) {
                    setMainImage(`http://localhost:8080/api/images/image/${flattened[0].id}`);
                } else {
                    // fallback
                    setMainImage(`http://localhost:8080/api/images/post/${id}/first`);
                }

            } catch (err) {
                console.error("Error loading post:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) loadPost();
    }, [id]);

    // fallback: if images exist but you still use previous loadImages method, you can keep it,
    // but above we rely on dto.images.

    const handlePopup = (content) => {
        setPopupContent(content);
        setPopupVisible(true);
    };
    const closePopup = () => setPopupVisible(false);

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const getContactInfo = () => {
        if (!postData) return {};
        return {
            name: postData.contactName || postData.user?.firstName || 'Seller',
            phone: postData.contactPhone || postData.user?.phoneNumber || 'Not provided',
            whatsapp: postData.contactWhatsapp || postData.user?.phoneNumber || 'Not provided'
        };
    };

    const contactInfo = getContactInfo();

    if (loading) return <div><Navibar /><div className="loading">Loading...</div><Footer /></div>;
    if (!postData) return <div><Navibar /><div className="error">Post not found</div><Footer /></div>;

    // Helper to render object entries with keys
    const renderEntries = (obj, prefix = "") => {
        if (!obj) return null;
        return Object.entries(obj).map(([k, v]) => {
            if (v === null || v === undefined || v === "") return null;
            // humanize key
            const label = k.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
            return <li key={`${prefix}${k}`}>{label}: {String(v)}</li>;
        });
    };


    const categoryHeaderImages = {
        VEHICLE: vehicle,
        REAL_ESTATE: estate,
        PHONE: phone,
        ELECTRONIC: elecronic,
    };

    const headerImage =
        categoryHeaderImages[postData.categoryType] || aboutus;



    return (
        <div>
            <Navibar />
            <div className="one_view_page">
                <div className="header-image2">
                    <img src={headerImage} alt="Header Image" />
                    <h1>{postData.categoryType?.replace(/_/g, ' ')}</h1>
                </div>

                <div className="add_onebyone_view">
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

                            <a href="#" onClick={(e) => { e.preventDefault(); handlePopup("Saved!"); }}>
                                <div className="save_part">
                                    <i><MdOutlineStar size={30} /></i>
                                    <h4>Save</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <section className="top-section">
                        <div className="image-gallery">
                            <div className="main-image">
                                <img
                                    src={mainImage || aboutus}
                                    alt="Main Image"
                                    onError={(e) => (e.target.src = aboutus)}
                                />
                            </div>

                            <div className="thumbs-container">
                                <div className="thumbs">
                                    {allImages.length > 0 ? (
                                        allImages.map(img => (
                                            <div key={img.id || img.fileName || Math.random()} className="thumb">
                                                <img
                                                    src={img.id ? `http://localhost:8080/api/images/image/${img.id}` : aboutus}
                                                    alt="thumb"
                                                    onClick={() => {
                                                        if (img.id) setMainImage(`http://localhost:8080/api/images/image/${img.id}`);
                                                    }}
                                                    onError={(e) => (e.target.src = aboutus)}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        // If no flattened blobs, still show first-by-post fallback thumb
                                        <div className="thumb">
                                            <img src={`http://localhost:8080/api/images/post/${postData.id}/first`} alt="thumb" onError={(e) => (e.target.src = aboutus)} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="seller-info">
                            <div className="seller_name" onClick={() => handlePopup(`Seller: ${contactInfo.name}`)}>
                                <IoIosMan size={35} color='#000' /><h5>Seller Name</h5>
                            </div>

                            <div className="seller_number" onClick={() => handlePopup(`Phone: ${contactInfo.phone}`)}>
                                <FaPhoneAlt size={30} color='#1100ff' /><h5>Phone Number</h5>
                            </div>

                            <div className="seller_whatsapp" onClick={() => handlePopup(`WhatsApp: ${contactInfo.whatsapp}`)}>
                                <BsWhatsapp size={30} color='#00f700' /><h5>WhatsApp</h5>
                            </div>

                            <div className="seller_chat" onClick={() => handlePopup(`Chat with ${contactInfo.name}`)}>
                                <IoMdChatboxes size={30} color='#ff0000' /><h5>Chat</h5>
                            </div>
                        </div>
                    </section>

                    <section className="bottom-section">
                        <div className="price-details">
                            <h2>Price: {postData.price ? `Rs. ${postData.price.toLocaleString()}` : 'Not specified'}</h2>
                            <h3>Property Details:</h3>
                            <div className="details-box">
                                <ul>
                                    {/* Common fields */}
                                    {postData.condition && <li key="condition">Condition : {postData.condition}</li>}
                                    {postData.location && <li key="location">Location : {postData.location}</li>}

                                    {/* Category-specific details (use categoryData) */}
                                    {postData.categoryType === 'VEHICLE' && categoryData.vehicle && (
                                        <>
                                            {categoryData.vehicle.type && (<li key="re-type">Type : {categoryData.vehicle.type}</li>)}
                                            {categoryData.vehicle.make && (<li key="re-type">Brand : {categoryData.vehicle.make}</li>)}
                                            {categoryData.vehicle.model && (<li key="re-type">Model : {categoryData.vehicle.model}</li>)}
                                            {categoryData.vehicle.trim && (<li key="re-type">Trim / Edition : {categoryData.vehicle.trim}</li>)}
                                            {categoryData.vehicle.mileage && (<li key="re-type">Mileage : {categoryData.vehicle.mileage} km</li>)}
                                            {categoryData.vehicle.fuelType && (<li key="re-type">Fuel Type : {categoryData.vehicle.fuelType}</li>)}
                                            {categoryData.vehicle.engineCapacity && (<li key="re-type">Engine Capacity : {categoryData.vehicle.engineCapacity} cc</li>)}
                                            {categoryData.vehicle.transmission && (<li key="re-type">Transmission : {categoryData.vehicle.transmission}</li>)}
                                        </>
                                    )}

                                    {postData.categoryType === 'REAL_ESTATE' && categoryData.realEstate && (
                                        <>
                                            {categoryData.realEstate.type &&(<li key="re-type">Type : {categoryData.realEstate.type}</li>)}
                                            {categoryData.realEstate.lotSize &&(<li key="re-type">Lot Size : {categoryData.realEstate.bedrooms}</li>)}
                                            {categoryData.realEstate.bedrooms &&(<li key="re-type">Bedrooms : {categoryData.realEstate.bedrooms}</li>)}
                                            {categoryData.realEstate.bathrooms &&(<li key="re-type">Bathrooms : {categoryData.realEstate.bathrooms}</li>)}
                                            {categoryData.realEstate.address &&(<li key="re-type">Address : {categoryData.realEstate.address}</li>)}
                                        </>
                                    )}
                                    
                                    {postData.categoryType === 'PHONE' && categoryData.phone && (
                                        <>
                                            {categoryData.phone.type &&(<li key="re-type">Type : {categoryData.phone.type}</li>)}
                                            {categoryData.phone.brand &&(<li key="re-type">Brand : {categoryData.phone.brand}</li>)}
                                            {categoryData.phone.model &&(<li key="re-type">Model : {categoryData.phone.model}</li>)}
                                            {categoryData.phone.memory &&(<li key="re-type">Memory : {categoryData.phone.memory} GB</li>)}
                                            {categoryData.phone.battery &&(<li key="re-type">Battery : {categoryData.phone.battery} mAh</li>)}
                                            {categoryData.phone.edition &&(<li key="re-type">Edition : {categoryData.phone.edition}</li>)}
                                            {categoryData.phone.cameraSize &&(<li key="re-type">Camera Size : {categoryData.phone.cameraSize} MP</li>)}
                                            {categoryData.phone.features &&(<li key="re-type">Features : {categoryData.phone.features}</li>)}
                                            {categoryData.phone.itemType &&(<li key="re-type">Item Type : {categoryData.phone.itemType}</li>)}
                                        </>
                                    )}

                                    {postData.categoryType === 'ELECTRONIC' && categoryData.electronic && (
                                        <>
                                            {categoryData.electronic.type &&(<li key="re-type">Type : {categoryData.electronic.type}</li>)}
                                            {categoryData.electronic.brand &&(<li key="re-type">Brand : {categoryData.electronic.brand}</li>)}
                                            {categoryData.electronic.model &&(<li key="re-type">Model : {categoryData.electronic.model}</li>)}
                                            {categoryData.electronic.screenSize &&(<li key="re-type">Screen Size : {categoryData.electronic.screenSize}</li>)}
                                            {categoryData.electronic.deviceType &&(<li key="re-type">Device Type : {categoryData.electronic.deviceType}</li>)}
                                        </>
                                    )}
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
    );
}
