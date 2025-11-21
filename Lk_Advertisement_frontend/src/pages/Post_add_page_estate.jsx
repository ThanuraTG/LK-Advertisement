import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import { useAuth } from '../context/AuthContext'
import '../css/post_add_2.css'
import aboutus from '../image/aboutus.jpg'
import estate2 from '../image/estate2.jpg'

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
    estateType: subCategory,
    bedrooms: "",
    bathrooms: "",
    lotSize: "",
    lotUnit: "",
    address: "",
    location: ""
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    const newImageFiles = newImages.map(file => file);
    const urls = newImages.map(file => URL.createObjectURL(file));

    setImages([...images, ...urls]);
    setImageFiles([...imageFiles, ...newImageFiles]);
  };

  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      const title = formData.title || `${formData.estateType} for sale in ${formData.location}`;

      const postData = {
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
        realEstateType: formData.estateType,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        lotSize: formData.lotSize,
        address: formData.address,
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

      alert("Estate post created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating post: " + err.message);
    } finally {
      setIsSubmitting(false);
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
          <img src={estate2} alt="Header Image" />
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
              <fieldset style={{'margin-bottom':'20px'}}>
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
                      <option value="Land with House">Land with House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Villa">Villa</option>
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
                      required
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

              {/* Contact Details */}
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

              {/* Buttons */}
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