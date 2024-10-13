import axios from "axios";
// import Razorpay from "razorpay";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

const Shipping = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { name, email } = user!;

  const {
    shippingInfo: { address, city, state, country, pinCode },
  } = useSelector((state: RootState) => state.cartReducer);

  const [shippingInfo, setShippingInfo] = useState({
    address: address || "",
    city: city || "",
    state: state || "",
    country: country || "",
    pinCode: pinCode || "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { total } = useSelector((state: RootState) => state.cartReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    try {
      const {
        data: { id, currency, amount },
      } = await axios.post(
        `${server}/api/v1/payment/createRazorpay`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Ecommerce Platform",
        description: "Test Transaction",
        image:
          "https://lh3.googleusercontent.com/a/ACg8ocJJL8GSgTuPerpQuk77Q9WAKPqB7_tsidE2f22htvwgzvCzzTCehw=s96-c",
        order_id: id,
        callback_url:
          "https://mern-ecommerce-backend-1-1ek8.onrender.com/api/v1/payment/razorpayPaymentVerification",
        prefill: {
          name: name || "",
          email: email || "",
        },
        notes: {
          address: "Chitkara University",
        },
        theme: {
          color: "#001d75",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();

      razor.on("payment.failed", function (response: any) {
        toast.error(response.error.description);
      });

      razor.on("payment.success", function (response: any) {
        console.log(response);
        toast.success("Payment Successful");
        navigate("/orders");
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="shipping">
      <button
        className="backBtn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          title="Country"
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="canada">Canada</option>
        </select>
        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
