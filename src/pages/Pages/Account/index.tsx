import React from "react";
import AccountInfo from "./AccountInfo";
import { Nav } from "Common/Components/Tab/Nav";
import Tab from "Common/Components/Tab/Tab";
import OverviewTabs from "./OverviewTabs";
import Documents from "./Documents";
import ProjectsTabs from "./ProjectsTabs";
import Followers from "./Followers";
import Guarantor from "./Gaurantor";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";
import AgencyOverviewTabs from "./AgencyOverviw";
import EmployerOverviewTabs from "./EmployerOverview";
import LaboratoryOverviewTabs from "./LaboratoryOverview";

const Account = () => {
  const params = useParams();
  const { data, isLoading } = useUserProfile(params.id!);

  document.title = "Account | Tailwick - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <Tab.Container defaultActiveKey="overviewTabs">
        <div className="mt-1 -ml-3 -mr-3 rounded-none card">
          <AccountInfo className="card-body !px-2.5" />
          <div className="card-body !px-2.5 !py-0">
            <Nav className="flex flex-wrap w-full text-sm font-medium text-center nav-tabs">
              <Nav.Item eventKey="overviewTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="overviewTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 dark:group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Overview
                </a>
              </Nav.Item>
              {
                data?.data?.mynda &&
              
              <Nav.Item eventKey="documentsTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="documentsTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 dark:group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Guarantor
                </a>
              </Nav.Item>
}
              {
                data?.data?.mynda &&
              
              <Nav.Item eventKey="projectsTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="projectsTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 dark:group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Education
                </a>
              </Nav.Item>
}
              {
                data?.data?.mynda &&
              
              <Nav.Item eventKey="followersTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="followersTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 dark:group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Work Experience
                </a>
              </Nav.Item>
}
            </Nav>
          </div>
        </div>
        <Tab.Content className="tab-content">
          {data?.data?.mynda && (
            <Tab.Pane eventKey="overviewTabs" id="overviewTabs">
              <OverviewTabs />
            </Tab.Pane>
          )}
          {data?.data?.agency && (
            <Tab.Pane eventKey="overviewTabs" id="overviewTabs">
              <AgencyOverviewTabs />
            </Tab.Pane>
          )}
           {data?.data?.employer && (
            <Tab.Pane eventKey="overviewTabs" id="overviewTabs">
              <EmployerOverviewTabs />
            </Tab.Pane>
          )}
           {data?.data?.laboratory && (
            <Tab.Pane eventKey="overviewTabs" id="overviewTabs">
              <LaboratoryOverviewTabs />
            </Tab.Pane>
          )}
          {data?.data.mynda && (
            <Tab.Pane eventKey="documentsTabs" id="documentsTabs">
              <Guarantor />
            </Tab.Pane>
          )}
          {data?.data?.mynda && (
            <Tab.Pane eventKey="projectsTabs" id="projectsTabs">
              <Education />
            </Tab.Pane>
          )}
          {data?.data.mynda && (
            <Tab.Pane eventKey="followersTabs" id="followersTabs">
              <WorkExperience />
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </React.Fragment>
  );
};

export default Account;
