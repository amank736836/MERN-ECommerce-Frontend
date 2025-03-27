import React, { useState } from "react";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState("terms");

  const renderContent = () => {
    switch (activeTab) {
      case "terms":
        return (
          <div>
            <h2>Terms and Conditions</h2>
            <h3>1. Introduction</h3>
            <p>
              Welcome to Virtuo Store ("we," "our," "us"). By accessing or
              using our website, you agree to be bound by these Terms and
              Conditions.
            </p>

            <h3>2. Eligibility</h3>
            <p>You must be at least 18 years old to use our services.</p>

            <h3>3. Account Responsibilities</h3>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </p>

            <h3>4. Product Information</h3>
            <p>
              We strive to ensure product descriptions are accurate, but we do
              not guarantee their completeness or error-free nature.
            </p>

            <h3>5. Pricing & Payments</h3>
            <p>
              Prices are subject to change without notice. Payments must be
              completed before order processing.
            </p>

            <h3>6. Limitation of Liability</h3>
            <p>
              We are not responsible for any indirect damages arising from the
              use of our website or products.
            </p>

            <h3>7. Governing Law</h3>
            <p>These terms are governed by the laws of [Your Country/State].</p>
          </div>
        );

      case "refund":
        return (
          <div>
            <h2>Refund Policy</h2>
            <h3>1. Eligibility for Refunds</h3>
            <ul>
              <li>
                Refunds are applicable only for defective or incorrect products.
              </li>
              <li>You must request a refund within [X] days of purchase.</li>
            </ul>

            <h3>2. Refund Process</h3>
            <ul>
              <li>Submit a refund request via [email/contact form].</li>
              <li>Refunds are processed within [X] business days.</li>
            </ul>

            <h3>3. Non-Refundable Items</h3>
            <p>
              Digital products, gift cards, and perishable goods are
              non-refundable.
            </p>

            <h3>4. Late or Missing Refunds</h3>
            <p>
              If you haven’t received a refund yet, check with your bank before
              contacting us.
            </p>
          </div>
        );
      case "privacy":
        return (
          <div>
            <h2>Privacy Policy</h2>
            <h3>1. Information We Collect</h3>
            <p>
              We collect personal information such as name, email, and payment
              details for order processing.
            </p>

            <h3>2. Use of Information</h3>
            <p>
              Your data is used to process orders, improve services, and for
              marketing purposes (with consent).
            </p>

            <h3>3. Data Protection</h3>
            <p>
              We implement security measures to protect your personal
              information.
            </p>

            <h3>4. Third-Party Sharing</h3>
            <p>
              We do not sell your data but may share it with trusted third-party
              service providers.
            </p>

            <h3>5. Your Rights</h3>
            <p>
              You can request access, correction, or deletion of your personal
              data at any time.
            </p>
          </div>
        );
      case "shipping":
        return (
          <div>
            <h2>Shipping Policy</h2>
            <h3>1. Shipping Timeframes</h3>
            <p>
              Orders are processed within [X] business days and delivered within
              [X] days.
            </p>

            <h3>2. Shipping Charges</h3>
            <p>Shipping fees depend on the destination and order size.</p>

            <h3>3. International Shipping</h3>
            <p>
              We offer worldwide shipping but are not responsible for customs
              delays.
            </p>

            <h3>4. Order Tracking</h3>
            <p>
              A tracking number will be provided once your order is shipped.
            </p>

            <h3>5. Lost or Damaged Items</h3>
            <p>
              If your order is lost or arrives damaged, contact us immediately
              for resolution.
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
    </div>
  );
};

export default About;
