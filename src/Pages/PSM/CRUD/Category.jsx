import React from "react";
import { useEffect, useState } from "react";
// import { Grid } from "react-loader-spinner";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AllCategories_sm, DeleteCategoryCRUD, get_Category } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { url1 } from "../../../UI/port";

// { catId, catName } this is the props for action
const Action = ({ photo, catName, cid }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  const handleClick = () => {
    console.log(catName);
    dispatch(get_Category(cid));
    const data = {
      ctg_name: catName,
      cid: cid,
      photo: photo,
    };
    Navigate("/home/editCategoryListpsm", { state: data });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteCategoryCRUD(cid))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {LuserData.role == 'admin' || LuserData.role == 'editor' ? (<>
        <img src={edit} onClick={handleClick} alt="edit" />
        <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
      </>
      ) : (<div>Not accessible</div>)}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">Are you sure you want to delete {catName}?</p>
              <div className="p-5">
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                  Delete
                </Button>
                <Button onClick={handleCancelDelete} color="inherit">
                  Cancel
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

const Photo = ({ prop }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={prop} alt="Photo" />
    </div>
  );
};

const PSM_CategoryList = ({ setActiveTab, setExpand }) => {
  const head = "Category List";
  setExpand("showcaseManagement");
  setActiveTab("crud");
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addNewCategoryListpsm");
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // const productData = useSelector((state) => state.userManagement.mpm_category);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(AllCategories_sm());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);


  const columns = [
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Category Name",
      accessor: "category",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const xyz = useSelector((state) => state.userManagement.AllCategories_sm)

  const data = xyz.map((user) => ({
    photo: <Photo prop={user.ctg_photo} />,
    category: user.ctg_name,
    action: <Action cid={user.cid} photo={user.ctg_photo} catName={user.ctg_name} />,
  }));

  const blackButtonText = "Export All";
  const greenButtonText = "Add New";

  // Number of Pages to be display on a single page.
  const pageSize = 4;

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
      <div className="  ml-72 mt-28 w-[75vw] relative">
        <Table
          columns={columns}
          data={data}
          pageSize={pageSize}
          blackButtonText={
            <a href={`${url1}/exportAllCategories_sm`}>
              {blackButtonText}
            </a>
          }
          greenButtonText={LuserData.role === "admin" || LuserData.role === "editor" ? greenButtonText : ""}
          greenClicked={greenClicked}
        />
      </div>
    </div>
  );
};

export default PSM_CategoryList;
