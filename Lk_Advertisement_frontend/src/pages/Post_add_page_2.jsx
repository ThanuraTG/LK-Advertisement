import { useState } from 'react'
import Footer from '../componet/Footer'
import Navibar from '../componet/Navibar'
import { useAuth } from '../context/AuthContext'
import '../css/post_add_2.css'
import aboutus from '../image/aboutus.jpg'


export default function Post_add_page_2() {
  const { currentUser } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    // Post table fields
    title: '',
    description: '',
    price: '',
    condition: '',
    categoryType: 'VEHICLE',
    subCategory: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactWhatsapp: '',
    
    // VehiclePost table fields
    make: '',
    model: '',
    type: '',
    mileage: '',
    fuelType: '',
    engineCapacity: '',
    trim: '',
    transmission: '',
    imageUrl: ''
  });

  const [images, setImages] = useState([]);

  // Category data
  const data = {
    Cars: ['BMW', 'Mercedes', 'Toyota', 'Nissan', 'Honda', 'Audi', 'Mazda'],
    Motorbikes: ['Yamaha', 'Honda', 'Suzuki', 'Bajaj'],
    'Three Wheelers': ['Bajaj', 'TVS', 'Mahindra'],
    Vans: ['Toyota', 'Nissan', 'Mitsubishi'],
    Buses: ['Leyland', 'Tata', 'Ashok'],
    'Lory & Trucks': ['Tata', 'Ashok', 'Eicher'],
  };

  // Brand-wise model data
  const modelData = {
    BMW: ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5'],
    Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'],
    Toyota: ['Corolla', 'Camry', 'Prius', 'RAV4', 'Land Cruiser'],
    Nissan: ['Sunny', 'X-Trail', 'Patrol', 'Juke'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Vezel'],
    Audi: ['A3', 'A4', 'A6', 'Q3', 'Q5'],
    Mazda: ['CX-3', 'CX-5', 'CX-9', 'Mazda3'],
    Yamaha: ['YZF-R15', 'MT-15', 'FZ', 'FZS'],
    Honda: ['CBR', 'Hornet', 'Shine', 'Activa'],
    Suzuki: ['Gixxer', 'Access', 'Burgman'],
    Bajaj: ['Pulsar', 'Discover', 'Platina'],
    TVS: ['Apache', 'Jupiter', 'NTorq'],
    Mahindra: ['Jeep', 'Bolero', 'Scorpio'],
    Mitsubishi: ['L300', 'Montero', 'Outlander'],
    Leyland: ['Lynx', 'Comet', 'Viking'],
    Tata: ['Ace', 'Super Ace', '407'],
    Ashok: ['Dost', 'Partner', 'Truck'],
    Eicher: ['Pro', 'Skyline', 'Mighty']
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
      subCategory: '',
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
      subCategory: brand,
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
    const imageURLs = newImages.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageURLs]);
    
    // For now, we'll store the first image URL
    if (newImages.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        imageUrl: URL.createObjectURL(newImages[0])
      }));
    }
  };

  // Remove selected image
  const handleRemove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare the data for API
      const postData = {
        // Post table data
        title: `${formData.make} ${formData.model} - ${formData.type}`,
        description: formData.description,
        price: parseFloat(formData.price),
        condition: formData.condition,
        categoryType: 'VEHICLE',
        subCategory: formData.subCategory,
        contactName: currentUser.firstName + ' ' + currentUser.lastName,
        contactEmail: currentUser.email,
        contactPhone: currentUser.phoneNumber,
        contactWhatsapp: currentUser.phoneNumber,
        
        // VehiclePost specific data
        make: formData.make,
        model: formData.model,
        type: formData.type,
        mileage: parseInt(formData.mileage) || 0,
        fuelType: formData.fuelType,
        engineCapacity: formData.engineCapacity,
        trim: formData.trim,
        transmission: formData.transmission,
        imageUrl: formData.imageUrl
      };

      // API call to save the post
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT token
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const savedPost = await response.json();
        console.log('Post saved successfully:', savedPost);
        alert('Post created successfully!');
        // Reset form or redirect
        // resetForm();
      } else {
        const error = await response.text();
        console.error('Error saving post:', error);
        alert('Error creating post. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again.');
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
      subCategory: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactWhatsapp: '',
      make: '',
      model: '',
      type: '',
      mileage: '',
      fuelType: '',
      engineCapacity: '',
      trim: '',
      transmission: '',
      imageUrl: ''
    });
    setImages([]);
  };

  const handleCancel = () => {
    resetForm();
    // Optionally navigate back or clear form
  };

  return (
    <div>
      {/* navigation bar part header */}
      <Navibar />
      {/* main body part header */}
      <div className="post_page_2">
        <div className="header-image2">
          <img src={aboutus} alt="Header Image" />
          <h1>YOUR VEHICLE POST</h1>
        </div>
        <div className="welcome-box">
          <h2>Contact us and Add a Post</h2>
          <p>Welcome <span>{currentUser.firstName} !</span></p>
        </div>
        <div className="form_details">
          <form onSubmit={handleSubmit} className='form1'>
            <div className="signup">
              <h1>Fill in the <span>car</span> Post Details </h1>
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
                      <option value="Import">Import</option>
                      <option value="Reconditioned">Reconditioned</option>
                    </select>

                    <label>Title :</label>
                    <input 
                      type="text" 
                      name="Title" 
                      placeholder="Title" 
                      value={formData.mileage}
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
                        data[formData.type].map((brand) => (
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

                    <label>Model Year :</label>
                    <input 
                      type="number" 
                      name="ModelYear" 
                      placeholder="Model Year" 
                      value={formData.mileage}
                      onChange={handleInputChange}
                    />

                    <label>Fuel Type :</label>
                    <select 
                      name="fuelType" 
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label>Location :</label>
                    <input 
                      type="text" 
                      name="Location" 
                      placeholder="Location" 
                      value={formData.engineCapacity}
                      onChange={handleInputChange}
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
                      type="text" 
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
                    <input 
                      type="text" 
                      name="transmission" 
                      placeholder="Transmission" 
                      value={formData.transmission}
                      onChange={handleInputChange}
                    />

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

              {/* Image upload section remains the same */}
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

              <fieldset style={{'margin-bottom':'20px'}}>
                <div className="image-upload-header-wrapper">
                  <h3>Contact Details</h3>
                </div>
                <div className="contact_detail">
                  <label>Seller Name :</label>
                  <p style={{'color':'#0074BA', 'fontSize':'22px','textTransform': 'capitalize'}}>
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  
                  <label>Seller Email :</label>
                  <p style={{'color':'#0074BA', 'fontSize':'22px'}}>
                    {currentUser.email}
                  </p>
                  
                  <label>WhatsApp :</label>
                  <input type="tel" className="whatsapp" id="" placeholder='WhatsApp' />
                  {/* <p style={{'color':'#0074BA', 'fontSize':'22px','textTransform': 'capitalize'}}>
                    {currentUser.phoneNumber}
                  </p> */}
                </div>
              </fieldset>
              
              <div className="but">
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit">Continue</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* footer part header */}
      <Footer />
    </div>
  )
}
