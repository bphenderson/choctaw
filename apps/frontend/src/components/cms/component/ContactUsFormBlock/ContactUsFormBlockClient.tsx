"use client";

import React, { useState } from "react";

export default function ContactUsFormBlockClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    contactPreference: "",
    message: "",
    interestedIn: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend or email API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
      {submitted ? (
        <p className="text-green-600 font-semibold">
          Thank you! We&apos;ll be in touch soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="zipCode"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="contactPreference"
            >
              Contact Preference
            </label>
            <select
              id="contactPreference"
              name="contactPreference"
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.contactPreference}
              onChange={handleChange}
            >
              <option value="">Select Contact Preference</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="interestedIn"
            >
              I&apos;m interested in...
            </label>
            <select
              id="interestedIn"
              name="interestedIn"
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.interestedIn}
              onChange={handleChange}
            >
              <option value="">I&apos;m interested in...</option>
              <option value="Make an Appointment">Make an Appointment</option>
              <option value="Checking Accounts">Checking Accounts</option>
              <option value="Treasury Management">Treasury Management</option>
              <option value="Merchant Services">Merchant Services</option>
              <option value="Remote Deposit Capture">
                Remote Deposit Capture
              </option>
              <option value="ACH Origination Services">
                ACH Origination Services
              </option>
              <option value="Savings Accounts">Savings Accounts</option>
              <option value="Checking and Savings">Checking and Savings</option>
              <option value="CDs">CDs</option>
              <option value="Money Market Accounts">
                Money Market Accounts
              </option>
              <option value="Retirement Plans">Retirement Plans</option>
              <option value="Home Equity Line of Credit">
                Home Equity Line of Credit
              </option>
              <option value="Home Mortgage">Home Mortgage</option>
              <option value="Escrow Services">Escrow Services</option>
              <option value="Business Accounts">Business Accounts</option>
              <option value="Business Loans">Business Loans</option>
              <option value="Commercial Real Estate Lending">
                Commercial Real Estate Lending
              </option>
              <option value="Nonprofit Banking">Nonprofit Banking</option>
              <option value="Education Banking">Education Banking</option>
              <option value="Youth Accounts">Youth Accounts</option>
              <option value="Health Savings Accounts">
                Health Savings Accounts
              </option>
              <option value="FMB Credit Card">FMB Credit Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-verdansk text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
