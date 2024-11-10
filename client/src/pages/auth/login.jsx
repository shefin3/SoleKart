import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate a delay to check if page is loading (or use your own async operations)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set to false when the page is ready
    }, 2000); // Simulated 2-second delay, replace with real data fetching logic

    return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true when form is submitted

    dispatch(loginUser(formData)).then((data) => {
      setIsLoading(false); // Set loading state to false after response

      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/dashboard"); // Redirect after successful login
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  if (isLoading) return <Loading />; // Show loading spinner if still loading

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
