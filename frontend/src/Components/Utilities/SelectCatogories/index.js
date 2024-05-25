import React, { useEffect } from "react";
import { Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../Reducers/applicationService/actions/applicationService";
import { setIsGettingCategories } from "../../../Reducers/applicationService/applicationSlice";

const SelectCategories = ({ setActiveCategory }) => {
  const categories = useSelector((state) => state.application.categories);
  const isGettingCategories = useSelector(
    (state) => state.application.isGettingCategories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(getAllCategories());
        if (response && response.status) {
          dispatch(setIsGettingCategories(true));
        } else if (response && response.message) {
          message.error("oops");
        } else {
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsGettingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (value) => {
    setActiveCategory(value);
    console.log(`selected ${value}`);
  };

  return (
    <Select
      defaultValue={isGettingCategories ? "Loading..." : null}
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={categories}
    />
  );
};

export default SelectCategories;
