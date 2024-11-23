import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import Loader from "../../../components/Loaders/Loader";
import { SkeletonLoader } from "../../../components/Loaders/SkeletonLoader";
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
  useUpdateCouponMutation,
} from "../../../redux/api/paymentAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { responseToast } from "../../../utils/features";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "0123456789";
const allSymbols = "!@#$%^&*()_+";

const defaultCoupon = {
  code: "",
  amount: 0,
  prefix: "",
  postfix: "",
  includeNumbers: false,
  includeCharacters: false,
  includeSymbols: false,
  size: 8,
};

const CouponManagement = () => {
  const params = useParams();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useGetCouponQuery({
    id: user?._id!,
    couponId: params.id!,
  });

  const {
    code,
    amount,
    size,
    prefix,
    postfix,
    includeNumbers,
    includeCharacters,
    includeSymbols,
  } = data?.coupon || defaultCoupon;

  const [sizeUpdate, setSizeUpdate] = useState<number>(size);
  const [prefixUpdate, setPrefixUpdate] = useState<string>(prefix);
  const [postfixUpdate, setPostfixUpdate] = useState<string>(postfix);
  const [amountUpdate, setAmountUpdate] = useState<number>(amount);

  const [includeNumbersUpdate, setIncludeNumbersUpdate] =
    useState<boolean>(includeNumbers);
  const [includeCharactersUpdate, setIncludeCharactersUpdate] =
    useState<boolean>(includeCharacters);
  const [includeSymbolsUpdate, setIncludeSymbolsUpdate] =
    useState<boolean>(includeSymbols);

  const [couponUpdate, setCouponUpdate] = useState<string>(code);

  useEffect(() => {
    if (data) {
      setSizeUpdate(data.coupon.size);
      setPrefixUpdate(data.coupon.prefix);
      setPostfixUpdate(data.coupon.postfix);
      setAmountUpdate(data.coupon.amount);
      setIncludeNumbersUpdate(data.coupon.includeNumbers);
      setIncludeCharactersUpdate(data.coupon.includeCharacters);
      setIncludeSymbolsUpdate(data.coupon.includeSymbols);
    }
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch coupon");
    }
    if (couponUpdate) {
      setIsCopied(false);
    }
  }, [isError, error, data, couponUpdate]);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const copyText = async (coupon: string) => {
    await navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const [updateCoupon] = useUpdateCouponMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amountUpdate) {
      toast.error("Coupon value is required");
    } else if (amountUpdate <= 0) {
      toast.error("Coupon value should be greater than 0");
    } else if (prefixUpdate.length + postfixUpdate.length > sizeUpdate) {
      toast.error("Prefix length should be less than coupon length");
    } else if (!sizeUpdate || sizeUpdate < 8 || sizeUpdate > 25) {
      toast.error("Coupon length should be >= 8 and <= 25");
    } else {
      setLoading(true);
      const toastId = toast.loading("Generating Coupon...");
      try {
        if (sizeUpdate < 8) setSizeUpdate(8);
        let entireString: string = "";
        if (includeNumbersUpdate) entireString += allNumbers;
        if (includeCharactersUpdate) entireString += allLetters;
        if (includeSymbolsUpdate) entireString += allSymbols;
        if (
          !includeNumbersUpdate &&
          !includeCharactersUpdate &&
          !includeSymbolsUpdate
        ) {
          entireString = allLetters + allNumbers + allSymbols;
        }

        let result: string = prefixUpdate;
        const loopLength: number =
          sizeUpdate - prefixUpdate.length - postfixUpdate.length;
        for (let i = 0; i < loopLength; i++) {
          const randomNum: number = ~~(Math.random() * entireString.length);
          result += entireString[randomNum];
        }
        result += postfixUpdate;
        const res = await updateCoupon({
          id: user?._id!,
          couponId: params.id!,
          code: result,
          amount: amountUpdate,
          size: sizeUpdate,
          prefix: prefixUpdate,
          postfix: postfixUpdate,
          includeNumbers: includeNumbersUpdate,
          includeCharacters: includeCharactersUpdate,
          includeSymbols: includeSymbolsUpdate,
        });
        responseToast(res, navigate, "/admin/coupons");
        setCouponUpdate(result);
      } catch (error) {
        console.log(error);
        toast.error("Failed to update coupon");
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    }
  };

  const [deleteCoupon] = useDeleteCouponMutation();

  const deleteHandler = async (couponId: string) => {
    setLoading(true);
    const toastId = toast.loading("Deleting Coupon...");
    try {
      const res = await deleteCoupon({
        couponId,
        id: user?._id!,
      });
      responseToast(res, navigate, "/admin/coupons");
    } catch (error) {
      toast.error("Failed to delete coupon");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  if (isError || error) {
    return <Navigate to="/admin/coupons" />;
  }

  if (loading) return <Loader />;

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboardAppContainer">
        {isLoading ? (
          <SkeletonLoader length={1} width="400px" height="85vh" />
        ) : (
          <>
            <h1>Update Coupon</h1>
            <button
              className="productDeleteBtn"
              disabled={loading}
              onClick={() => deleteHandler(params.id!)}
            >
              <FaTrash />
            </button>
            <section>
              <form
                className="couponForm"
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <div>
                  <label htmlFor="prefix">Coupon Prefix</label>
                  <input
                    id="prefix"
                    type="text"
                    placeholder="Text for prefix"
                    value={prefixUpdate}
                    onChange={(e) => {
                      const newPrefix = e.target.value.toUpperCase();
                      if (newPrefix.length + postfixUpdate.length <= size) {
                        setPrefixUpdate(newPrefix);
                      }
                    }}
                    maxLength={sizeUpdate - postfixUpdate.length}
                  />
                </div>
                <div>
                  <label htmlFor="postfix">Coupon Postfix</label>
                  <input
                    id="postfix"
                    type="text"
                    placeholder="Text for postfix"
                    value={postfixUpdate}
                    onChange={(e) => {
                      const newPostfix = e.target.value.toUpperCase();
                      if (
                        prefixUpdate.length + newPostfix.length <=
                        sizeUpdate
                      ) {
                        setPostfixUpdate(newPostfix);
                      }
                    }}
                    maxLength={sizeUpdate - prefixUpdate.length}
                  />
                </div>
                <div>
                  <label htmlFor="size">
                    Coupon Length (Minimum 8, Maximum 25)
                  </label>
                  <input
                    id="size"
                    type="number"
                    placeholder="Coupon Length"
                    value={sizeUpdate}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 25)
                        setSizeUpdate(Number(e.target.value));
                    }}
                    max={25}
                  />
                </div>
                <div>
                  <label htmlFor="value">Coupon Value</label>

                  <input
                    id="value"
                    className="couponValue"
                    type="number"
                    placeholder="Coupon Value"
                    value={amountUpdate}
                    onChange={(e) => setAmountUpdate(Number(e.target.value))}
                  />
                </div>
                <fieldset>
                  <legend>Include</legend>
                  <input
                    type="checkbox"
                    id="numbers"
                    checked={includeNumbersUpdate}
                    onChange={() =>
                      setIncludeNumbersUpdate(!includeNumbersUpdate)
                    }
                  />
                  <label htmlFor="numbers">Numbers</label>

                  <input
                    type="checkbox"
                    id="characters"
                    checked={includeCharactersUpdate}
                    onChange={() =>
                      setIncludeCharactersUpdate(!includeCharactersUpdate)
                    }
                  />
                  <label htmlFor="characters">Characters</label>

                  <input
                    type="checkbox"
                    id="symbols"
                    checked={includeSymbolsUpdate}
                    onChange={() =>
                      setIncludeSymbolsUpdate(!includeSymbolsUpdate)
                    }
                  />
                  <label htmlFor="symbols">Symbols</label>
                </fieldset>

                <button disabled={loading} type="submit">
                  Generate
                </button>
              </form>

              {loading && <p>Generating Coupon...</p>}

              {couponUpdate && (
                <code className="couponCode">
                  {couponUpdate}{" "}
                  <span onClick={() => copyText(couponUpdate)}>
                    {isCopied ? "Copied" : "Copy"}
                  </span>
                </code>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default CouponManagement;
