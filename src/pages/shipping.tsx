// import Razorpay from "razorpay";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import {
  useCreatePaymentMutation,
  useCreateRazorpayMutation,
  useVerifyPaymentMutation,
} from "../redux/api/paymentAPI";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { RazorpayResponse } from "../types/api-types";
import Loader from "../components/admin/Loader";

const Shipping = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const {
    cartItems,
    total,
    shippingInfo: { address, city, state, country, pinCode },
    subtotal,
    shippingCharges,
    tax,
    discount,
  } = useSelector((state: RootState) => state.cartReducer);

  const [createRazorpay] = useCreateRazorpayMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [newOrder] = useNewOrderMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    setLoading(true);
    try {
      const { data: razorpay } = await createRazorpay(total);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_ID,
        amount: razorpay?.amount,
        currency: razorpay?.currency,
        name: "Ecommerce Platform",
        description: "Test Transaction",
        handler: async (response: RazorpayResponse) => {
          try {
            const { data: verification } = await verifyPayment(response);

            if (!verification?.success) {
              throw new Error("Payment Verification failed");
            }

            const { data: order } = await newOrder({
              orderItems: cartItems,
              subtotal,
              shippingCharges,
              tax,
              discount,
              total,
              shippingInfo,
              user: user?._id!,
            });

            if (!order?.success) {
              throw new Error("Order Creation failed");
            }

            const { data: payment } = await createPayment({
              order: order?.orderId,
              user: user?._id!,
              paymentStatus: verification?.success ? "Success" : "Failed",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!payment?.success) {
              throw new Error("Payment Creation failed");
            }

            toast.success("Payment successful");
            navigate("/orders");
          } catch (error: any) {
            toast.error(error.message);
          }
        },
        modal: {
          ondismiss: function (response: any) {
            console.log(response);
          },
        },
        image: user?.photo,
        order_id: razorpay?.id,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        notes: {
          name: user?.name,
          email: user?.email,
          gender: user?.gender,
        },
        theme: {
          color: "#001d75",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="shipping">
      <button
        className="backBtn"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          navigate(-1);
          setLoading(false);
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
