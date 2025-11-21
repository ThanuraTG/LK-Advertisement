import { useEffect, useState } from 'react';
import { FaArrowRight, FaCar, FaHome, FaMobileAlt, FaTv } from "react-icons/fa";
import Footer from '../componet/Footer';
import Navibar from '../componet/Navibar';
import '../css/home.css';
import aboutus from '../image/aboutus.jpg'
import home1 from '../image/home1.jpg';
import home2 from '../image/home2.jpg';
import home3 from '../image/home3.jpg';
import home4 from '../image/home4.jpg';
import home5 from '../image/home5.jpg';
import home6 from '../image/home6.jpg';

export default function Home_Page() {
  const [realEstateAds, setRealEstateAds] = useState([]);
  const [vehicleAds, setVehicleAds] = useState([]);
  const [phoneAds, setPhoneAds] = useState([]);
  const [electronicAds, setElectronicAds] = useState([]);
  const [categoryStats, setCategoryStats] = useState({
    vehicles: 0,
    realEstate: 0,
    electronics: 0,
    mobiles: 0
  });
  const [loading, setLoading] = useState({
    realEstate: true,
    vehicles: true,
    phones: true,
    electronics: true,
    stats: true
  });

  // Fetch category statistics
  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const [vehiclesRes, realEstateRes, electronicsRes, mobilesRes] = await Promise.all([
          fetch('http://localhost:8080/api/posts/category/VEHICLE'),
          fetch('http://localhost:8080/api/posts/category/REAL_ESTATE'),
          fetch('http://localhost:8080/api/posts/category/ELECTRONIC'),
          fetch('http://localhost:8080/api/posts/category/PHONE')
        ]);

        const vehicles = vehiclesRes.ok ? await vehiclesRes.json() : [];
        const realEstate = realEstateRes.ok ? await realEstateRes.json() : [];
        const electronics = electronicsRes.ok ? await electronicsRes.json() : [];
        const mobiles = mobilesRes.ok ? await mobilesRes.json() : [];

        setCategoryStats({
          vehicles: vehicles.length,
          realEstate: realEstate.length,
          electronics: electronics.length,
          mobiles: mobiles.length
        });
      } catch (error) {
        console.error('Error fetching category stats:', error);
      } finally {
        setLoading(prev => ({ ...prev, stats: false }));
      }
    };

    fetchCategoryStats();
  }, []);

  const categories = [
    { 
      icon: <FaCar size={40} color="#ff0000ff" />, 
      name: "VEHICLES", 
      ads: `${categoryStats.vehicles.toLocaleString()} ads`,
      href: "/all_category?category=Vehicles"
    },
    { 
      icon: <FaHome size={40} color="#0091ffff" />, 
      name: "REAL ESTATE", 
      ads: `${categoryStats.realEstate.toLocaleString()} ads`,
      href: "/all_category?category=Real Estate"
    },
    { 
      icon: <FaMobileAlt size={40} color="#f13787ff" />, 
      name: "MOBILES", 
      ads: `${categoryStats.mobiles.toLocaleString()} ads`,
      href: "/all_category?category=Mobils Phone"
    },
    { 
      icon: <FaTv size={40} color="#04ff00ff" />, 
      name: "ELECTRONICS", 
      ads: `${categoryStats.electronics.toLocaleString()} ads`,
      href: "/all_category?category=Electronics"
    },
  ];

  // Fetch real estate ads
  useEffect(() => {
    const fetchRealEstateAds = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts/category/REAL_ESTATE');
        if (response.ok) {
          const data = await response.json();
          setRealEstateAds(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching real estate ads:', error);
      } finally {
        setLoading(prev => ({ ...prev, realEstate: false }));
      }
    };

    fetchRealEstateAds();
  }, []);

  // Fetch brand new vehicle ads
  useEffect(() => {
    const fetchVehicleAds = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts/category/VEHICLE/filter?condition=Brand New');
        if (response.ok) {
          const data = await response.json();
          setVehicleAds(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching vehicle ads:', error);
      } finally {
        setLoading(prev => ({ ...prev, vehicles: false }));
      }
    };

    fetchVehicleAds();
  }, []);

  // Fetch phone ads
  useEffect(() => {
    const fetchPhoneAds = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts/category/PHONE');
        if (response.ok) {
          const data = await response.json();
          setPhoneAds(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching phone ads:', error);
      } finally {
        setLoading(prev => ({ ...prev, phones: false }));
      }
    };

    fetchPhoneAds();
  }, []);

  // Fetch electronic ads
  useEffect(() => {
    const fetchElectronicAds = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts/category/ELECTRONIC');
        if (response.ok) {
          const data = await response.json();
          setElectronicAds(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching electronic ads:', error);
      } finally {
        setLoading(prev => ({ ...prev, electronics: false }));
      }
    };

    fetchElectronicAds();
  }, []);

  // ⭐ BACKEND FIRST-IMAGE LOADER
  const getPostImage = (postId) => {
    return `http://localhost:8080/api/images/post/${postId}/first` || {aboutus};
  };

  // ⭐ UPDATED renderAdBoxes()
  const renderAdBoxes = (ads, isLoading, category) => {
    if (isLoading) {
      return Array(5).fill(0).map((_, index) => (
        <div key={index} className="ad-box-wrapper">
          <div className="ad-box loading">
            <div className="loading-skeleton"></div>
          </div>
        </div>
      ));
    }

    const boxesToRender = [];

    ads.forEach((ad, index) => {
      boxesToRender.push(
        <div key={ad.id || index} className="ad-box-wrapper">
          <a href={`/one_category_page/${ad.id}`}>
            <div className="ad-box">
              
              <div className="imgdiv">
                <img
                  src={getPostImage(ad.id)}
                  alt={ad.title}
                  onError={(e) => {
                    e.target.src = "no-image.png";
                  }}
                />
              </div>

              <div className="ad-info">
                <h4>{ad.title || "No Title"}</h4>
                <p>{ad.price ? `Rs. ${ad.price.toLocaleString()}` : "Price not set"}</p>
              </div>

            </div>
          </a>
        </div>
      );
    });

    const remainingBoxes = 5 - ads.length;
    for (let i = 0; i < remainingBoxes; i++) {
      boxesToRender.push(
        <div key={`placeholder-${i}`} className="ad-box-wrapper">
          <div className="ad-box placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">📱</div>
              <p>No {category} Available</p>
              <span>Be the first to post!</span>
            </div>
          </div>
        </div>
      );
    }

    return boxesToRender;
  };

  return (
    <div>
      <Navibar />
      
      <div className="main_page">
        <div className="banner">
          <h1>LK ADVERTISEMENT</h1>
          <div className="gallery">
            <div className="image"><img src={home1} alt="" /></div>
            <div className="image"><img src={home2} alt="" /></div>
            <div className="image"><img src={home3} alt="" /></div>
            <div className="image"><img src={home4} alt="" /></div>
            <div className="image"><img src={home5} alt="" /></div>
            <div className="image"><img src={home6} alt="" /></div>
          </div>
        </div>

        {/* Updated Category Section */}
        <section className="category">
          <h2>ALL CATEGORY</h2>
          <div className="category-buttons">
            {categories.map((category, index) => (
              <a key={index} href={category.href}>
                <div className="onebyone_cate">
                  {category.icon} <br />
                  {category.name} <br />
                  {!loading.stats ? category.ads : 'Loading...'}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* HOT REAL ESTATE Section */}
        <section className="ads">
          <h2>HOT REAL ESTATE</h2>
          <div className="ad-grid">
            {renderAdBoxes(realEstateAds, loading.realEstate, "Real Estate")}
            <a href="/all_category?category=Real Estate">
              <div className="ad-box-icon">
                <FaArrowRight size={40} color='black' />
                <p>View All</p>
              </div>
            </a>
          </div>
        </section>

        {/* BRAND NEW VEHICLES Section */}
        <section className="ads">
          <h2>BRAND NEW VEHICLES</h2>
          <div className="ad-grid">
            {renderAdBoxes(vehicleAds, loading.vehicles, "Vehicles")}
            <a href="/all_category?category=Vehicles&condition=Brand New">
              <div className="ad-box-icon">
                <FaArrowRight size={40} color='black' />
                <p>View All</p>
              </div>
            </a>
          </div>
        </section>

        {/* NEW PHONE Section */}
        <section className="ads">
          <h2>NEW PHONE</h2>
          <div className="ad-grid">
            {renderAdBoxes(phoneAds, loading.phones, "Phones")}
            <a href="/all_category?category=Mobils Phone">
              <div className="ad-box-icon">
                <FaArrowRight size={40} color='black' />
                <p>View All</p>
              </div>
            </a>
          </div>
        </section>

        {/* ELECTRONICS Section */}
        <section className="ads">
          <h2>ELECTRONICS</h2>
          <div className="ad-grid">
            {renderAdBoxes(electronicAds, loading.electronics, "Electronics")}
            <a href="/all_category?category=Electronics">
              <div className="ad-box-icon">
                <FaArrowRight size={40} color='black' />
                <p>View All</p>
              </div>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
