import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../componet/Footer';
import Navibar from '../componet/Navibar';
import { useAuth } from '../context/AuthContext';
import '../css/post_add_1.css';
import aboutus from '../image/aboutus.jpg';
import post from "../image/post.jpg";


export default function Post_add_page_1() {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const subCategories = {
        Vehicles: ['Cars', 'Motorbikes', 'Three-Wheeler', 'Van', 'Bus', 'Lorries & Trucks'],
        'Real Estate': ['House', 'Land', 'Land with House', 'Apartment', 'Commercial', 'Villa'],
        Electronic: ['TV', 'Laptop', 'Camera', 'Speaker', 'Home Appliances', 'other'],
        'Mobile Phone': ['Samsung', 'iPhone', 'Huawei', 'Xiaomi', 'Oppo', 'Google Pixel', 'other']
    };

    const categoryRoutes = {
        'Vehicles': '/Post_add_vehicle',
        'Real Estate': '/Post_add_estate', 
        'Mobile Phone': '/Post_add_phone',
        'Electronic': '/Post_add_elecronic'
    };

    const openDialog = (category) => {
        setSelectedCategory(category);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    const handleSubCategoryClick = (sub) => {
        const route = categoryRoutes[selectedCategory];
        if (route) {
            navigate(route, { 
                state: { 
                    category: selectedCategory,
                    subCategory: sub 
                }
            });
        }
        closeDialog();
    };
    
    return (
        <div>
            <Navibar />
            
            <div className="post_page_1">
                <div className="header-image2">
                    <img src={post} alt="Header Image" />
                    <h1>YOUR POST</h1>
                </div>
                <div className="welcome-box">
                    <h2>Contact us and Add a Post</h2>
                    <p>Welcome <span> {currentUser?.firstName} </span>! Let's Post On Ads</p>
                </div>

                <section className="categories2">
                    <h2>Choose Sell Categories</h2>
                    <div className="category-buttons2">
                        <p className='a1'>
                            <button onClick={() => openDialog('Vehicles')}>Vehicles</button>
                        </p>
                        <p className='a2'>
                            <button onClick={() => openDialog('Real Estate')}>Real Estate</button>
                        </p>
                        <p className='a3'>
                            <button onClick={() => openDialog('Mobile Phone')}>Mobile Phone</button>
                        </p>
                        <p className='a4'>
                            <button onClick={() => openDialog('Electronic')}>Electronic</button>
                        </p>
                    </div>
                </section>

                {showDialog && (
                <div className="dialog-overlay" onClick={closeDialog}>
                    <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedCategory} Types</h3>
                        <ul>
                            {subCategories[selectedCategory]?.map((item, index) => (
                            <li key={index} onClick={() => handleSubCategoryClick(item)}>
                                {item}
                            </li>
                            ))}
                        </ul>
                        <button className="close-btn" onClick={closeDialog}>Close</button>
                    </div>
                </div>
                )}
            </div>
            
            <Footer />
        </div>
    )
}