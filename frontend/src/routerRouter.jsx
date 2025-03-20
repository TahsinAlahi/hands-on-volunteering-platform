import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import ErrorPage from "./pages/ErrorPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CreateEventPage = lazy(() => import("./pages/CreateEventPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const HelpRequests = lazy(() => import("./pages/HelpRequests"));
const HelpDetailsPage = lazy(() => import("./pages/HelpDetailsPage"));

// eslint-disable-next-line no-unused-vars
const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(HomePage),
      },
      {
        path: "login",
        element: withSuspense(LoginPage),
      },
      {
        path: "signup",
        element: withSuspense(SignupPage),
      },
      {
        path: "profile",
        element: <ProtectedRoute>{withSuspense(ProfilePage)}</ProtectedRoute>,
      },
      {
        path: "create-event",
        element: (
          <ProtectedRoute>{withSuspense(CreateEventPage)}</ProtectedRoute>
        ),
      },
      {
        path: "events",
        element: <ProtectedRoute>{withSuspense(EventsPage)}</ProtectedRoute>,
      },
      {
        path: "help-requests",
        element: <ProtectedRoute>{withSuspense(HelpRequests)}</ProtectedRoute>,
      },
      {
        path: "help-requests/:id",
        element: (
          <ProtectedRoute>{withSuspense(HelpDetailsPage)}</ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(ErrorPage),
  },
]);

export default router;
