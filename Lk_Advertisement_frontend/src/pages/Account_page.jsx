import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../componet/Footer';
import Navibar from '../componet/Navibar';
import { useAuth } from '../context/AuthContext';
import '../css/account.css';

export default function Account_page() {
    const [selectedItem, setSelectedItem] = useState('My Ads');
    const [details, setDetails] = useState('Here you can view, edit, or delete your ads.');
    const [userPosts, setUserPosts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedItem === 'My Ads' && currentUser) {
            fetchUserPosts();
        } else if (selectedItem === 'Favorites' && currentUser) {
            fetchFavorites();
        }
    }, [selectedItem, currentUser]);

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/posts/user/${currentUser.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserPosts(data);
                console.log('error :', data)
            }
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/favorites/user/${currentUser.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFavorites(data);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const handleLogout = () => {
        logout();
        alert('Logged out successfully!');
        navigate('/');
    };

    const listData = {
        "My Ads": "Here you can view, edit, or delete your ads.",
        "Favorites": "Your saved favorite items will appear here.",
        "My Membership": "Check your membership status, renewals, or upgrades.",
        "Saved Searches": "Your saved searches appear here for quick access.",
        "Phone Number": "You can update or verify your phone number here.",
        "Settings": "Manage your profile, privacy, and notification preferences."
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setDetails(listData[item]);
    };

    const renderContent = () => {
        switch (selectedItem) {
            case 'My Ads':
                return (
                    <div>
                        <h4>My Ads ({userPosts.length})</h4>
                        {userPosts.length === 0 ? (
                            <p>You haven't posted any ads yet.</p>
                        ) : (
                            <div className="posts-list">
                                {userPosts.map(post => (
                                    <div key={post.id} className="post-item">
                                        <div className="img-div">
                                            <img src={post.imageUrl} alt="" />
                                        </div>
                                        <div className="detail-div">
                                            <h4>{post.title}</h4>
                                            <p>Price : Rs. {post.price?.toLocaleString()}</p>
                                            <p>Location : {post.location}</p>
                                            <p>Category : {post.categoryType}</p>
                                            <a href={`/one_category_page/${post.id}`}>View Post</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'Favorites':
                return (
                    <div>
                        <h4>Favorites ({favorites.length})</h4>
                        {favorites.length === 0 ? (
                            <p>You haven't saved any favorites yet.</p>
                        ) : (
                            <div className="favorites-list">
                                {favorites.map(fav => (
                                    <div key={fav.id} className="favorite-item">
                                        <h5>{fav.post?.title}</h5>
                                        <p>Price: Rs. {fav.post?.price?.toLocaleString()}</p>
                                        <a href={`/one_category_page/${fav.post?.id}`}>View Post</a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            default:
                return <p>{details}</p>;
        }
    };

    return (
        <div>
            <Navibar />

            <div className="region_main_box">
                <div className="row_1">
                    <div className="userpicture">
                        <img
                            src={currentUser?.profileImage || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"}
                            alt="User"
                        />
                    </div>

                    <div className="username">
                        <h3><span style={{'text-transform': 'capitalize'}}>{currentUser?.firstName  || "User"} {currentUser?.lastName  || "User"}</span></h3>
                    </div>

                    <a href="/edit_profile" className="btn btn-sm btn-primary btn-block my-2">Edit profile</a>

                    <div className="userinfo">
                        <h7>Personal Information</h7>
                        <ul>
                            <li>
                                <dl>
                                    <dt>Email Address:</dt>
                                    <dd>
                                        <a href={`mailto:${currentUser?.email}`} style={{"textTransform":"lowercase"}}>
                                            {currentUser?.email}
                                        </a>
                                    </dd>
                                </dl>
                            </li>

                            <li>
                                <dl>
                                    <dt>Country:</dt>
                                    <dd>Sri Lanka</dd>
                                </dl>
                            </li>

                            <li>
                                <dl>
                                    <dt>City / Town:</dt>
                                    <dd>{currentUser?.city || "Not set"}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>

                    <div className="userlogout">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <div className="row_2">
                    <div className="row_2_head">
                        <h2>Account</h2>
                    </div>

                    <div className="row_2_footer">
                        {/* LEFT SIDE */}
                        <section id="region_left" aria-label="Content">
                            <h3 className="lead">Main Details</h3>
                            <ul>
                                {Object.keys(listData).map((item, index) => (
                                    <li 
                                        key={index} 
                                        onClick={() => handleItemClick(item)}
                                        className={selectedItem === item ? 'active' : ''}
                                        readOnly
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* RIGHT SIDE */}
                        <section id="region_right" aria-label="Content">
                            <h3>{selectedItem}</h3>
                            {renderContent()}
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}