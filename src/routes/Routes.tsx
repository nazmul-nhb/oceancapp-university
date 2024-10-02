import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import StudentPortal from "../pages/StudentPortal";
import CourseRegistration from "../pages/CourseRegistration";
import FacultyOverview from "../pages/FacultyOverview";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <StudentPortal />,
			},
			{
				path: "/faculty-overview",
				element: <FacultyOverview />,
			},
			{
				path: "/course-registration",
				element: <CourseRegistration />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
