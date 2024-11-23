import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { useNewCouponMutation } from "../../../redux/api/paymentAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "0123456789";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();

  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [postfix, setPostfix] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const [generating, setGenerating] = useState<boolean>(false);

  const [newCoupon] = useNewCouponMutation();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyText = async (coupon: string) => {
    await navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount === 0) {
      toast.error("Coupon value should be greater than 0");
    } else if (prefix.length + postfix.length > size) {
      toast.error("Prefix length should be less than coupon length");
    } else if (size > 25) {
      toast.error("Coupon length should be >= 8 and <= 25");
    } else {
      setGenerating(true);
      const toastId = toast.loading("Generating Coupon...");
      try {
        if (size < 8) setSize(8);
        let entireString: string = "";
        if (includeNumbers) entireString += allNumbers;
        if (includeCharacters) entireString += allLetters;
        if (includeSymbols) entireString += allSymbols;
        if (!includeNumbers && !includeCharacters && !includeSymbols) {
          entireString = allLetters + allNumbers + allSymbols;
        }

        let result: string = prefix;
        const loopLength: number = size - prefix.length - postfix.length;
        for (let i = 0; i < loopLength; i++) {
          const randomNum: number = ~~(Math.random() * entireString.length);
          result += entireString[randomNum];
        }
        result += postfix;
        const res = await newCoupon({
          _id: user?._id!,
          code: result,
          amount,
          size,
          prefix,
          postfix,
          includeNumbers,
          includeCharacters,
          includeSymbols,
        });
        responseToast(res, navigate, "/admin/coupons");
        setCoupon(result);
      } catch (error) {
        toast.error("Failed to generate coupon");
      } finally {
        setGenerating(false);
        toast.dismiss(toastId);
      }
    }
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboardAppContainer">
        <center>
        <h1>New Coupon</h1>
        </center>
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
                value={prefix}
                onChange={(e) => {
                  if (e.target.value.length + postfix.length <= size)
                    setPrefix(e.target.value.toUpperCase());
                }}
                maxLength={size - postfix.length}
              />
            </div>
            <div>
              <label htmlFor="postfix">Coupon Postfix</label>
              <input
                id="postfix"
                type="text"
                placeholder="Text for postfix"
                value={postfix}
                onChange={(e) => {
                  if (prefix.length + e.target.value.length <= size)
                    setPostfix(e.target.value.toUpperCase());
                }}
                maxLength={size - prefix.length}
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
                value={size}
                onChange={(e) => {
                  if (Number(e.target.value) <= 25 || e.target.value === "")
                    setSize(Number(e.target.value));
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
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                maxLength={size}
              />
            </div>
            <fieldset>
              <legend>Include</legend>
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <label htmlFor="numbers">Numbers</label>

              <input
                type="checkbox"
                id="characters"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters(!includeCharacters)}
              />
              <label htmlFor="characters">Characters</label>

              <input
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              <label htmlFor="symbols">Symbols</label>
            </fieldset>

            <button disabled={generating} type="submit">
              Generate
            </button>
          </form>

          {generating && <p>Generating Coupon...</p>}

          {coupon && (
            <code>
              {coupon}{" "}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
