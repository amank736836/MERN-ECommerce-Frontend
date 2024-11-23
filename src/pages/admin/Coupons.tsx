import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCopy, FaPlus, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import CouponTable, {
  CouponDataType,
} from "../../components/admin/Tables/CouponTable";
import Loader from "../../components/Loaders/Loader";
import { SkeletonLoader } from "../../components/Loaders/SkeletonLoader";
import {
  useAllCouponsQuery,
  useDeleteCouponMutation,
} from "../../redux/api/paymentAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";
import { BiCopy } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { GoCopy } from "react-icons/go";
import { GrCopy } from "react-icons/gr";
import { ImCopy } from "react-icons/im";
import { IoCopy } from "react-icons/io5";
import { LuClipboardCopy, LuCopy } from "react-icons/lu";
import { PiCopy } from "react-icons/pi";
import { CgCopy } from "react-icons/cg";
import { LiaCopy } from "react-icons/lia";
import { RxCopy } from "react-icons/rx";
import { TbCopy } from "react-icons/tb";

const Discount = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllCouponsQuery(user?._id!);
  const [loading, setLoading] = useState<boolean>(false);

  const [coupons, setCoupons] = useState<CouponDataType[]>([]);

  const [deleteCoupon] = useDeleteCouponMutation();

  const navigate = useNavigate();

  const deleteHandler = (couponId: string) => async () => {
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

  const copyText = async (coupon: string) => {
    await navigator.clipboard.writeText(coupon);
    toast.success("Coupon code copied to clipboard");
  };

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch products");
    }
    if (data) {
      setCoupons(
        data.coupons.map((coupon) => ({
          _id: coupon._id,
          code: coupon.code,
          amount: coupon.amount,
          copy: (
            <code className="couponCode">
              {coupon.code}{" "}
              <span onClick={() => copyText(coupon.code)}>
                <LuClipboardCopy />
              </span>
            </code>
          ),
          action1: <Link to={`/admin/discount/${coupon._id}`}>Manage</Link>,
          action2: (
            <button onClick={deleteHandler(coupon._id)} disabled={loading}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [isError, error, data]);

  if (isError || error) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (loading) return <Loader />;

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        {isLoading ? (
          <SkeletonLoader
            height="4rem"
            width="100%"
            flexDir="column"
            padding="1rem"
            margin="4rem 0"
            length={12}
          />
        ) : coupons.length === 0 ? (
          <h2 className="noData">No Discount Coupon Found</h2>
        ) : (
          <CouponTable data={coupons} />
        )}
      </main>
      <Link to="/admin/discount/add" className="createProductBtn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
