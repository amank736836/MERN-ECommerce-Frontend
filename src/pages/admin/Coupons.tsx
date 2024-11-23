import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { LuClipboardCopy } from "react-icons/lu";
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

const Discount = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllCouponsQuery(user?._id!);
  const [loading, setLoading] = useState<boolean>(false);

  const [coupons, setCoupons] = useState<CouponDataType[]>([]);

  const [deleteCoupon] = useDeleteCouponMutation();

  const navigate = useNavigate();

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
          action1: <Link to={`/admin/coupon/${coupon._id}`}>Manage</Link>,
          action2: (
            <button
              onClick={() => deleteHandler(coupon._id)}
              disabled={loading}
            >
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
      <Link to="/admin/coupon/add" className="createProductBtn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
