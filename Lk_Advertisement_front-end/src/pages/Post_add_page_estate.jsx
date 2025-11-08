import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import { useAuth } from '../context/AuthContext'
import '../css/post_add_2.css'
import aboutus from '../image/aboutus.jpg'

export default function Post_add_page_estate() {

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const subCategory = location.state?.subCategory || "Real Estate";

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    categoryType: "REAL_ESTATE",
    subCategory: subCategory,
    contactName: currentUser?.firstName + " " + currentUser?.lastName,
    contactEmail: currentUser?.email,
    contactPhone: currentUser?.phoneNumber,
    contactWhatsapp: currentUser?.phoneNumber,

    // Estate fields
    estateType: subCategory,
    bedrooms: "",
    bathrooms: "",
    lotSize: "",
    lotUnit: "",
    address: "",
    location: "",
    imageUrl: ""
  });

  const [images, setImages] = useState([]);

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData(prev => ({
      ...prev,
      estateType: category,
      subCategory: category
    }));
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 8 - images.length);
    const urls = newImages.map(file => URL.createObjectURL(file));

    setImages([...images, ...urls]);

    if (newImages.length > 0) {
      setFormData(prev => ({
        ...prev,
        imageUrl: URL.createObjectURL(newImages[0])
      }));
    }
  };

  const handleRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const title =
        formData.title ||
        `${formData.estateType} for sale in ${formData.location}`;

      const postData = {
        // Base Post Data
        title: title,
        description: formData.description,
        price: parseFloat(formData.price),
        condition: formData.condition,
        categoryType: "REAL_ESTATE",
        subCategory: formData.subCategory,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactWhatsapp: formData.contactWhatsapp,

        // Real Estate Fields
        estateType: formData.estateType,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        lotSize: formData.lotSize,
        lotUnit: formData.lotUnit,
        address: formData.address,
        location: formData.location,
        imageUrl: formData.imageUrl
      };

      console.log("Submitting Estate Post:", postData);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        alert("Estate post created successfully!");
        navigate("/");
      } else {
        alert("Error creating post");
      }
    } catch (err) {
      console.error(err);
      alert("Network error!");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      condition: "",
      categoryType: "REAL_ESTATE",
      subCategory: subCategory,
      contactName: currentUser?.firstName + " " + currentUser?.lastName,
      contactEmail: currentUser?.email,
      contactPhone: currentUser?.phoneNumber,
      contactWhatsapp: currentUser?.phoneNumber,
      estateType: subCategory,
      bedrooms: "",
      bathrooms: "",
      lotSize: "",
      lotUnit: "",
      address: "",
      location: "",
      imageUrl: ""
    });
    setImages([]);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/post_add");
  };

  return (
    <div>
      <Navibar />

      <div className="post_page_2">
        <div className="header-image2">
          <img src={aboutus} alt="Header Image" />
          <h1>REAL ESTATE POST</h1>
        </div>

        <div className="welcome-box">
          <h2>Add Your Real Estate Listing</h2>
          <p>Welcome <span>{currentUser?.firstName}!</span></p>
        </div>

        <div className="form_details">
          <form onSubmit={handleSubmit} className="form1">
            <div className="signup">

              <h1>Fill in the <span>{subCategory}</span> Details</h1>

              {/* Estate Details */}
              <fieldset>
                <h3>Estate Information</h3>
                <div className="form_grid">
                  <div>

                    <label>Condition :</label>
                    <select 
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select --</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                    </select>

                    <label>Title :</label>
                    <input 
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />

                    <label>Estate Type :</label>
                    <select
                      name="estateType"
                      value={formData.estateType}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="House">House</option>
                      <option value="Land">Land</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                    </select>

                    <label>Lot Unit :</label>
                    <select
                      name="lotUnit"
                      value={formData.lotUnit}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select --</option>
                      <option value="Perch">Perch</option>
                      <option value="Acre">Acre</option>
                      <option value="Square Feet">Square Feet</option>
                      <option value="Square Meters">Square Meters</option>
                    </select>

                    <label>Lot Size :</label>
                    <input
                      type="number"
                      name="lotSize"
                      placeholder="Lot Size"
                      value={formData.lotSize}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Location :</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />

                    <label>Bedrooms :</label>
                    <input
                      type="number"
                      name="bedrooms"
                      placeholder="Bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                    />

                    <label>Bathrooms :</label>
                    <input
                      type="number"
                      name="bathrooms"
                      placeholder="Bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                    />

                    <label>Address :</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />

                    <label>Price (Rs) :</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ width: "100%" }}>
                    <label>Description :</label>
                    <textarea
                      name="description"
                      rows="6"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Image Upload */}
              <fieldset>
                <h3>Add Photos</h3>
                <div className="image-uploader">
                  <ul className="image-list">

                    {images.map((src, i) => (
                      <li key={i} className="image-item">
                        <div className="image-container">
                          <img src={src} width="92" height="92" />
                          <button type="button" onClick={() => handleRemove(i)}>✕</button>
                        </div>
                      </li>
                    ))}

                    {images.length < 8 && (
                      <li className="image-item">
                        <label htmlFor="estate_image_upload" className="add-photo">
                          <div className="add-photo-box">+</div>
                        </label>
                        <input
                          id="estate_image_upload"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          className="hidden-input"
                          onChange={handleImageUpload}
                        />
                      </li>
                    )}

                  </ul>
                </div>
              </fieldset>

              {/* Contact Details */}
              <fieldset>
                <h3>Contact Information</h3>

                <label>Seller Name :</label>
                <p className="contact-value">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>

                <label>Email :</label>
                <p className="contact-value">{currentUser?.email}</p>

                <label>Phone Number :</label>
                <input 
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                />

                <label>WhatsApp :</label>
                <input 
                  type="tel"
                  name="contactWhatsapp"
                  value={formData.contactWhatsapp}
                  onChange={handleInputChange}
                />
              </fieldset>

              {/* Buttons */}
              <div className="but">
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit">Create Post</button>
              </div>

            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
