import { useEffect, useState } from 'react';
import { FaArrowRight, FaCar, FaHome, FaMobileAlt, FaTv } from "react-icons/fa";
import Footer from '../componet/Footer';
import Navibar from '../componet/Navibar';
import '../css/home.css';

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
      href: "/all_category?category=VEHICLE"
    },
    { 
      icon: <FaHome size={40} color="#0091ffff" />, 
      name: "REAL ESTATE", 
      ads: `${categoryStats.realEstate.toLocaleString()} ads`,
      href: "/all_category?category=REAL_ESTATE"
    },
    { 
      icon: <FaTv size={40} color="#04ff00ff" />, 
      name: "ELECTRONICS", 
      ads: `${categoryStats.electronics.toLocaleString()} ads`,
      href: "/all_category?category=ELECTRONIC"
    },
    { 
      icon: <FaMobileAlt size={40} color="#f13787ff" />, 
      name: "MOBILES", 
      ads: `${categoryStats.mobiles.toLocaleString()} ads`,
      href: "/all_category?category=PHONE"
    },
  ];

  // Rest of your existing fetch functions remain the same...
  // Fetch real estate ads (HOT REAL ESTATE)
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

  // Helper functions remain the same...
  const getPostImage = (post) => {
    if (post.imageUrl) {
      return post.imageUrl;
    }
    
    switch (post.categoryType) {
      case 'VEHICLE':
        return post.vehiclePost?.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image';
      case 'REAL_ESTATE':
        return post.realEstatePost?.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image';
      case 'PHONE':
        const phoneImages = post.phonePost?.imageUrls;
        if (phoneImages) {
          try {
            const images = JSON.parse(phoneImages);
            return images[0] || 'https://via.placeholder.com/200x150?text=No+Image';
          } catch {
            return 'https://via.placeholder.com/200x150?text=No+Image';
          }
        }
        return 'https://via.placeholder.com/200x150?text=No+Image';
      case 'ELECTRONIC':
        return post.electronicPost?.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image';
      default:
        return 'https://via.placeholder.com/200x150?text=No+Image';
    }
  };

  const getPostTitle = (post) => {
    return post.title || 'No Title';
  };

  const getPostPrice = (post) => {
    return post.price ? `Rs. ${post.price.toLocaleString()}` : 'Price not set';
  };

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
              <img 
                src={getPostImage(ad)} 
                alt={getPostTitle(ad)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                }}
              />
              <div className="ad-info">
                <h4>{getPostTitle(ad)}</h4>
                <p>{getPostPrice(ad)}</p>
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
        <h1>LK ADVERTISEMENT</h1>
        <div className="banner">
          <div className="gallery">
            <div className="image"><img src={'https://media.istockphoto.com/id/825383494/photo/business-man-pushing-large-stone-up-to-hill-business-heavy-tasks-and-problems-concept.jpg?s=612x612&w=0&k=20&c=wtqvbQ6OIHitRVDPTtoT_1HKUAOgyqa7YzzTMXqGRaQ='} alt="" /></div>
            <div className="image"><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9EZNefY1fRsA4qVFTBviWyj-5KHY6U8LG0g&s'} alt="" /></div>
            <div className="image"><img src={'https://www.shutterstock.com/image-photo/anonymous-female-traveler-casual-sweater-600nw-2258700909.jpg'} alt="" /></div>
            <div className="image"><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s'} alt="" /></div>
            <div className="image"><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx9gAsoq7zjIbcd0EWU007JhMfl2_pfr2m0w&s'} alt="" /></div>
            <div className="image"><img src={'https://www.dropicts.com/wp-content/uploads/how-to-take-aesthetic-pictures-1024x683.jpg'} alt="" /></div>
          </div>
        </div>

        {/* Updated Category Section with Dynamic Ads Count */}
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
            <a href="/all_category?category=REAL_ESTATE">
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
            <a href="/all_category?category=VEHICLE&condition=Brand New">
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
            <a href="/all_category?category=PHONE">
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
            <a href="/api/posts/category/ELECTRONIC">
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