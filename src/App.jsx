import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import AddAdmin from "./pages/AddPages/AddAdmin";
import AddCourses from "./pages/AddPages/AddCourses";
import AddProjects from "./pages/AddPages/AddProjects";
import AddServices from "./pages/AddPages/AddServices";
import AddWorker from "./pages/AddPages/AddWorker";
import { Admins } from "./pages/Admins";
import { Courses } from "./pages/Courses";
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
import Carousel from "./pages/Carousel";

const ProtectedRoute = () => {
  const { isAuth, isPending } = useSelector((state) => state.user);

  if (isPending) {
    return <Loading />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

const PublicRoute = () => {
  const { isAuth, isPending } = useSelector((state) => state.user);

  if (isPending) {
    return <Loading />;
  }

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

function App() {
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

  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Carousel />,
            },
            {
              path: "courses",
              element: <Courses />,
            },
            {
              path: "services",
              element: <Services />,
            },
            {
              path: "projects",
              element: <Projects />,
            },
            {
              path: "admins",
              element: <Admins />,
            },
            {
              path: "team",
              element: <Team />,
            },
            // add paths
            {
              path: "add-admin",
              element: <AddAdmin />,
            },
            {
              path: "add-course",
              element: <AddCourses />,
            },
            {
              path: "add-portfolio",
              element: <AddProjects />,
            },
            {
              path: "add-service",
              element: <AddServices />,
            },
            {
              path: "add-worker",
              element: <AddWorker />,
            },
            // edit paths
            {
              path: "edit-admin/:id",
              element: <EditAdmin />,
            },
            {
              path: "edit-course/:id",
              element: <EditCourse />,
            },
            {
              path: "edit-portfolio/:id",
              element: <EditProject />,
            },
            {
              path: "edit-service/:id",
              element: <EditService />,
            },
            {
              path: "edit-worker/:id",
              element: <EditWorker />,
            },
          ],
        },
      ],
    },
    // Public routes
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    // Catch-all route
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
