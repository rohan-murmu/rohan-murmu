import React, { useState } from "react";
import TextInput from "../components/textInput";
import { HeadingText } from "../components/text";
import Social from "../components/custom/social";
import { IoSend } from "react-icons/io5";
import { db } from "../configs/firebase";
import { collection, addDoc } from "firebase/firestore";

import "../styles/contact.css";
import "../styles/form.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [buttonState, setButtonState] = useState("send");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState("sending");
    try {
      await addDoc(collection(db, "contacts"), formData);
      setFormData({ name: "", email: "", message: "" });
      setButtonState("sent");

      setTimeout(() => {
        setButtonState("send");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Failed to send your message. Please try again later.");
      setButtonState("send");
    }
  };

  return (
    <div className="contact-container">
      <div>
        <HeadingText text={"get in touch"} />
      </div>
      <p className="contact-note cursor-scale small">
        Open to backend and AI engineering roles — services, retrieval, agents and the
        infrastructure they run on. The fastest way to judge my work is to read the two repos.
      </p>
      <form className="contact-form row" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          label="Name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <TextInput
          name="email"
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          name="message"
          label="Message"
          type="text"
          required
          value={formData.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          id="submit"
          className="submit-btn cursor-scale rotate"
          disabled={buttonState !== "send"}
        >
          {buttonState}
          {buttonState === "send" && (
            <IoSend style={{ marginLeft: 6 }} className="cursor-scale rotate" />
          )}
        </button>
      </form>
      <div>
        <Social />
      </div>
    </div>
  );
}
