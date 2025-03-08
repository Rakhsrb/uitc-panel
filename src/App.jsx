import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import AddAdmin from "./pages/AddPages/AddAdmin";
import AddCourses from "./pages/AddPages/AddCourses";
import AddProjects from "./pages/AddPages/AddProjects";
import AddServices from "./pages/AddPages/AddServices";
import AddWorker from "./pages/AddPages/AddWorker";
import { Admins } from "./pages/Admins";
import { Courses } from "./pages/Courses";
import { Project } from "./pages/Details/Project";
import EditAdmin from "./pages/EditPages/EditAdmin";
import EditCourse from "./pages/EditPages/EditCourse";
import EditProject from "./pages/EditPages/EditProject";
import EditService from "./pages/EditPages/EditServices";
import EditWorker from "./pages/EditPages/EditWorker";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Services } from "./pages/Services";
import { Team } from "./pages/Team";
import { Axios } from "./middlewares/Axios";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
} from "./toolkit/UserSlicer";
import { Loading } from "./pages/Loading";
function App() {
  const { isAuth, isPending } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserPending());
        const { data } = await Axios.get("admin/me");
        dispatch(getUserSuccess(data.data));
      } catch (error) {
        dispatch(getUserError(""));
      }
    };
    fetchData();
  }, [dispatch]);

  const router = useMemo(() => {
    if (isPending) {
      return createBrowserRouter([
        {
          path: "/",
          element: <Loading />,
        },
      ]);
    }
    if (isAuth) {
      return createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Projects />,
            },
            {
              path: "/courses",
              element: <Courses />,
            },
            {
              path: "/services",
              element: <Services />,
            },
            {
              path: "/projects",
              element: <Projects />,
            },
            {
              path: "/admins",
              element: <Admins />,
            },
            {
              path: "/team",
              element: <Team />,
            },
            //add paths
            {
              path: "/add-admin",
              element: <AddAdmin />,
            },
            {
              path: "/add-course",
              element: <AddCourses />,
            },
            {
              path: "/add-portfolio",
              element: <AddProjects />,
            },
            {
              path: "/add-service",
              element: <AddServices />,
            },
            {
              path: "/add-worker",
              element: <AddWorker />,
            },
            //edit paths
            {
              path: "/edit-admin/:id",
              element: <EditAdmin />,
            },
            {
              path: "/edit-course/:id",
              element: <EditCourse />,
            },
            {
              path: "/edit-portfolio/:id",
              element: <EditProject />,
            },
            {
              path: "/edit-service/:id",
              element: <EditService />,
            },
            {
              path: "/edit-worker/:id",
              element: <EditWorker />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
            // Details
            {
              path: "/projects/:id",
              element: <Project />,
            },
          ],
        },
      ]);
    } else {
      return createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]);
    }
  }, [isAuth, isPending]);

  return <RouterProvider router={router} />;
}

export default App;
