import React from "react";
import BreadCrumb from "Common/BreadCrumb";

// import InlineEditor from '@ckeditor/ckeditor5-build-inline';

const EditorInline = () => {
  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Inline Editor" pageTitle="Forms" />
      </div>
    </React.Fragment>
  );
};

export default EditorInline;
