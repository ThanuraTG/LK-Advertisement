import React, { useState, useEffect } from 'react'
import '../css/all_category_view.css'
import Navibar from '../componet/Navibar'
import Footer from '../componet/Footer'
import aboutus from '../image/aboutus.jpg'
import thanu from '../image/thanu.png'
import { MdLocationPin } from "react-icons/md";

export default function All_category_view() {
    // state for selected category and type
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ["All", "Vehicles", "Real Estate", "Mobils Phone", "Electronics"];

    // Map frontend categories to backend category types
    const categoryMapping = {
        "All": "ALL",
        "Vehicles": "VEHICLE",
        "Real Estate": "REAL_ESTATE", 
        "Mobils Phone": "PHONE",
        "Electronics": "ELECTRONIC"
    };

    // Fetch posts from backend API
    useEffect(() => {
        fetchPosts();
    }, [selectedCategory, selectedType]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            let url = 'http://localhost:8080/api/posts';
            
            // Build URL based on selected filters
            if (selectedCategory !== "All") {
                const backendCategory = categoryMapping[selectedCategory];
                if (selectedType !== "All") {
                    url = `http://localhost:8080/api/posts/category/${backendCategory}/filter?condition=${selectedType}`;
                } else {
                    url = `http://localhost:8080/api/posts/category/${backendCategory}`;
                }
            }
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    // Get appropriate image URL based on post type
    const getPostImage = (post) => {
        if (post.imageUrl) {
            return post.imageUrl;
        }
        
        // Try to get image from specific post types
        switch (post.categoryType) {
            case 'VEHICLE':
                return post.vehiclePost?.imageUrl || thanu;
            case 'REAL_ESTATE':
                return post.realEstatePost?.imageUrl || aboutus;
            case 'PHONE':
                // For phone posts, you might need to parse the imageUrls JSON
                const phoneImages = post.phonePost?.imageUrls;
                if (phoneImages) {
                    try {
                        const images = JSON.parse(phoneImages);
                        return images[0] || aboutus;
                    } catch {
                        return aboutus;
                    }
                }
                return aboutus;
            default:
                return aboutus;
        }
    };

    // Get location/city from post
    const getPostLocation = (post) => {
        if (post.user?.city) {
            return post.user.city;
        }
        if (post.realEstatePost?.address) {
            return post.realEstatePost.address;
        }
        return "Location not specified";
    };

    // Get additional details based on post type
    const getPostDetails = (post) => {
        switch (post.categoryType) {
            case 'VEHICLE':
                return `${post.vehiclePost?.mileage || 'N/A'} km | ${post.vehiclePost?.fuelType || 'N/A'}`;
            case 'REAL_ESTATE':
                return `${post.realEstatePost?.bedrooms || 'N/A'} bed | ${post.realEstatePost?.bathrooms || 'N/A'} bath`;
            case 'PHONE':
                return `${post.phonePost?.memory || 'N/A'} | ${post.phonePost?.brand || 'N/A'}`;
            case 'ELECTRONIC':
                return `${post.electronicPost?.brand || 'N/A'} | ${post.electronicPost?.model || 'N/A'}`;
            default:
                return post.condition || 'Details not available';
        }
    };

    // Build breadcrumb text based on selected category and type
    const breadcrumb = selectedType === "All"
        ? `Home › ${selectedCategory} › Ads`
        : `Home › ${selectedCategory} › Ads › ${selectedType}`;

    if (loading) {
        return (
            <div>
                <Navibar />
                <div className="loading">Loading posts...</div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navibar />
                <div className="error">Error: {error}</div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            {/* navigation bar */}
            <Navibar />

            {/* main part */}
            <div className="all_view-add">
                <div className="header-image2">
                    <img src={aboutus} alt="Header Image" />
                    <h1>ALL CATEGORYS ADS</h1>
                </div>

                <div className="add_view_page">
                    <div className="left_side_details">
                        <a href="#">
                            <div className="location_1">
                                <MdLocationPin size={30} color='#222'/>
                                <h3>Location</h3>
                            </div>
                        </a>

                        {/* Type Selection */}
                        <div className="type_1">
                            <h3>Type</h3>
                            <select
                                name="course"
                                id="course"
                                value={selectedType}
                                onChange={handleTypeChange}
                            >
                                <option value="All">All</option>
                                <option value="Brand New">Brand New</option>
                                <option value="Second Hand">Second Hand</option>
                            </select>
                        </div>

                        {/* Category List */}
                        <div className="category-box">
                            <h3>Category list</h3>
                            <ul>
                                {categories.map((cat, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleCategoryClick(cat)}
                                        style={{
                                            cursor: 'pointer',
                                            fontWeight: cat === selectedCategory ? 'bold' : 'normal',
                                            color: cat === selectedCategory ? '#007bff' : '#000'
                                        }}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right side details */}
                    <div className="right_side_details">
                        <div className="url_link">
                            {/* Dynamic breadcrumb */}
                            <p className="breadcrumb">{breadcrumb}</p>
                            <p className="post-count">Showing {posts.length} posts</p>
                        </div>

                        <div className="card_line">
                            {posts.length === 0 ? (
                                <div className="no-posts">
                                    <p>No posts found for the selected filters.</p>
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <a key={post.id} href={`/one_category_page/${post.id}`}>
                                        <div className="add_card">
                                            <div className="img_card">
                                                <img 
                                                    src={getPostImage(post)} 
                                                    alt={post.title} 
                                                    onError={(e) => {
                                                        e.target.src = aboutus;
                                                    }}
                                                />
                                            </div>
                                            <div className="main_det">
                                                <h3>{post.title}</h3>
                                                <p>{getPostLocation(post)}</p>
                                                <p>{getPostDetails(post)}</p>
                                                <h3>Rs. {post.price?.toLocaleString()}</h3>
                                                <p className="post-condition">{post.condition}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    )
}









// import React, { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import '../css/all_category_view.css'
// import Navibar from '../componet/Navibar'
// import Footer from '../componet/Footer'
// import aboutus from '../image/aboutus.jpg'
// import thanu from '../image/thanu.png'
// import { MdLocationPin } from "react-icons/md";

// export default function All_category_view() {
//     const [searchParams] = useSearchParams();
//     const urlCategory = searchParams.get('category');
//     const urlCondition = searchParams.get('condition');
    
//     // state for selected category and type
//     const [selectedCategory, setSelectedCategory] = useState(urlCategory ? getFrontendCategory(urlCategory) : "All");
//     const [selectedType, setSelectedType] = useState(urlCondition || "All");
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const categories = ["All", "Vehicles", "Real Estate", "Mobils Phone", "Electronics"];

//     // Map frontend categories to backend category types
//     const categoryMapping = {
//         "All": "ALL",
//         "Vehicles": "VEHICLE",
//         "Real Estate": "REAL_ESTATE", 
//         "Mobils Phone": "PHONE",
//         "Electronics": "ELECTRONIC"
//     };

//     // Map backend categories to frontend
//     const backendToFrontendMapping = {
//         "VEHICLE": "Vehicles",
//         "REAL_ESTATE": "Real Estate",
//         "PHONE": "Mobils Phone", 
//         "ELECTRONIC": "Electronics"
//     };

//     function getFrontendCategory(backendCategory) {
//         return backendToFrontendMapping[backendCategory] || "All";
//     }

//     // Fetch posts from backend API
//     useEffect(() => {
//         fetchPosts();
//     }, [selectedCategory, selectedType]);

//     // Set initial category from URL
//     useEffect(() => {
//         if (urlCategory) {
//             setSelectedCategory(getFrontendCategory(urlCategory));
//         }
//         if (urlCondition) {
//             setSelectedType(urlCondition);
//         }
//     }, [urlCategory, urlCondition]);

//     const fetchPosts = async () => {
//         try {
//             setLoading(true);
//             let url = 'http://localhost:8080/api/posts';
            
//             // Build URL based on selected filters
//             if (selectedCategory !== "All") {
//                 const backendCategory = categoryMapping[selectedCategory];
//                 if (selectedType !== "All") {
//                     url = `http://localhost:8080/api/posts/category/${backendCategory}/filter?condition=${selectedType}`;
//                 } else {
//                     url = `http://localhost:8080/api/posts/category/${backendCategory}`;
//                 }
//             } else if (selectedType !== "All") {
//                 // If "All" category but specific condition
//                 url = `http://localhost:8080/api/posts`;
//             }
            
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch posts');
//             }
//             const data = await response.json();
            
//             // Filter by condition if "All" category and specific condition selected
//             let filteredData = data;
//             if (selectedCategory === "All" && selectedType !== "All") {
//                 filteredData = data.filter(post => post.condition === selectedType);
//             }
            
//             setPosts(filteredData);
//         } catch (err) {
//             setError(err.message);
//             console.error('Error fetching posts:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);
//         setSelectedType("All"); // Reset type when category changes
//     };

//     const handleTypeChange = (e) => {
//         setSelectedType(e.target.value);
//     };

//     // Get appropriate image URL based on post type
//     const getPostImage = (post) => {
//         if (post.imageUrl) {
//             return post.imageUrl;
//         }
        
//         // Try to get image from specific post types
//         switch (post.categoryType) {
//             case 'VEHICLE':
//                 return post.imageUrl || thanu;
//             case 'REAL_ESTATE':
//                 return post.imageUrl || aboutus;
//             case 'PHONE':
//                 // For phone posts, parse the imageUrls JSON
//                 if (post.imageUrls) {
//                     try {
//                         const images = JSON.parse(post.imageUrls);
//                         return images[0] || aboutus;
//                     } catch {
//                         return aboutus;
//                     }
//                 }
//                 return aboutus;
//             default:
//                 return aboutus;
//         }
//     };

//     // Get location/city from post
//     const getPostLocation = (post) => {
//         if (post.user?.city) {
//             return post.user.city;
//         }
//         if (post.contactAddress) {
//             return post.contactAddress;
//         }
//         return "Location not specified";
//     };

//     // Get additional details based on post type
//     const getPostDetails = (post) => {
//         switch (post.categoryType) {
//             case 'VEHICLE':
//                 return `${post.mileage || 'N/A'} km | ${post.fuelType || 'N/A'}`;
//             case 'REAL_ESTATE':
//                 return `${post.bedrooms || 'N/A'} bed | ${post.bathrooms || 'N/A'} bath`;
//             case 'PHONE':
//                 return `${post.memory || 'N/A'} | ${post.brand || 'N/A'}`;
//             case 'ELECTRONIC':
//                 return `${post.brand || 'N/A'} | ${post.model || 'N/A'}`;
//             default:
//                 return post.condition || 'Details not available';
//         }
//     };

//     // Build breadcrumb text based on selected category and type
//     const breadcrumb = selectedType === "All"
//         ? `Home › ${selectedCategory} › Ads`
//         : `Home › ${selectedCategory} › Ads › ${selectedType}`;

//     if (loading) {
//         return (
//             <div>
//                 <Navibar />
//                 <div className="loading">Loading posts...</div>
//                 <Footer />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div>
//                 <Navibar />
//                 <div className="error">Error: {error}</div>
//                 <Footer />
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* navigation bar */}
//             <Navibar />

//             {/* main part */}
//             <div className="all_view-add">
//                 <div className="header-image2">
//                     <img src={aboutus} alt="Header Image" />
//                     <h1>ALL CATEGORYS ADS</h1>
//                 </div>

//                 <div className="add_view_page">
//                     <div className="left_side_details">
//                         <a href="#">
//                             <div className="location_1">
//                                 <MdLocationPin size={30} color='#222'/>
//                                 <h3>Location</h3>
//                             </div>
//                         </a>

//                         {/* Type Selection */}
//                         <div className="type_1">
//                             <h3>Type</h3>
//                             <select
//                                 name="course"
//                                 id="course"
//                                 value={selectedType}
//                                 onChange={handleTypeChange}
//                             >
//                                 <option value="All">All</option>
//                                 <option value="Brand New">Brand New</option>
//                                 <option value="Second Hand">Second Hand</option>
//                                 <option value="Used">Used</option>
//                             </select>
//                         </div>

//                         {/* Category List */}
//                         <div className="category-box">
//                             <h3>Category list</h3>
//                             <ul>
//                                 {categories.map((cat, index) => (
//                                     <li
//                                         key={index}
//                                         onClick={() => handleCategoryClick(cat)}
//                                         className={cat === selectedCategory ? 'active-category' : ''}
//                                         style={{
//                                             cursor: 'pointer',
//                                             fontWeight: cat === selectedCategory ? 'bold' : 'normal',
//                                             color: cat === selectedCategory ? '#007bff' : '#000',
//                                             padding: '8px 12px',
//                                             borderRadius: '4px',
//                                             backgroundColor: cat === selectedCategory ? '#f0f8ff' : 'transparent'
//                                         }}
//                                     >
//                                         {cat}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Right side details */}
//                     <div className="right_side_details">
//                         <div className="url_link">
//                             {/* Dynamic breadcrumb */}
//                             <p className="breadcrumb">{breadcrumb}</p>
//                             <p className="post-count">Showing {posts.length} posts</p>
//                         </div>

//                         <div className="card_line">
//                             {posts.length === 0 ? (
//                                 <div className="no-posts">
//                                     <p>No posts found for the selected filters.</p>
//                                     <p>Try changing your filters or check back later.</p>
//                                 </div>
//                             ) : (
//                                 posts.map((post) => (
//                                     <a key={post.id} href={`/one_category_page/${post.id}`}>
//                                         <div className="add_card">
//                                             <div className="img_card">
//                                                 <img 
//                                                     src={getPostImage(post)} 
//                                                     alt={post.title} 
//                                                     onError={(e) => {
//                                                         e.target.src = aboutus;
//                                                     }}
//                                                 />
//                                             </div>
//                                             <div className="main_det">
//                                                 <h3>{post.title}</h3>
//                                                 <p className="location">{getPostLocation(post)}</p>
//                                                 <p className="details">{getPostDetails(post)}</p>
//                                                 <h3 className="price">Rs. {post.price?.toLocaleString()}</h3>
//                                                 <p className="post-condition">{post.condition}</p>
//                                                 <p className="post-date">
//                                                     {new Date(post.createdAt).toLocaleDateString()}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* footer */}
//             <Footer />
//         </div>
//     )
// }
