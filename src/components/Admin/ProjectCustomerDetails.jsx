function ProjectCustomerDetails({ project }) {
  return (
    <div className="admin-project-detail-grid">
      <div>
        <span>Email</span>
        <strong>{project.customer_email}</strong>
      </div>

      <div>
        <span>Phone</span>
        <strong>{project.customer_phone}</strong>
      </div>

      <div>
        <span>Business</span>
        <strong>{project.business_name || "Not provided"}</strong>
      </div>

      <div>
        <span>Decoration Method</span>
        <strong>{project.decoration_method || "Not provided"}</strong>
      </div>

      <div>
        <span>Garment Style</span>
        <strong>{project.garment_style || "Not provided"}</strong>
      </div>

      <div>
        <span>Quantity</span>
        <strong>{project.quantity ?? "—"}</strong>
      </div>

      <div>
        <span>Decoration Size</span>
        <strong>{project.decoration_size || "Not provided"}</strong>
      </div>

      <div>
        <span>Ink Colors</span>
        <strong>{project.ink_colors ?? "Not applicable"}</strong>
      </div>

      <div>
        <span>Rush Order</span>
        <strong>{project.rush_order ? "Yes" : "No"}</strong>
      </div>

      <div>
        <span>Due Date</span>
        <strong>{project.due_date || "Not specified"}</strong>
      </div>

      <div>
        <span>Estimated Total</span>
        <strong>
          {project.estimated_total != null
            ? `$${Number(project.estimated_total).toFixed(2)}`
            : "—"}
        </strong>
      </div>

      <div>
        <span>Price Per Garment</span>
        <strong>
          {project.price_per_garment != null
            ? `$${Number(project.price_per_garment).toFixed(2)}`
            : "—"}
        </strong>
      </div>
    </div>
  );
}

export default ProjectCustomerDetails;