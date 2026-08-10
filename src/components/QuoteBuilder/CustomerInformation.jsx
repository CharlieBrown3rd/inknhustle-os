function CustomerInformation({
  customerInfo,
  onCustomerInfoChange,
}) {
  return (
    <section className="customer-information">
      <div className="customer-information-header">
        <span>Customer Information</span>

        <h3>Tell Us About Your Project</h3>

        <p>
          Provide your contact information so we can prepare
          your official quote and production schedule.
        </p>
      </div>

      <div className="customer-information-grid">
        <label>
          Full Name <span className="required-mark">*</span>

          <input
            type="text"
            name="fullName"
            placeholder="John Smith"
            value={customerInfo.fullName}
            onChange={onCustomerInfoChange}
          />
        </label>

        <label>
          Business Name
          <span className="optional-label">Optional</span>

          <input
            type="text"
            name="businessName"
            placeholder="Acme Construction"
            value={customerInfo.businessName}
            onChange={onCustomerInfoChange}
          />
        </label>

        <label>
          Email Address <span className="required-mark">*</span>

          <input
            type="email"
            name="email"
            placeholder="john@acmeconstruction.com"
            value={customerInfo.email}
            onChange={onCustomerInfoChange}
          />
        </label>

        <label>
          Phone Number <span className="required-mark">*</span>

          <input
            type="tel"
            name="phone"
            placeholder="(302) 555-1234"
            value={customerInfo.phone}
            onChange={onCustomerInfoChange}
          />
        </label>

        <label>
          Desired Due Date

          <input
            type="date"
            name="dueDate"
            value={customerInfo.dueDate}
            onChange={onCustomerInfoChange}
          />
        </label>

        <label>
          Preferred Contact Method

          <select
            name="contactMethod"
            defaultValue="email"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="text">Text Message</option>
          </select>
        </label>

        <label className="customer-notes">
          Project Notes

          <textarea
  name="projectNotes"
  value={customerInfo.projectNotes}
  onChange={onCustomerInfoChange}
  placeholder={`Example:
• Black Gildan 64000
• Front: White logo
• Back: Two-color design
• Need completed before October 15`}
/>
        </label>
      </div>

      <div className="customer-privacy">
        <span className="privacy-icon">✓</span>

        <p>
          Your information is only used to prepare your quote,
          production schedule, and order updates. We never sell
          or share your personal information.
        </p>
      </div>
    </section>
  );
}

export default CustomerInformation;