import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../componet/Footer";
import Navibar from "../componet/Navibar";
import { useAuth } from "../context/AuthContext";
import "../css/post_add_2.css";
import aboutus from "../image/aboutus.jpg";
import electronic2 from "../image/electronic2.jpg";

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
    type: "",
    brand: "",
    model: "",
    deviceType: "",
    screenSize: "",
    location: ""
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Electronic Categories
  const data = {
    TVs: ["Samsung", "LG", "Sony", "Panasonic", "HP"],
    Laptops: ["Dell", "HP", "Lenovo", "Asus", "Acer"],
    Cameras: ["Canon", "Nikon", "Sony", "Fujifilm"],
    Speakers: ["JBL", "Bose", "Sony", "Ultimate Ears"],
    "Home Appliances": ["Whirlpool", "LG", "Samsung", "Bosch"],
    other: ["Other Brands"]
  };

  const modelData = {
    Samsung: ["QLED", "Crystal UHD", "The Frame"],
    LG: ["OLED", "NanoCell", "UHD"],
    Sony: ["Bravia", "Xperia"],
    Panasonic: ["Viera", "Lumix"],
    HP: ["Pavilion", "Envy", "Spectre"],
    Dell: ["Inspiron", "XPS", "Latitude"],
    Lenovo: ["ThinkPad", "Yoga", "Legion"],
    Asus: ["ZenBook", "ROG", "VivoBook"],
    Acer: ["Aspire", "Predator", "Swift"],
    Canon: ["EOS R5", "EOS M50", "PowerShot G7 X"],
    Nikon: ["Z6 II", "D850", "Coolpix P1000"],
    Fujifilm: ["X-T4", "X100V", "GFX 100S"],
    JBL: ["Flip 5", "Charge 4", "Pulse 4"],
    Bose: ["SoundLink Revolve", "QuietComfort 35 II"],
    "Ultimate Ears": ["Boom 3", "Megaboom 3"],
    Whirlpool: ["Washing Machine X500", "Refrigerator Y200"],
    Bosch: ["Dishwasher Z300", "Oven A100"],
    "Other Brands": ["Standard Model"]
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
    
    const newImageFiles = newImages.map(file => file);
    const urls = newImages.map((file) => URL.createObjectURL(file));

    setImages([...images, ...urls]);
    setImageFiles([...imageFiles, ...newImageFiles]);
  };

  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalTitle = formData.title || `${formData.brand} ${formData.model} for sale`;

      const postData = {
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
        type: formData.type,
        brand: formData.brand,
        model: formData.model,
        deviceType: formData.deviceType,
        screenSize: formData.screenSize,
        location: formData.location
      };

      const token = localStorage.getItem("token");
      
      // Step 1: Create post first
      const postResponse = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (!postResponse.ok) {
        const error = await postResponse.text();
        throw new Error(error || "Failed to create post");
      }

      const savedPost = await postResponse.json();

      // Step 2: Upload images with post ID
      if (imageFiles.length > 0) {
        const imageFormData = new FormData();
        imageFiles.forEach(file => {
          imageFormData.append('files', file);
        });

        const imageResponse = await fetch(`http://localhost:8080/api/images/create?title=Post_${savedPost.id}&id=${savedPost.id}`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: imageFormData
        });

        if (!imageResponse.ok) {
          console.warn('Failed to upload images, but post was created');
        }
      }

      alert("Electronic post created successfully!");
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
      alert("Error creating post: " + error.message);
    } finally {
      setIsSubmitting(false);
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
      location: ""
    });
    setImages([]);
    setImageFiles([]);
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
          <img src={electronic2} alt="Header" />
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
              <fieldset style={{'margin-bottom':'20px'}}>
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
                      required
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
              <fieldset style={{'margin-bottom':'20px'}}>
                <div data-testid="image-uploader" className="image-uploader">
                  <div className="image-upload-header-wrapper">
                    <h3>Add up to 8 photos</h3>
                  </div>
                  <div className="grid-container">
                    <ul className="image-list">
                      {images.map((src, index) => (
                        <li key={index} className="image-item">
                          <div className="image-container">
                            <img src={src} alt={`upload-${index}`} width="92" height="92" />
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => handleRemove(index)}
                            >
                              ✕
                            </button>
                          </div>
                        </li>
                      ))}

                      {images.length < 8 && (
                        <li className="image-item">
                          <label htmlFor="input_image_upload" className="add-photo">
                            <div className="add-photo-box" style={{ width: 92, height: 92 }}>
                              <div className="icon" style={{ fill: "#0074BA" }}>
                                <svg viewBox="0 0 24 24" width="40" height="40">
                                  <path
                                    d="M19.4 17.44l-2.1-6.76-2.45 1.5-1.5-3.7-4 6.45-1.15-1.71-4.08 4.22 15.18-.05zM7.47 9.53A1.44 1.44 0 1 1 6 8.05a1.46 1.46 0 0 1 1.47 1.48zM2.93 5.08h18.14v13.84H2.93zM1.5 20.4h21V3.6h-21z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <input
                              accept=".jpg,.jpeg,.png"
                              multiple
                              id="input_image_upload"
                              className="hidden-input"
                              type="file"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </li>
                      )}

                      {Array.from({ length: 8 - images.length - 1 }).map((_, i) => (
                        <li key={`empty-${i}`} className="image-item disabled">
                          <div
                            className="disabled-box"
                            style={{ width: 92, height: 92, color: "#949494ff" }}
                          >
                            <svg viewBox="0 0 24 24" width="40" height="40">
                              <path
                                d="M19.4 17.44l-2.1-6.76-2.45 1.5-1.5-3.7-4 6.45-1.15-1.71-4.08 4.22 15.18-.05zM7.47 9.53A1.44 1.44 0 1 1 6 8.05a1.46 1.46 0 0 1 1.47 1.48zM2.93 5.08h18.14v13.84H2.93zM1.5 20.4h21V3.6h-21z"
                                fill="#949494ff"
                                fillRule="evenodd"
                              />
                            </svg>
                            <div>Add a photo</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {images.length === 0 && (
                    <div className="help-text">You must upload at least one photo</div>
                  )}
                </div>
              </fieldset>

              {/* Contact */}
              <fieldset style={{'margin-bottom':'20px'}}>
                <div className="image-upload-header-wrapper">
                  <h3>Contact Details</h3>
                </div>
                <div className="contact_detail">
                  <div className="divlabel">
                    <label>Seller Name :</label>
                    <p style={{color:'#0074BA', fontSize:'22px', textTransform:'capitalize'}}>
                      {currentUser?.firstName} {currentUser?.lastName}
                    </p>
                  </div>
                  <div className="divlabel">
                    <label>Seller Email :</label>
                    <p style={{color:'#0074BA', fontSize:'22px'}}>
                      {currentUser?.email}
                    </p>
                  </div>
                  <div className="two-col">
                    <div className="form-group">
                      <label>Phone Number :</label>
                      <input 
                        type="tel"
                        name="contactPhone"
                        placeholder="Phone Number"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>WhatsApp :</label>
                      <input 
                        type="tel"
                        name="contactWhatsapp"
                        placeholder="WhatsApp"
                        value={formData.contactWhatsapp}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="but">
                <button type="button" onClick={handleCancel} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Continue'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}