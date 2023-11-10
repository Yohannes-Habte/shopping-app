import React, { useEffect, useState } from 'react';
import './CreateEvent.scss';
import { AiFillTags } from 'react-icons/ai';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { FaAudioDescription, FaUpload } from 'react-icons/fa';
import { MdEmojiEvents, MdMedicalServices } from 'react-icons/md';
import { MdOutlineDateRange, MdPriceChange } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateEvent = () => {
  const navigate = useNavigate();

  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  // Local state variables
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handle start date change
  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById('end-date').min = minEndDate.toISOString.slice(
      0,
      10
    );
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  // today is
  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : '';

  // Success or failure display
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success('Event created successfully!');
      navigate('/dashboard-events');
      window.location.reload();
    }
  }, [dispatch, error, success]);

  // Handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;

      case 'description':
        setDescription(e.target.value);
        break;

      case 'category':
        setCategory(e.target.value);
        break;

      case 'tags':
        setTags(e.target.value);
        break;

      case 'originalPrice':
        setOriginalPrice(e.target.value);
        break;

      case 'discountPrice':
        setDiscountPrice(e.target.value);
        break;

      case 'stock':
        setStock(e.target.value);
        break;

      default:
        break;
    }
  };
  // Hanlde submit
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      /** 
       //& For more images upload
      const imagesData = new FormData();

      images.forEach((image) => {
        imagesData.append('images', image);
      });

      */
      const data = {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        images,
        shopId: currentSeller._id,
        start_Date: startDate?.toISOString(),
        Finish_Date: endDate?.toISOString(),
      };
      dispatch('createevent'(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="create-event-wrapper">
      <h5 className="title">Create Event</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit} className="form">
        {/* Event name */}
        <div className="input-container">
          <MdEmojiEvents className="icon" />
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={updateChange}
            placeholder="Enter Event Name"
            className="input-field"
          />
          <label htmlFor="name" className="input-label">
            Event Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Product category */}
        <div className="input-container">
          <BiSolidCategoryAlt className="icon" />
          <label htmlFor="category" className="input-label">
            Event Category <span className="mark">*</span>
          </label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={updateChange}
            className="input-field"
          >
            <option value="default">Choose Event Category</option>
            <option value="phone"> Phone </option>
            <option value="laptop"> Laptop </option>
            <option value="shoes"> Shoes </option>
            <option value="clothes"> Clothes </option>
            <option value="accesseries"> Accesseries </option>
          </select>
        </div>

        {/* Product tags */}
        <div className="input-container">
          <AiFillTags className="icon" />
          <input
            type="text"
            name="tags"
            id="tags"
            autoComplete="tags"
            required
            value={tags}
            onChange={updateChange}
            placeholder="Enter Event tags"
            className="input-field"
          />
          <label htmlFor="tags" className="input-label">
            Event tags
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Event Original Price */}
        <div className="input-container">
          <MdPriceChange className="icon" />
          <input
            type="number"
            name="originalPrice"
            id="originalPrice"
            autoComplete="originalPrice"
            required
            value={originalPrice}
            onChange={updateChange}
            placeholder="Enter Event Original Price"
            className="input-field"
          />
          <label htmlFor="originalPrice" className="input-label">
            Event Original Price
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Event discount Price */}
        <div className="input-container">
          <MdPriceChange className="icon" />
          <input
            type="number"
            name="discountPrice"
            id="discountPrice"
            autoComplete="discountPrice"
            required
            value={discountPrice}
            onChange={updateChange}
            placeholder="Enter Event Discount Price"
            className="input-field"
          />
          <label htmlFor="discountPrice" className="input-label">
            Event Discount Price
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Event stock */}
        <div className="input-container">
          <MdMedicalServices className="icon" />
          <input
            type="number"
            name="stock"
            id="stock"
            autoComplete="stock"
            required
            value={stock}
            onChange={updateChange}
            placeholder="Enter Event Stock"
            className="input-field"
          />
          <label htmlFor="stock" className="input-label">
            Event Stock
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Event Starting date */}
        <div className="input-container">
          <MdOutlineDateRange className="icon" />
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            value={startDate ? startDate.toISOString().slice(0, 10) : ''}
            onChange={handleStartDateChange}
            min={today}
            placeholder="Enter  Event Start Date"
            className="input-field"
          />
          <label htmlFor="startDate" className="input-label">
            Event Start Date
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Event Ending date */}
        <div className="input-container">
          <MdOutlineDateRange className="icon" />
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            value={endDate ? endDate.toISOString().slice(0, 10) : ''}
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter Event End Date"
            className="input-field"
          />
          <label htmlFor="startDate" className="input-label">
            Event Start Date
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Images of products */}
        <div className="file-container">
          <label htmlFor="images" className="image-label">
            <FaUpload className="icon" />
            Upload Images <span className="mark">*</span>
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleImageChange}
            className="input-field"
          />
        </div>

        {/* display products upload images on the browser */}
        <figure className="image-container">
          {images &&
            images.map((product) => (
              <img
                src={product}
                key={product}
                alt="Product"
                className="image"
              />
            ))}
        </figure>

        {/* Event Description */}
        <div className="input-container">
          <FaAudioDescription className="icon" />
          <textarea
            type="text"
            name="description"
            id="description"
            cols="30"
            rows="7"
            autoComplete="description"
            required
            value={description}
            onChange={updateChange}
            placeholder="Enter Even Description"
            className="input-field"
          ></textarea>
          <label htmlFor="description" className="input-label">
            Event Description
          </label>
          <span className="input-highlight"></span>
        </div>

        <button className="create-event-btn">Submit</button>
      </form>
    </section>
  );
};

export default CreateEvent;
