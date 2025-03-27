import React, { useState } from "react";

const Policy: React.FC = () => {
  const [activeTab, setActiveTab] = useState("terms");

  const renderContent = () => {
    switch (activeTab) {
      case "terms":
        return (
          <div>
            <h1>Virtuo Store</h1>
            <h2>Terms & Conditions</h2>

            <h3>
              By using Virtuo Store, you agree to the following terms and
              conditions:
            </h3>

            <h3>Service Agreement:</h3>
            <p>
              Virtuo Store provides e-commerce services as per the listed
              product details.
            </p>
            <p>
              We reserve the right to update prices and product availability at
              any time.
            </p>

            <h3>Payments:</h3>
            <p>
              All payments must be made in advance through our secure payment
              system.
            </p>
            <p>Failure to complete payment may result in order cancellation.</p>

            <h3>Shipping & Delivery:</h3>
            <p>
              Orders are processed within 2-5 business days and delivered within
              5-10 days across India.
            </p>
            <p>
              We are not responsible for delays caused by shipping carriers.
            </p>

            <h3>Returns & Refunds:</h3>
            <p>
              Refunds are applicable only for defective or incorrect products.
            </p>
            <p>
              Customers must initiate refund requests within 7 days of delivery.
            </p>

            <h3>Intellectual Property:</h3>
            <p>
              All website content, including images and text, is the property of
              Virtuo Store.
            </p>
            <p>
              Unauthorized use or reproduction of any content is strictly
              prohibited.
            </p>

            <h3>Limitation of Liability:</h3>
            <p>
              We are not responsible for third-party service failures (e.g.,
              payment gateways, shipping providers).
            </p>
            <p>
              We do not guarantee specific product results or performance
              outcomes.
            </p>

            <h3>Termination:</h3>
            <p>
              We reserve the right to cancel orders or restrict access if a
              customer violates our policies.
            </p>

            <p>
              By using our services, you agree to these terms. For any
              questions, contact us at support@virtuostore.in.
            </p>
          </div>
        );
      case "privacy":
        return (
          <div>
            <div>
              <h1>Virtuo Store</h1>

              <h2>Privacy Policy</h2>

              <p>
                At <strong>Virtuo Store</strong>, we value your privacy and are
                committed to protecting your personal data. This policy outlines
                how we collect, use, and protect your information.
              </p>

              <h3>Information We Collect:</h3>
              <p>
                - Personal details (name, email, contact number) when you place
                an order or contact us.
              </p>
              <p>
                - Payment details (processed securely via third-party payment
                gateways).
              </p>
              <p>
                - Website usage data (collected via cookies for analytics
                purposes).
              </p>

              <h3>How We Use Your Information:</h3>
              <p>- To process your orders and payments.</p>
              <p>
                - To communicate with you regarding your purchases and customer
                support.
              </p>
              <p>- To improve our website, services, and marketing efforts.</p>

              <h3>Data Security:</h3>
              <p>
                - We implement industry-standard security measures to protect
                your data.
              </p>
              <p>
                - We do not sell or share your personal information with third
                parties, except when required by law.
              </p>

              <h3>Cookies & Tracking:</h3>
              <p>
                - We use cookies to enhance user experience and track website
                performance.
              </p>
              <p>- You can disable cookies in your browser settings.</p>

              <h3>Third-Party Services:</h3>
              <p>
                - We may use third-party tools such as payment gateways and
                analytics services, which have their own privacy policies.
              </p>
              <p>
                - We are not responsible for third-party data handling
                practices.
              </p>

              <h3>Children’s Privacy:</h3>
              <p>
                - Our services are not intended for children under the age of
                13.
              </p>
              <p>
                - We do not knowingly collect personal information from
                children.
              </p>

              <h3>Changes to Privacy Policy:</h3>
              <p>- We reserve the right to update this policy at any time.</p>
              <p>
                - Changes will be posted on this page, and continued use of our
                services implies acceptance.
              </p>

              <h3>Contact Us</h3>
              <p>
                If you have any privacy-related concerns, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> support@virtuostore.in
              </p>
              <p>
                <strong>Website:</strong> www.virtuostore.in
              </p>
            </div>
          </div>
        );

      case "refund":
        return (
          <div>
            <h1>Virtuo Store</h1>

            <h2>Refund Policy</h2>

            <p>
              At <strong>Virtuo Store</strong>, we strive to provide the best
              shopping experience for our customers. If you wish to request a
              refund, please review our policy below.
            </p>

            <h3>Cancellation & Refund Eligibility:</h3>
            <p>
              - Orders can be canceled within <strong>12 hours</strong> of
              purchase for a full refund.
            </p>
            <p>
              - Once an order has been shipped, it is not eligible for
              cancellation.
            </p>
            <p>
              - Refunds are only applicable for defective, damaged, or incorrect
              products received.
            </p>

            <h3>Process for Refund:</h3>
            <p>
              - To request a refund, email us at{" "}
              <strong>support@virtuostore.in</strong> with your order details
              and reason for the refund.
            </p>
            <p>
              - Refunds will be processed within{" "}
              <strong>7-10 business days</strong> via the original payment
              method.
            </p>
            <p>
              - In case of a damaged or incorrect product, customers may be
              required to share images or return the item.
            </p>

            <h3>Exceptions:</h3>
            <p>
              - No refunds will be issued for used, washed, or altered products.
            </p>
            <p>
              - Digital products, gift cards, and final sale items are
              non-refundable.
            </p>
            <p>
              - Shipping fees are non-refundable unless the refund is due to an
              error on our part.
            </p>

            <h3>Exchange Policy:</h3>
            <p>
              - If you receive a defective or incorrect item, we offer free
              replacements.
            </p>
            <p>
              - Exchanges must be requested within <strong>7 days</strong> of
              receiving the order.
            </p>

            <h3>Contact Us:</h3>
            <p>
              If you have any questions regarding our refund policy, please
              contact us at:
            </p>
            <p>
              <strong>Email:</strong> support@virtuostore.in
            </p>
            <p>
              <strong>Website:</strong> www.virtuostore.in
            </p>
          </div>
        );
      case "shipping":
        return (
          <div>
            <h1>Virtuo Store</h1>

            <h2>Shipping Policy</h2>

            <p>
              Thank you for shopping with <strong>Virtuo Store</strong>. We are
              committed to delivering your orders in a timely and secure manner.
              Please review our shipping policy below.
            </p>

            <h3>Delivery Timeline</h3>
            <p>
              - Orders are processed within <strong>24-48 hours</strong> of
              confirmation.
            </p>
            <p>
              - Standard delivery across India takes{" "}
              <strong>5-10 business days</strong> from the date of dispatch.
            </p>
            <p>
              - Express shipping (if available) takes{" "}
              <strong>2-5 business days</strong>.
            </p>
            <p>
              - Unforeseen delays due to weather, holidays, or courier issues
              will be communicated to you.
            </p>

            <h3>Shipping Charges</h3>
            <p>- Free shipping on orders above ₹999.</p>
            <p>
              - A standard shipping fee of ₹50 applies to orders below ₹999.
            </p>
            <p>
              - Additional charges may apply for express shipping, which will be
              displayed at checkout.
            </p>

            <h3>Delivery Partners</h3>
            <p>
              - We ship orders via leading courier services such as Bluedart,
              DTDC, and Delhivery.
            </p>
            <p>
              - Tracking details will be provided once the order is shipped.
            </p>

            <h3>Order Processing</h3>
            <p>
              - Once your order is confirmed, you will receive a confirmation
              email.
            </p>
            <p>
              - After dispatch, you will receive an email with tracking details.
            </p>

            <h3>Order Modifications & Cancellations</h3>
            <p>
              - Orders can be modified or canceled within{" "}
              <strong>12 hours</strong> of placement.
            </p>
            <p>- Once an order is shipped, cancellations are not allowed.</p>

            <h3>Lost or Damaged Shipments</h3>
            <p>
              - If your order is lost or damaged during transit, please contact
              us at <strong>support@virtuostore.in</strong> within 48 hours of
              delivery.
            </p>
            <p>- We will initiate an investigation and provide a resolution.</p>

            <h3>International Shipping</h3>
            <p>- Currently, we only ship within India.</p>

            <h3>Contact Us</h3>
            <p>
              If you have any questions regarding our shipping policy, please
              contact us at:
            </p>
            <p>
              <strong>Email:</strong> support@virtuostore.in
            </p>
            <p>
              <strong>Website:</strong> www.virtuostore.in
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>About Us</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("terms")}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: activeTab === "terms" ? "#007BFF" : "#f0f0f0",
            color: activeTab === "terms" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Terms and Conditions
        </button>
        <button
          onClick={() => setActiveTab("refund")}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: activeTab === "refund" ? "#007BFF" : "#f0f0f0",
            color: activeTab === "refund" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Refund Policy
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: activeTab === "privacy" ? "#007BFF" : "#f0f0f0",
            color: activeTab === "privacy" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          style={{
            padding: "10px",
            backgroundColor: activeTab === "shipping" ? "#007BFF" : "#f0f0f0",
            color: activeTab === "shipping" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Shipping Policy
        </button>
      </div>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        {renderContent()}
      </div>
      <div
        className="footer"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <p>Virtuo Store &copy; 2025 | All rights reserved.</p>
      </div>
    </div>
  );
};

export default Policy;
