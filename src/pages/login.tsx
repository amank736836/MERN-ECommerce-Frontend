import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loaders/Loader";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { responseToast } from "../utils/features";

const Login = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const loginHandler = async () => {
    setLoading(true);
    const toastId = toast.loading("Signing in...");
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
        shippingInfo: {
          address: "",
          city: "",
          state: "",
          country: "",
          pinCode: "",
        },
      });

      responseToast(res, navigate, "/");
    } catch (error) {
      console.error(error);
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return loading ? (
    <div>
      <center>
        <h1>Sign in with Google in the popup window</h1>
      </center>
      <Loader />
    </div>
  ) : (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select
            title="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
