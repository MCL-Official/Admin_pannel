import { useState, useRef, useEffect } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { updateShowcase, updateShowcase_seo } from "../../User_Management/features/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AllCategories_sm, DeleteCategoryCRUD, get_Category } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { Icon, Button } from "@mui/material";
import axios from "axios";
import { url4 } from "../../../UI/port";

const EditShowcase = ({ setExpand, setActiveTab }) => {
  const fileInputRef = useRef(null);
  const preData = useSelector((state) => state.userManagement.getProjectDetails)
  setExpand("showcaseManagement");
  setActiveTab("projectList");
  const head = "Edit Showcase";
  const dispatch = useDispatch();
  const location = useLocation();
  // const data = location.state;

  const [title, setTitle] = useState(preData.project_name);
  const [title1, setTitle1] = useState(preData.project_subtitle);
  const [content, setContent] = useState(preData.project_details);
  const [content1, setContent1] = useState(preData.project_desc);
  const [content2, setContent2] = useState(preData.project_sub_desc);
  const [images, setImages] = useState([]);
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [label, setLabel] = useState(preData.category);
  const [catId, setcatId] = useState(preData.category_id);
  const [rate, setRate] = useState(preData.project_rate);
  const [type, setType] = useState("S$");
  const [metatitle, setMetaTitle] = useState('')
  const [metadesc, setMetaDesc] = useState('')
  const [metakeywords, setMetaKeywords] = useState('')
  const [metaphoto, setMetaPhoto] = useState();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [temp, settemp] = useState('');
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);


  }, [])
  const fetchData = async () => {
    // let data;
    try {
      const response = await axios.get(`${url4}/api/Project_sm/?pid=${preData.pid}`, {
        headers: {
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      const data = response.data.metaData;
      console.log("This is the data", data);
      setMetaTitle(data.metaTitle)
      setMetaDesc(data.metaDesc)
      setMetaKeywords(data.metaKey)
      settemp(data.metaImage)

    } catch (error) {
      console.log(error);
    }
  };


  const HandleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("project_name", title);
    formData.append("category", label);
    formData.append("category_id", catId);
    formData.append("project_details", content);
    formData.append("project_subtitle", title1);
    formData.append("project_rate", rate);
    formData.append("project_desc", content1);
    formData.append("project_sub_desc", content2);
    formData.append("rate_currency", type);
    formData.append("pid", preData.pid);
    images.map((image, index) => {
      formData.append("thumbnail_photo", image);
    });
    images1.map((image, index) => {
      formData.append("slider_photos", image);
    });
    images2.map((image, index) => {
      formData.append("sub_slider_photos", image);
    });
    images3.map((image, index) => {
      formData.append("quatation_photo", image);
    });
    const seoformData = new FormData();
    seoformData.append("metaDesc", metadesc);
    seoformData.append("metaTitle", metatitle);
    seoformData.append("metaImage", metaphoto);
    seoformData.append("metaKey", metakeywords);
    seoformData.append("pid", preData.pid);

    console.log(...formData)

    setLoading(true);
    await dispatch(updateShowcase(formData))
    await dispatch(updateShowcase_seo(seoformData));
    setLoading(false);
    // .then(() => {
    navigate("/home/projectList");
    // window.location.reload();
    // })
    // .catch((err) => {
    // console.log(err);
    // });
  };


  const handleImageUpload = (event) => {
    const uploadedImages = [];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleImageUpload1 = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages1(uploadedImages);
  };
  const handleImageUpload2 = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages2(uploadedImages);
  };

  const handleImageUpload3 = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages3(uploadedImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };
  const handleRemoveImage1 = (index) => {
    const newImages = [...images1];
    newImages.splice(index, 1);
    setImages1(newImages);

    // fileInputRef.current.value = newImages.length;
  };
  const handleRemoveImage2 = (index) => {
    const newImages = [...images2];
    newImages.splice(index, 1);
    setImages2(newImages);

    // fileInputRef.current.value = newImages.length;
  };
  const handleRemoveImage3 = (index) => {
    const newImages = [...images3];
    newImages.splice(index, 1);
    setImages3(newImages);

    // fileInputRef.current.value = newImages.length;
  };
  const handleMetaTitleChange = (event) => {
    setMetaTitle(event.target.value);
  };
  const handleMetaDescChange = (event) => {
    setMetaDesc(event.target.value);
  };
  const handleMetaKeywordChange = (event) => {
    setMetaKeywords(event.target.value);
  };

  const handleMetaPhotoChange = (event) => {
    let img = event.target.files[0]
    setMetaPhoto(img);
  };
  const handleMetaPhotoRemove = () => {
    setMetaPhoto(null);
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
    setcatId(event.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(AllCategories_sm());
    };
    fetchUserData();
  }, [dispatch]);
  const productCategory = useSelector((state) => state.userManagement.AllCategories_sm)

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-80 mb-10 px-8 rounded-lg shadow-xl py-3 relative bg-gray-100" style={{ marginTop: "120px" }}>
        <form onSubmit={HandleSubmit}>
          <label className="grid mt-5">
            Project Title
            <input
              type="text"
              placeholder="Enter Title"
              id="title"
              className="rounded  outline-none"
              style={{
                height: "50px",
                // width: "1210px",
                paddingLeft: "10px",
                backgroundColor: "#e5ecff",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}

            />
          </label>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <label className="grid pr-6">
              Category
              <select
                id="label"
                name="label"
                className="outline-none rounded"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                  backgroundColor: "#e5ecff",
                }}
                value={label}
                onChange={handleLabelChange}
              >
                <option value="">Select category</option>
                {productCategory.map((item, index) => {
                  return <option value={`${item.cid}`}>{item.ctg_name}</option>;
                })}
              </select>
            </label>
            <label className="grid">
              Project Rate
              <div className="flex flex-row">
                <div style={{
                  height: "50px",
                  width: "50px",
                  border: "2px solid 	lightgray",
                  marginTop: "5px",
                  fontSize: "17px",
                }}
                  className="flex bg-white text justify-center items-center"
                >
                  <div>
                    S$
                  </div>
                </div>
                <input
                  type="number"
                  value={rate}
                  className="outline-none rounded"
                  placeholder="S$ 000.00"
                  style={{
                    height: "50px",
                    // width: "586px",
                    paddingLeft: "10px",
                    backgroundColor: "#e5ecff",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setRate(event.target.value)}

                />
              </div>
            </label>
          </div>

          <label className="grid mt-5" style={{ fontSize: "15px" }}>
            Thumbnail Photo
            <input
              className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
              style={{ border: "2px solid lightgray" }}
              type="file"
              placeholder=""
              accept="image/*"
              onChange={handleImageUpload}

            />
          </label>
          <div style={{ width: "600px", marginTop: "10px" }}>
            {images.length > 0 ? (null) : (
              <div className="grid grid-cols-6 gap-2">
                <div className="relative">
                  <img
                    src={preData.thumbnail_photo}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />

                </div>
              </div>
            )}
            {images && images.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)} // replace with your image source
                      alt={image.name} // replace with your image alt text
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }} // set width, height, object-fit, and margin-right styles
                    />
                    <button
                      className="absolute top-0 text-white"
                      style={{ right: 5 }}
                      onClick={() => handleRemoveImage(index)}>
                      <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: "10px", marginTop: "8px" }}>
            <ul className="list-disc ml-3 text-gray-500">
              <li>Allowed banner image extension .jpg | .jpeg | .png</li>
              <li>
                Max banner image file size <a className="text-red-500">5MB</a>
              </li>
              <li>
                Recommended Banner image size{" "}
                <a className="text-red-500">1900px * 700px</a>
              </li>
            </ul>
          </div>
          <label className="grid mt-5" style={{ fontSize: "15px" }}>
            Slider Photos
            <input
              className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
              style={{ border: "2px solid lightgray" }}
              type="file"
              placeholder=""
              accept="image/*"
              onChange={handleImageUpload1}

              multiple
            />
          </label>
          {/* </div> */}
          <div style={{ width: "600px", marginTop: "10px" }}>
            <div className="grid grid-cols-6 gap-2">
              {images1.length > 0 ? (null) : preData.slider_photos.map((item) => (
                <div className="relative">
                  <img
                    src={item}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />
                </div>
              ))}
            </div>
            {images1 && images1.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images1.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)} // replace with your image source
                      alt={image.name} // replace with your image alt text
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }} // set width, height, object-fit, and margin-right styles
                    />
                    <button
                      className="absolute top-0 text-white"
                      style={{ right: 5 }}
                      onClick={() => handleRemoveImage1(index)}>
                      <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: "10px", marginTop: "8px" }}>
            <ul className="list-disc ml-3 text-gray-500">
              <li>Allowed banner image extension .jpg | .jpeg | .png</li>
              <li>
                Max banner image file size <a className="text-red-500">5MB</a>
              </li>
              <li>
                Recommended Banner image size{" "}
                <a className="text-red-500">1900px * 700px</a>
              </li>
            </ul>
          </div>

          <label className="grid mt-5">
            Project Details
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                // width: "1210px",
                border: "2px solid lightgray",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}

            />
          </label>
          {/* <div> */}
          <label className="grid mt-5">
            Project Subtitle
            <input
              type="text"
              placeholder="Enter Title"
              id="sub-title"
              className="rounded outline-none"
              style={{
                height: "50px",
                // width: "1210px",
                paddingLeft: "10px",
                border: "2px solid 	lightgray",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title1}
              onChange={(event) => setTitle1(event.target.value)}

            />
          </label>
          <label className="grid mt-5">
            Project Description
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                // width: "1210px",
                border: "2px solid lightgray",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content1}
              onChange={(event) => setContent1(event.target.value)}

            />
          </label>
          <label className="grid mt-5">
            Project Sub Description
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                // width: "1210px",
                border: "2px solid lightgray",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content2}
              onChange={(event) => setContent2(event.target.value)}

            />
          </label>
          {/* <div> */}
          <label className="grid mt-5" style={{ fontSize: "15px" }}>
            Sub Slider Photos
            <input
              className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
              style={{ border: "2px solid lightgray" }}
              type="file"
              placeholder=""
              accept="image/*"
              onChange={handleImageUpload2}

              multiple
            />
          </label>
          <div style={{ width: "600px", marginTop: "10px" }}>
            <div className="grid grid-cols-6 gap-2">
              {images2.length > 0 ? (null) : preData.sub_slider_photos.map((item) => (
                <div className="relative">
                  <img
                    src={item}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />
                </div>
              ))}
            </div>
            {images2 && images2.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images2.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)} // replace with your image source
                      alt={image.name} // replace with your image alt text
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }} // set width, height, object-fit, and margin-right styles
                    />
                    <button
                      className="absolute top-0 text-white"
                      style={{ right: 5 }}
                      onClick={() => handleRemoveImage2(index)}>
                      <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: "10px", marginTop: "8px" }}>
            <ul className="list-disc ml-3 text-gray-500">
              <li>Allowed banner image extension .jpg | .jpeg | .png</li>
              <li>
                Max banner image file size <a className="text-red-500">5MB</a>
              </li>
              <li>
                Recommended Banner image size{" "}
                <a className="text-red-500">1900px * 700px</a>
              </li>
            </ul>
          </div>
          <label className="grid mt-5" style={{ fontSize: "15px" }}>
            Quatation Photo
            <input
              className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
              style={{ border: "2px solid lightgray" }}
              type="file"
              placeholder=""
              accept="image/*"
              onChange={handleImageUpload3}

            />
          </label>
          {/* </div> */}
          <div style={{ width: "600px", marginTop: "10px" }}>
            {images3.length > 0 ? (null) : (
              <div className="grid grid-cols-6 gap-2">
                <div className="relative">
                  <img
                    src={preData.quatation_photo}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />

                </div>
              </div>
            )}
            {images3 && images3.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images3.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)} // replace with your image source
                      alt={image.name} // replace with your image alt text
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }} // set width, height, object-fit, and margin-right styles
                    />
                    <button
                      className="absolute top-0 text-white"
                      style={{ right: 5 }}
                      onClick={() => handleRemoveImage3(index)}>
                      <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: "10px", marginTop: "8px" }}>
            <ul className="list-disc ml-3 text-gray-500">
              <li>Allowed banner image extension .jpg | .jpeg | .png</li>
              <li>
                Max banner image file size <a className="text-red-500">5MB</a>
              </li>
              <li>
                Recommended Banner image size{" "}
                <a className="text-red-500">1900px * 700px</a>
              </li>
            </ul>
          </div>
          <div className=" bg-gray-100 p-5 rounded-md  borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">SEO Area</div>
            <label className="grid pr-6 ">
              Meta Title
              <input
                type="add"
                value={metatitle}
                className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                placeholder=""
                onChange={handleMetaTitleChange}
                required
              // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
              />
            </label>
            <label className="grid pr-6 mt-4">
              Meta Description
              <textarea
                type="add"
                value={metadesc}
                className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                placeholder=""
                onChange={handleMetaDescChange}
                required
              // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
              />
            </label>
            <label className="grid pr-6 mt-4">
              Meta Keywords
              <textarea
                type="add"
                value={metakeywords}
                className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                placeholder=""
                onChange={handleMetaKeywordChange}
                required
              // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
              />
            </label>
            <label className="grid pr-6 mt-4">
              Meta Image
              {metaphoto ? (null) : (

                <div className="flex items-center mb-2">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={temp}
                      alt="Meta Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
              }
              {metaphoto ? (
                <div className="flex gap-2 mt-2 items-center">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(metaphoto)}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Button color="error" variant="contained" size="small"
                      onClick={handleMetaPhotoRemove}
                    >
                      Replace
                    </Button>
                  </div>
                </div>
              ) :
                (
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleMetaPhotoChange}
                    class="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[20rem]"
                    style={{ border: "2px solid #e6f7fe" }}
                  />
                )}
            </label>
          </div>
          <button
            className="rounded mt-10 bg-lime-600 hover:bg-lime-700"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
          >
            Save
          </button>
          <Link to="/home/projectList">
            <button
              className="rounded mt-10 bg-black hover:bg-gray-800"
              style={{
                width: "170px",
                height: "55px",
                color: "white",
                marginLeft: "30px",
              }}
            >
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditShowcase;
