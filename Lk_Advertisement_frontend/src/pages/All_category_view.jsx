import { useEffect, useState } from 'react';
import { MdLocationPin } from "react-icons/md";
import { useSearchParams } from 'react-router-dom';
import Footer from '../componet/Footer';
import Navibar from '../componet/Navibar';
import '../css/all_category_view.css';
import aboutus from '../image/aboutus.jpg';
import thanu from '../image/thanu.png';
import { postsAPI } from '../services/api';
import ads from '../image/ads.jpg';

export default function All_category_view() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || "";
    const queryCategory = searchParams.get('category') || "All";

    const [selectedCategory, setSelectedCategory] = useState(queryCategory);
    const [selectedType, setSelectedType] = useState("All");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageCache, setImageCache] = useState({});

    const categories = ["All", "Vehicles", "Real Estate", "Mobils Phone", "Electronics"];
    const categoryMapping = {
        "All": "ALL",
        "Vehicles": "VEHICLE",
        "Real Estate": "REAL_ESTATE", 
        "Mobils Phone": "PHONE",
        "Electronics": "ELECTRONIC"
    };

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory, selectedType, keyword]);

    // Function to fetch and cache first image for each post
    const fetchFirstImage = async (postId) => {
        try {
            // Check if image is already in cache
            if (imageCache[postId]) {
                return imageCache[postId];
            }

            // Fetch first image from backend
            const response = await postsAPI.getFirstImage(postId);
            if (response.status === 200) {
                const imageUrl = URL.createObjectURL(response.data);
                
                // Update cache
                setImageCache(prev => ({
                    ...prev,
                    [postId]: imageUrl
                }));
                
                return imageUrl;
            }
        } catch (error) {
            console.error(`Error fetching image for post ${postId}:`, error);
        }
        
        return aboutus; // Return default image if fetch fails
    };

    // Function to get post image with caching
    const getPostImage = async (post) => {
        // First, try to get from cache
        if (imageCache[post.id]) {
            return imageCache[post.id];
        }

        // If not in cache, try to fetch first image
        const firstImageUrl = await fetchFirstImage(post.id);
        if (firstImageUrl !== aboutus) {
            return firstImageUrl;
        }

        // Fallback to existing image logic
        if (post.imageUrl) return post.imageUrl;

        switch (post.categoryType) {
            case 'VEHICLE':
                return post.vehiclePost?.imageUrl || thanu;

            case 'REAL_ESTATE':
                return post.realEstatePost?.imageUrl || aboutus;

            case 'PHONE':
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

            case 'ELECTRONIC':
                return post.electronicPost?.imageUrl || thanu;

            default:
                return aboutus;
        }
    };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            let url = 'http://localhost:8080/api/posts';

            if (keyword) {
                url = `http://localhost:8080/api/posts/search?keyword=${encodeURIComponent(keyword)}`;
            } else if (selectedCategory !== "All") {
                const backendCategory = categoryMapping[selectedCategory];
                url = selectedType !== "All"
                    ? `http://localhost:8080/api/posts/category/${backendCategory}/filter?condition=${selectedType}`
                    : `http://localhost:8080/api/posts/category/${backendCategory}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            
            const ordered = data.slice().reverse();
            setPosts(ordered);
            
            // Set posts first, then load images
            setPosts(ordered);
            console.log("date :", data)
            
            // Pre-load images for all posts
            ordered.forEach(async (post) => {
                await getPostImage(post);
            });
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedType("All");
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const getPostLocation = (post) => {
        if (post.user?.city) return post.user.city;
        if (post.realEstatePost?.address) return post.realEstatePost.address;
        return "Location not specified";
    };

    const getPostDetails = (post) => {
        if (!post || !post.categoryType) return "Details not available";

        switch (post.categoryType.toLowerCase()) {

            case "vehicle":
                return `${post.vehiclePost?.mileage ?? "N/A"} km | ${post.vehiclePost?.fuelType ?? "N/A"}`;

            case "real_estate":
                return `${post.realEstatePost?.bedrooms ?? "N/A"} bed | ${post.realEstatePost?.bathrooms ?? "N/A"} bath`;

            case "phone":
                return `${post.phonePost?.memory ?? "N/A"} | ${post.phonePost?.brand ?? "N/A"}`;

            case "electronic":
                return `${post.electronicPost?.brand ?? "N/A"} | ${post.electronicPost?.model ?? "N/A"}`;

            default:
                return post.condition || "Details not available";
        }
    };


    const breadcrumb = keyword
        ? `Home › All › Search results for "${keyword}"`
        : selectedType === "All"
            ? `Home › ${selectedCategory} › Ads`
            : `Home › ${selectedCategory} › Ads › ${selectedType}`;

    if (loading) return <div><Navibar /><div className="loading">Loading posts...</div><Footer /></div>;
    if (error) return <div><Navibar /><div className="error">Error: {error}</div><Footer /></div>;

    return (
        <div>
            <Navibar />
            <div className="all_view-add">
                <div className="header-image2">
                    <img src={ads} alt="Header Image" />
                    <h1>ALL CATEGORY ADS</h1>
                </div>

                <div className="add_view_page">
                    <div className="left_side_details">
                        <a href="#">
                            <div className="location_1">
                                <MdLocationPin size={30} color='#222'/>
                                <h3>Location</h3>
                            </div>
                        </a>

                        <div className="type_1">
                            <h3>Type</h3>
                            <select value={selectedType} onChange={handleTypeChange}>
                                <option value="All">All</option>
                                <option value="Brand New">Brand New</option>
                                <option value="Second Hand">Second Hand</option>
                            </select>
                        </div>

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

                    <div className="right_side_details">
                        <div className="url_link">
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
                                    console.log("POST DATA:", post),
                                    <a key={post.id} href={`/one_category_page/${post.id}`}>
                                        <div className="add_card">
                                            <div className="img_card">
                                                <img 
                                                    src={imageCache[post.id] || aboutus} 
                                                    alt={post.title} 
                                                    onError={(e) => { 
                                                        e.target.src = aboutus; 
                                                    }}
                                                    onLoad={() => {
                                                        // Image loaded successfully
                                                        if (!imageCache[post.id]) {
                                                            // If not in cache, try to fetch
                                                            fetchFirstImage(post.id);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="main_det">
                                                <h3>{post.title}</h3>
                                                <p>{post.location}</p>
                                                <p>{post.category}</p>
                                                <p>{getPostDetails(post)}</p>
                                                <p className="post-condition">{post.condition}</p>
                                                <h3>Rs. {post.price?.toLocaleString()}</h3>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}