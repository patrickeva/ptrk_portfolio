import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const form = { ...formData };

  const templateParams = {
    from_name: form.name,
    reply_to: form.email,
    message: form.message,
  };

  emailjs
    .send("service_x4laam8", "template_5t2xequ", templateParams, "kXRnZGC8s0ijWdYpj")
    .then((res) => {
      console.log('EmailJS sent', res);
      setStatus("SUCCESS");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      setStatus("ERROR");
      // Fallback: open user's mail client with prefilled message so sender can still contact you
      const subject = form.name ? `${form.name} - Message from portfolio` : 'Message from portfolio';
      const body = `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`;
      window.location.href = `mailto:patrickramoseva@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  };

  // useEffect(() => {
  //   // initialize EmailJS with your public key (optional if you pass key to send)
  //   try {
  //     emailjs.init("j8T261AMJnApBUZuP");
  //   } catch (e) {
  //     console.warn('EmailJS init warning', e);
  //   }
  // }, []);

  return (
    <section className="contact" id="contact">
      <h2 className="heading">Contact <span>Me!</span></h2>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          rows="10"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <input type="submit" value="Send Message" className="btn"/>
      </form>

      {status === "SUCCESS" && (
        <p className="success">✅ Message Sent Successfully!</p>
      )}

      {status === "ERROR" && (
        <p className="error">❌ Failed to send message.</p>
      )}
    </section>
  );
}