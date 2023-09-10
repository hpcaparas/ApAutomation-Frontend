import { Suspense, useCallback, useEffect  } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { AuthProvider } from "../hooks/useAuth";
import EventBus from "../common/EventBus";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

export const AuthLayout = () => {
  const outlet = useOutlet();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { userPromise } = useLoaderData();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Suspense fallback={<LinearProgress />}>
      <Await
        resolve={userPromise}
        errorElement={<Alert severity="error">Something went wrong!</Alert>}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
