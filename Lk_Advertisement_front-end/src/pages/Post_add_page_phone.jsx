// Updated Post_add_page_phone component
// (React, cleaned, corrected fields, API-ready)
// NOTE: Adjust field names to match your backend model

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../componet/Footer";
import Navibar from "../componet/Navibar";
import { useAuth } from "../context/AuthContext";
import "../css/post_add_2.css";
import aboutus from "../image/aboutus.jpg";

export default function Post_add_page_phone() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const subCategory = location.state?.subCategory || "Mobile Phone";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    categoryType: "MOBILE_PHONE",
    subCategory: subCategory,

    contactName: currentUser?.firstName + " " + currentUser?.lastName,
    contactEmail: currentUser?.email,
    contactPhone: currentUser?.phoneNumber,
    contactWhatsapp: currentUser?.phoneNumber,

    brand: "",
    model: "",
    storage: "",
    ram: "",
    battery: "",
    camera: "",
    location: "",
    imageUrl: ""
  });

  const [images, setImages] = useState([]);

  const brandModels = {
    Apple: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14"],
    Samsung: ["A12", "A32", "S21", "S22"],
    Xiaomi: ["Note 10", "Note 11", "Mi 11"],
    Oppo: ["F17", "F19", "A57"],
    Vivo: ["Y20", "Y21", "V25"],
    Huawei: ["Nova 7i", "Nova 9", "P30 Pro"]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, brand: value, model: "" }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 8 - images.length);
    const urls = newImages.map((file) => URL.createObjectURL(file));

    setImages([...images, ...urls]);

    if (newImages.length > 0) {
      setFormData((prev) => ({ ...prev, imageUrl: urls[0] }));
    }
  };

  const handleRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const title = formData.title || `${formData.brand} ${formData.model}`;

      const postData = {
        title: title,
        description: formData.description,
        price: parseFloat(formData.price),
        condition: formData.condition,
        categoryType: "MOBILE_PHONE",
        subCategory: formData.subCategory,

        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactWhatsapp: formData.contactWhatsapp,

        brand: formData.brand,
        model: formData.model,
        storage: formData.storage,
        ram: formData.ram,
        battery: formData.battery,
        camera: formData.camera,
        location: formData.location,
        imageUrl: formData.imageUrl
      };

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
        alert("Phone post created successfully!");
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
      categoryType: "MOBILE_PHONE",
      subCategory: subCategory,
      contactName: currentUser?.firstName + " " + currentUser?.lastName,
      contactEmail: currentUser?.email,
      contactPhone: currentUser?.phoneNumber,
      contactWhatsapp: currentUser?.phoneNumber,
      brand: "",
      model: "",
      storage: "",
      ram: "",
      battery: "",
      camera: "",
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
          <h1>MOBILE PHONE POST</h1>
        </div>

        <div className="welcome-box">
          <h2>Add Your Mobile Phone Listing</h2>
          <p>Welcome <span>{currentUser?.firstName}!</span></p>
        </div>

        <div className="form_details">
          <form onSubmit={handleSubmit} className="form1">
            <div className="signup">

              <h1>Fill in the <span>{subCategory}</span> Details</h1>

              <fieldset>
                <h3>Phone Information</h3>
                <div className="form_grid">

                  <div>
                    <label>Condition :</label>
                    <select name="condition" value={formData.condition} onChange={handleInputChange} required>
                      <option value="">-- Select --</option>
                      <option value="Brand New">Brand New</option>
                      <option value="Used">Used</option>
                      <option value="Imported">Imported</option>
                      <option value="Refurbished">Refurbished</option>
                    </select>

                    <label>Brand :</label>
                    <select name="brand" value={formData.brand} onChange={handleBrandChange} required>
                      <option value="">-- Select Brand --</option>
                      {Object.keys(brandModels).map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>

                    <label>Model :</label>
                    <select name="model" value={formData.model} onChange={handleInputChange} required disabled={!formData.brand}>
                      <option value="">-- Select Model --</option>
                      {formData.brand && brandModels[formData.brand]?.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>

                    <label>Storage :</label>
                    <input type="text" name="storage" placeholder="e.g. 128GB" value={formData.storage} onChange={handleInputChange} />

                    <label>RAM :</label>
                    <input type="text" name="ram" placeholder="e.g. 8GB" value={formData.ram} onChange={handleInputChange} />
                  </div>

                  <div>
                    <label>Battery :</label>
                    <input type="text" name="battery" placeholder="e.g. 5000mAh" value={formData.battery} onChange={handleInputChange} />

                    <label>Camera :</label>
                    <input type="text" name="camera" placeholder="e.g. 64MP" value={formData.camera} onChange={handleInputChange} />

                    <label>Location :</label>
                    <input type="text" name="location" placeholder="Your City" value={formData.location} onChange={handleInputChange} />

                    <label>Price (Rs) :</label>
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                  </div>

                  <div style={{ width: "100%" }}>
                    <label>Description :</label>
                    <textarea name="description" rows="6" placeholder="Description" value={formData.description} onChange={handleInputChange} />
                  </div>

                </div>
              </fieldset>

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
                        <label htmlFor="phone_img_upload" className="add-photo">
                          <div className="add-photo-box">+</div>
                        </label>
                        <input id="phone_img_upload" type="file" multiple accept=".jpg,.jpeg,.png" className="hidden-input" onChange={handleImageUpload} />
                      </li>
                    )}
                  </ul>
                </div>
              </fieldset>

              <fieldset>
                <h3>Contact Information</h3>

                <label>Seller Name :</label>
                <p className="contact-value">{currentUser?.firstName} {currentUser?.lastName}</p>

                <label>Email :</label>
                <p className="contact-value">{currentUser?.email}</p>

                <label>Phone Number :</label>
                <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} />

                <label>WhatsApp :</label>
                <input type="tel" name="contactWhatsapp" value={formData.contactWhatsapp} onChange={handleInputChange} />
              </fieldset>

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
