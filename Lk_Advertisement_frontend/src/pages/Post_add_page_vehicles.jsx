import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import { useAuth } from '../context/AuthContext'
import '../css/post_add_2.css'
import aboutus from '../image/aboutus.jpg'
import vehicle2 from '../image/vehicle2.jpg'

export default function Post_add_page_vehicles() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const subCategory = location.state?.subCategory || 'Vehicle';

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: '',
    categoryType: 'VEHICLE',
    subCategory: subCategory,
    contactName: currentUser?.firstName + ' ' + currentUser?.lastName,
    contactEmail: currentUser?.email,
    contactPhone: currentUser?.phoneNumber,
    contactWhatsapp: currentUser?.phoneNumber,
    make: '',
    model: '',
    type: subCategory,
    mileage: '',
    fuelType: '',
    engineCapacity: '',
    trim: '',
    transmission: '',
    location: ''
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category data
  const data = {
    'Cars': ['Toyota', 'Honda', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Mazda', 'Suzuki', 'Mitsubishi'],
    'Motorbikes': ['Yamaha', 'Honda', 'Suzuki', 'Bajaj', 'TVS', 'Hero', 'Kawasaki'],
    'Three-Wheeler': ['Bajaj', 'TVS', 'Piaggio'],
    'Van': ['Toyota', 'Nissan', 'Mitsubishi', 'Ford'],
    'Bus': ['Leyland', 'Tata', 'Ashok', 'Volvo'],
    'Lorries & Trucks': ['Tata', 'Ashok', 'Eicher', 'Mahindra']
  };

  // Brand-wise model data
  const modelData = {
    Toyota: ['Corolla', 'Camry', 'Prius', 'RAV4', 'Land Cruiser', 'Hilux', 'Vitz', 'Aqua'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Vezel', 'Fit', 'Grace'],
    Nissan: ['Sunny', 'X-Trail', 'Patrol', 'Juke', 'March', 'Leaf'],
    BMW: ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5'],
    Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'],
    Audi: ['A3', 'A4', 'A6', 'Q3', 'Q5'],
    Mazda: ['CX-3', 'CX-5', 'CX-9', 'Mazda3'],
    Suzuki: ['Swift', 'Alto', 'Wagon R', 'Vitara', 'Ciaz'],
    Mitsubishi: ['L300', 'Montero', 'Outlander', 'Mirage'],
    Yamaha: ['YZF-R15', 'MT-15', 'FZ', 'FZS', 'RX100'],
    Bajaj: ['Pulsar', 'Discover', 'Platina', 'Boxer'],
    TVS: ['Apache', 'Jupiter', 'NTorq', 'Star City'],
    Hero: ['Splendor', 'Passion', 'Glamour', 'Xtreme'],
    Kawasaki: ['Ninja', 'Z', 'Vulcan'],
    Ford: ['Transit', 'Ranger', 'Everest'],
    Leyland: ['Lynx', 'Comet', 'Viking'],
    Tata: ['Ace', 'Super Ace', '407', 'Nano'],
    Ashok: ['Dost', 'Partner', 'Truck'],
    Eicher: ['Pro', 'Skyline', 'Mighty'],
    Mahindra: ['Jeep', 'Bolero', 'Scorpio'],
    Volvo: ['B7R', 'B9R', '9400']
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle category changes
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      type: category,
      subCategory: category,
      make: '',
      model: ''
    }));
  };

  // Handle brand changes
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      make: brand,
      model: ''
    }));
  };

  // Handle model changes
  const handleModelChange = (e) => {
    const model = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      model: model
    }));
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 8 - images.length);
    
    // Store both File objects and preview URLs
    const newImageFiles = newImages.map(file => file);
    const imageURLs = newImages.map((file) => URL.createObjectURL(file));
    
    setImages([...images, ...imageURLs]);
    setImageFiles([...imageFiles, ...newImageFiles]);
  };

  // Remove selected image
  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (imageFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Auto-generate title if not provided
      const title = formData.title || `${formData.make} ${formData.model} - ${formData.type}`;

      // Prepare the data for API
      const postData = {
        title: title,
        description: formData.description,
        price: parseFloat(formData.price),
        condition: formData.condition,
        categoryType: 'VEHICLE',
        subCategory: formData.subCategory,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactWhatsapp: formData.contactWhatsapp,
        location: formData.location,
        make: formData.make,
        model: formData.model,
        type: formData.type,
        mileage: parseInt(formData.mileage) || 0,
        fuelType: formData.fuelType,
        engineCapacity: formData.engineCapacity,
        trim: formData.trim,
        transmission: formData.transmission
      };

      console.log('Submitting post data:', postData);

      const token = localStorage.getItem('token');
      
      // Step 1: Create the post first
      const postResponse = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (!postResponse.ok) {
        const error = await postResponse.text();
        throw new Error(error || 'Failed to create post');
      }

      const savedPost = await postResponse.json();
      console.log('Post saved successfully:', savedPost);

      // Step 2: Upload images with the post ID
      if (imageFiles.length > 0) {
        const imageFormData = new FormData();
        imageFiles.forEach(file => {
          imageFormData.append('files', file);
        });

        const imageResponse = await fetch(`http://localhost:8080/api/images/create?title=Post_${savedPost.id}&id=${savedPost.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: imageFormData
        });

        if (!imageResponse.ok) {
          console.warn('Failed to upload images, but post was created');
        } else {
          console.log('Images uploaded successfully');
        }
      }

      alert('Post created successfully!');
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating post: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      condition: '',
      categoryType: 'VEHICLE',
      subCategory: subCategory,
      contactName: currentUser?.firstName + ' ' + currentUser?.lastName,
      contactEmail: currentUser?.email,
      contactPhone: currentUser?.phoneNumber,
      contactWhatsapp: currentUser?.phoneNumber,
      make: '',
      model: '',
      type: subCategory,
      mileage: '',
      fuelType: '',
      engineCapacity: '',
      trim: '',
      transmission: '',
      location: ''
    });
    setImages([]);
    setImageFiles([]);
  };

  const handleCancel = () => {
    resetForm();
    navigate('/post_add');
  };
  
  return (
    <div>
      <Navibar />
      <div className="post_page_2">
        <div className="header-image2">
          <img src={vehicle2} alt="Header Image" />
          <h1>YOUR VEHICLE POST</h1>
        </div>
        <div className="welcome-box">
          <h2>Contact us and Add a Post</h2>
          <p>Welcome <span>{currentUser?.firstName} !</span></p>
        </div>
        <div className="form_details">
          <form onSubmit={handleSubmit} className='form1'>
            <div className="signup">
              <h1>Fill in the <span>{subCategory.toLowerCase()}</span> Post Details </h1>
              <fieldset style={{'margin-bottom':'20px'}}>
                <div className="image-upload-header-wrapper">
                  <h3>Vehicle Details</h3>
                </div>
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
                      <option value="Brand New">Brand New</option>
                      <option value="Used">Used</option>
                      <option value="Reconditioned">Reconditioned</option>
                    </select>

                    <label>Title :</label>
                    <input 
                      type="text" 
                      name="title" 
                      placeholder="Title" 
                      value={formData.title}
                      onChange={handleInputChange}
                    />
        
                    <label>Vehicle Type :</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      {Object.keys(data).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
        
                    <label>Brand :</label>
                    <select
                      name="make"
                      value={formData.make}
                      onChange={handleBrandChange}
                      disabled={!formData.type}
                      required
                    >
                      <option value="">-- Select Brand --</option>
                      {formData.type &&
                        data[formData.type]?.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                    </select>
        
                    <label>Model :</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleModelChange}
                      disabled={!formData.make || !modelData[formData.make]}
                      required
                    >
                      <option value="">-- Select Model --</option>
                      {formData.make && modelData[formData.make]
                        ? modelData[formData.make].map((modelName) => (
                            <option key={modelName} value={modelName}>
                              {modelName}
                            </option>
                          ))
                        : null}
                    </select>

                    <label>Fuel Type :</label>
                    <select 
                      name="fuelType" 
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
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
                    
                    <label>Mileage (km) :</label>
                    <input 
                      type="number" 
                      name="mileage" 
                      placeholder="Mileage (km)" 
                      value={formData.mileage}
                      onChange={handleInputChange}
                    />
        
                    <label>Engine Capacity :</label>
                    <input 
                      type="number" 
                      name="engineCapacity" 
                      placeholder="Engine Capacity" 
                      value={formData.engineCapacity}
                      onChange={handleInputChange}
                    />
        
                    <label>Trim / Edition :</label>
                    <input 
                      type="text" 
                      name="trim" 
                      placeholder="Trim / Edition" 
                      value={formData.trim}
                      onChange={handleInputChange}
                    />
        
                    <label>Transmission :</label>
                    <select 
                      name="transmission" 
                      value={formData.transmission}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Semi-Automatic">Semi-Automatic</option>
                    </select>
        
                    <label>Price (Rs) :</label>
                    <input 
                      type="number" 
                      name="price" 
                      placeholder="Price (Rs)" 
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div style={{width: '100%', margin: '0 0 -20px'}}>
                    <label>Description :</label>
                    <textarea 
                      name="description" 
                      placeholder="Description" 
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="6"
                      style={{width: '100%', padding: '8px'}}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Image upload section */}
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
  )
}