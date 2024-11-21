import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import toast from "react-hot-toast";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "0123456789";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const copyText = async (coupon: string) => {
    await navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerating(true);
    if (prefix.length > size) {
      toast.error("Prefix length should be less than coupon length");
    } else if (
      !includeNumbers &&
      !includeCharacters &&
      !includeSymbols &&
      prefix.length != size
    ) {
      toast.error("Select at least one option");
    } else {
      let entireString: string = "";
      if (includeNumbers) entireString += allNumbers;
      if (includeCharacters) entireString += allLetters;
      if (includeSymbols) entireString += allSymbols;

      let result: string = prefix;
      const loopLength: number = size - prefix.length;
      for (let i = 0; i < loopLength; i++) {
        const randomNum: number = ~~(Math.random() * entireString.length);
        result += entireString[randomNum];
      }
      setCoupon(result);
    }
    setGenerating(false);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboardAppContainer">
        <h1>Coupon</h1>
        <section>
          <form
            className="couponForm"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />
            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />
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
