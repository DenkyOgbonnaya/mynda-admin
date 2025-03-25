import React from "react";
import BreadCrumb from "Common/BreadCrumb";

import "flatpickr/dist/flatpickr.css";

const FormTimePicker = () => {
  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Time Picker" pageTitle="Forms" />
      </div>
    </React.Fragment>
  );
};

export default FormTimePicker;
