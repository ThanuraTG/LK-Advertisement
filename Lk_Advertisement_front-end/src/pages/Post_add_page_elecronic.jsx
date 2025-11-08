import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../componet/Footer";
import Navibar from "../componet/Navibar";
import { useAuth } from "../context/AuthContext";
import "../css/post_add_2.css";
import aboutus from "../image/aboutus.jpg";

export default function Post_add_page_elecronic() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // SubCategory passed from previous page
  const subCategory = location.state?.subCategory || "Electronic";

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    categoryType: "ELECTRONIC",
    subCategory: subCategory,

    contactName: currentUser?.firstName + " " + currentUser?.lastName,
    contactEmail: currentUser?.email,
    contactPhone: currentUser?.phoneNumber,
    contactWhatsapp: currentUser?.phoneNumber,

    // Electronic fields
    type: "",
    brand: "",
    model: "",
    deviceType: "",
    screenSize: "",
    location: "",
    imageUrl: "",
  });

  const [images, setImages] = useState([]);

  // Electronic Categories
  const data = {
    Phones: ["Samsung", "Apple", "Xiaomi", "Realme", "Huawei"],
    Laptops: ["Dell", "HP", "Lenovo", "Asus", "Acer"],
    TVs: ["Samsung", "LG", "Sony", "Panasonic"],
    Cameras: ["Canon", "Nikon", "Sony", "Fujifilm"],
  };

  const modelData = {
    Samsung: ["S23", "A54", "Note 20", "M14"],
    Apple: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14"],
    Xiaomi: ["Note 13", "Note 12", "Mi 11"],
    Dell: ["Inspiron", "Vostro", "Latitude"],
    HP: ["Pavilion", "Elitebook", "Victus"],
    Canon: ["EOS 1500D", "EOS R", "EOS M50"],
    Nikon: ["D3500", "Z50", "Z6"],
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Category changes
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: category,
      brand: "",
      model: "",
    }));
  };

  // Brand changes
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setFormData((prev) => ({
      ...prev,
      brand,
      model: "",
      subCategory: brand,
    }));
  };

  // Model changes
  const handleModelChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      model: e.target.value,
    }));
  };

  // Image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 8 - images.length);
    const urls = newImages.map((file) => URL.createObjectURL(file));

    setImages([...images, ...urls]);

    if (newImages.length > 0) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: urls[0],
      }));
    }
  };

  const handleRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalTitle =
        formData.title ||
        `${formData.brand} ${formData.model} for sale`;

      const postData = {
        // Post table
        title: finalTitle,
        description: formData.description,
        price: parseFloat(formData.price),
        condition: formData.condition,
        categoryType: "ELECTRONIC",
        subCategory: formData.subCategory,

        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactWhatsapp: formData.contactWhatsapp,

        // Electronic fields
        type: formData.type,
        brand: formData.brand,
        model: formData.model,
        deviceType: formData.deviceType,
        screenSize: formData.screenSize,
        location: formData.location,
        imageUrl: formData.imageUrl,
      };

      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("Electronic post created successfully!");
        navigate("/");
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      alert("Network error!");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      condition: "",
      categoryType: "ELECTRONIC",
      subCategory: subCategory,
      contactName: currentUser?.firstName + " " + currentUser?.lastName,
      contactEmail: currentUser?.email,
      contactPhone: currentUser?.phoneNumber,
      contactWhatsapp: currentUser?.phoneNumber,
      type: "",
      brand: "",
      model: "",
      deviceType: "",
      screenSize: "",
      location: "",
      imageUrl: "",
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
          <img src={aboutus} alt="Header" />
          <h1>ELECTRONIC POST</h1>
        </div>

        <div className="welcome-box">
          <h2>Create Your Electronic Listing</h2>
          <p>
            Welcome <span>{currentUser?.firstName}!</span>
          </p>
        </div>

        <div className="form_details">
          <form onSubmit={handleSubmit} className="form1">
            <div className="signup">
              <h1>
                Fill in the <span>{subCategory}</span> Details
              </h1>

              {/* Electronic info */}
              <fieldset>
                <h3>Electronic Information</h3>
                <div className="form_grid">
                  <div>
                    <label>Condition:</label>
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

                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                    />

                    <label>Electronic Type:</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {Object.keys(data).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <label>Brand:</label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleBrandChange}
                      required
                      disabled={!formData.type}
                    >
                      <option value="">-- Select Brand --</option>
                      {formData.type &&
                        data[formData.type]?.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                    </select>

                    <label>Model:</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleModelChange}
                      required
                      disabled={!formData.brand}
                    >
                      <option value="">-- Select Model --</option>
                      {modelData[formData.brand]?.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />

                    <label>Device Type:</label>
                    <input
                      type="text"
                      name="deviceType"
                      placeholder="Eg: Smartphone, Smart TV"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                    />

                    <label>Screen Size (inches):</label>
                    <input
                      type="number"
                      name="screenSize"
                      value={formData.screenSize}
                      onChange={handleInputChange}
                    />

                    <label>Price (Rs):</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ width: "100%" }}>
                    <label>Description:</label>
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

              {/* Image upload */}
              <fieldset>
                <h3>Add Photos</h3>
                <div className="image-uploader">
                  <ul className="image-list">
                    {images.map((src, i) => (
                      <li key={i} className="image-item">
                        <div className="image-container">
                          <img src={src} width="92" height="92" />
                          <button type="button" onClick={() => handleRemove(i)}>
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}

                    {images.length < 8 && (
                      <li className="image-item">
                        <label htmlFor="upload_img" className="add-photo">
                          <div className="add-photo-box">+</div>
                        </label>
                        <input
                          id="upload_img"
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

              {/* Contact */}
              <fieldset>
                <h3>Contact Information</h3>

                <label>Seller Name:</label>
                <p className="contact-value">{formData.contactName}</p>

                <label>Email:</label>
                <p className="contact-value">{formData.contactEmail}</p>

                <label>Phone:</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                />

                <label>WhatsApp:</label>
                <input
                  type="tel"
                  name="contactWhatsapp"
                  value={formData.contactWhatsapp}
                  onChange={handleInputChange}
                />
              </fieldset>

              <div className="but">
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
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
