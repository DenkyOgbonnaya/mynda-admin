import React from "react";
import BreadCrumb from "Common/BreadCrumb";

const EditorClassic = () => {
  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Classic Editor" pageTitle="Forms" />
      </div>
    </React.Fragment>
  );
};

export default EditorClassic;
