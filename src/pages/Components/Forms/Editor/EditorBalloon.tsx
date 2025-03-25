import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";

// import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

const EditorBalloon = () => {
  const editorRef = useRef<any>(null);
  const [editor, setEditor] = useState(false); // Adjusted the initial state

  useEffect(() => {
    // Removed unnecessary import of CKEditor and ClassicEditor

    // editorRef.current = { CKEditor, BalloonEditor };
    setEditor(true);
  }, []);

  const [data, setData] = useState(`
        <p>Like all the great things on earth, traveling teaches us by example. Here are some of the most precious lessons I’ve learned over the years of traveling.</p>
        <h4>Appreciation of diversity</h4>
        <p>Getting used to an entirely different culture can be challenging. While it’s also nice to learn about cultures online or from books, nothing comes close to experiencing cultural diversity in person. You learn to appreciate each and every single one of the differences while you become more culturally fluid.</p>
        <p>Life doesn't allow us to execute every single plan perfectly. This especially seems to be the case when you travel. You plan it down to every minute with a big checklist. But when it comes to executing it, something always comes up and you’re left with your improvising skills. You learn to adapt as you go. Here’s how my travel checklist looks now:</p>
        <ul>
            <li>buy the ticket</li>
            <li><i>start your adventure</i></li>
        </ul>
    `);

  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Balloon Editor" pageTitle="Forms" />
      </div>
    </React.Fragment>
  );
};

export default EditorBalloon;
