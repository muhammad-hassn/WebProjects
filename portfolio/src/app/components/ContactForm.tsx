'use client';
import { useState, useEffect } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Ensure component doesn't render until client-side
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required.");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/mkgnwevr', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setSuccessMessage('Thank you! Your message has been sent.');
      } else {
        const errorData = await response.json();
        alert(errorData.errors.map((err: { message: string }) => err.message).join(", "));
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full max-w-lg mx-auto p-4 text-black" onSubmit={handleSubmit}>
      <label className="block mb-2 text-md font-medium text-[#1595b6] dark:text-white">
        Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="input-class mb-3 px-3 py-2 w-full border border-[#1595b6] rounded-md focus:outline-none focus:border-[#1b9fc0]"
      />

      <label className="block mb-2 text-sm font-medium text-[#1595b6] dark:text-white">
        Your Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="name@gmail.com"
        className="input-class mb-3 px-3 py-2 w-full border border-[#1595b6] rounded-md focus:outline-none focus:border-[#1b9fc0]"
      />

      <label className="block mb-2 text-md font-medium text-[#1595b6] dark:text-white">
        Message
      </label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Enter your message here"
        className="textarea-class mb-3 px-3 py-2 w-full border border-[#1595b6] rounded-md focus:outline-none focus:border-[#1b9fc0]"
      ></textarea>

      <button
        type="submit"
        className="w-full border border-[#1595b6] text-white bg-[#1596b6d2] hover:bg-[#1595b6] py-2 px-4 rounded-md hover:scale-105 duration-300 ease-in-out focus:outline-none"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>

      {successMessage && (
        <p className="mt-3 text-green-500 text-center">{successMessage}</p>
      )}
    </form>
  );
};

export default ContactForm;
