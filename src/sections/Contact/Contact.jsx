import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  quantity: "",
  dueDate: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const recipient = "hustlehrdr75@gmail.com";
    const subject = `InknHustle Quote Request — ${formData.name}`;

    const body = `
New quote request from INKNHustle.com

CUSTOMER INFORMATION

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Company: ${formData.company || "Not provided"}

PROJECT INFORMATION

Service: ${formData.service}
Estimated Quantity: ${formData.quantity}
Preferred Completion Date: ${formData.dueDate || "Not provided"}

PROJECT DETAILS

${formData.message}
    `.trim();

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__content">
          <p className="contact__eyebrow">Start Your Project</p>

          <h2 className="contact__title">
            Bring your idea. <span>We’ll bring the ink.</span>
          </h2>

          <p className="contact__intro">
            Tell us about your apparel project. Your email application will
            open with the quote details prepared for you to review and send.
          </p>

          <div className="contact__details">
            <div>
              <strong>Services</strong>
              <span>Screen Printing, DTF, and HTV</span>
            </div>

            <div>
              <strong>Location</strong>
              <span>Philadelphia, Pennsylvania</span>
            </div>

            <div>
              <strong>Email</strong>
              <a href="mailto:hustlehrdr75@gmail.com">
                hustlehrdr75@gmail.com
              </a>
            </div>

            <div>
              <strong>Website</strong>
              <span>INKNHustle.com</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__grid">
            <div className="form-field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company or Organization</label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className="form-field">
              <label htmlFor="service">Service Needed *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="Screen Printing">Screen Printing</option>
                <option value="DTF Printing">DTF Printing</option>
                <option value="Heat Transfer Vinyl">
                  Heat Transfer Vinyl
                </option>
                <option value="Not Sure">Not Sure Yet</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="quantity">Estimated Quantity *</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="dueDate">Preferred Completion Date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="message">Project Details *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about garment type, colors, print locations, artwork, and special requirements."
                required
              />
            </div>
          </div>

          <button className="contact-form__button" type="submit">
            Send For A Quote Email
          </button>

          <p className="contact-form__notice">
            Your email application will open. Review the prepared message and
            press Send to complete your request.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;