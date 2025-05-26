import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import AddAdmin from "./pages/AddPages/AddAdmin";
import AddCourses from "./pages/AddPages/AddCourses";
import AddProject from "./pages/AddPages/AddProjects";
import AddServices from "./pages/AddPages/AddServices";
import AddStaff from "./pages/AddPages/AddStaff";
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
import { Staffs } from "./pages/Staffs";
import { Axios } from "./middlewares/Axios";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
} from "./toolkit/UserSlicer";
import { Loading } from "./pages/Loading";
import Carousel from "./pages/Carousel";

function App() {
  const { isAuth, isPending } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserPending());
        const response = await Axios.get("admin/me");
        dispatch(getUserSuccess(response.data));
      } catch (error) {
        dispatch(getUserError(""));
      }
    };
    fetchData();
  }, [dispatch]);

  if (isPending) {
    return <Loading />;
  }

  const privateRoutes = [
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
          path: "staffs",
          element: <Staffs />,
        },
        {
          path: "admins/new",
          element: <AddAdmin />,
        },
        {
          path: "courses/new",
          element: <AddCourses />,
        },
        {
          path: "projects/new",
          element: <AddProject />,
        },
        {
          path: "services/new",
          element: <AddServices />,
        },
        {
          path: "staffs/new",
          element: <AddStaff />,
        },
        {
          path: "admins/edit/:id",
          element: <EditAdmin />,
        },
        {
          path: "courses/edit/:id",
          element: <EditCourse />,
        },
        {
          path: "projects/edit/:id",
          element: <EditProject />,
        },
        {
          path: "services/edit/:id",
          element: <EditService />,
        },
        {
          path: "staffs/edit/:id",
          element: <EditWorker />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const publicRoutes = [
    { path: "/", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ];

  const router = createBrowserRouter(isAuth ? privateRoutes : publicRoutes);

  return <RouterProvider router={router} />;
}

export default App;
