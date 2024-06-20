import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { Grid } from "react-loader-spinner";
// import { updateCategoryList } from "../../User_Management/features/userSlice";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { updateCategory_sm } from "../../User_Management/features/userSlice";

const EditCategoryList_PSM = ({ setExpand, setActiveTab }) => {
    setExpand("showcaseManagement");
    setActiveTab("crud");
    const head = "Edit Category List";
    const dispatch = useDispatch();
    const location = useLocation();
    const preEdit = location.state;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(preEdit.ctg_name);
    const [images, setImages] = useState([]);
    console.log(title);
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("clicked")
        const formData = new FormData();
        formData.append("ctg_name", title);
        formData.append("cid", preEdit.cid);
        images.forEach((image, index) => {
            formData.append(`ctg_photo`, image);
        });
        console.log(images[0]);
        setLoading(true);
        await dispatch(updateCategory_sm(formData));
        setLoading(false);
        navigate('/home/crud_category')
        window.location.reload()
    };
    const handlePhotoUpload = (event) => {
        const files = event.target.files;
        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }
        setImages(uploadedImages);
    };

    console.log(images)
    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        // fileInputRef.current.value = newImages.length;
    };

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
      ) : null}s
            <div className="flex fixed z-10">
                <TopHeader className="fixed" head={head} />
            </div>

            <div className=" ml-72 mb-10 relative" style={{ marginTop: "120px" }}>
                <form onSubmit={handleSubmit}>
                    <label className="grid mt-5">
                        Category Name
                        <input
                            type="text"
                            placeholder="Enter Title"
                            id="title"
                            className="rounded w-[100vh] outline-none"
                            style={{
                                height: "50px",
                                paddingLeft: "10px",
                                backgroundColor: "#e5ecff",
                                marginTop: "5px",
                                fontSize: "15px",
                            }}
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </label>

                    <label className="grid pr-6" style={{ marginTop: "20px" }}>
                        Photos
                        <div style={{ width: "600px", marginTop: "10px" }}>
                            {images && images.length > 0 ? (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={image.name}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            <button
                                                className="absolute top-0 text-white"
                                                style={{ right: 46 }}
                                                onClick={() => handleRemoveImage(index)}>
                                                <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    style={{
                                        height: "48px",
                                        width: "590px",
                                        paddingLeft: "0px",
                                        border: "2px solid 	#e6f7fe",
                                        marginTop: "5px",
                                        fontSize: "14px",
                                    }}
                                     className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoUpload}
                                    placeholder=""
                                />
                            )}
                            {images.length > 0 ? (null) : (
                                <div className="grid grid-cols-6 gap-2">
                                    <div className="relative">
                                        <img
                                            src={preEdit.photo}
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
                        </div>
                    </label>

                    {/* <div> */}
                    <button
                        className="rounded mt-10 bg-lime-600 hover:bg-lime-700"
                        style={{
                            width: "170px",
                            height: "55px",
                            color: "white",
                        }}
                        type="submit"
                        onSubmit={handleSubmit}>
                        Save
                    </button>
                    <Link to='/home/crud_category'>
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

export default EditCategoryList_PSM;
