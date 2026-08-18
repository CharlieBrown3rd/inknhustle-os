import { useMemo, useState } from "react";
import GarmentSelector from "../../components/QuoteBuilder/GarmentSelector";
import PrintLocationSelector from "../../components/QuoteBuilder/PrintLocationSelector";
import ProjectSummary from "../../components/QuoteBuilder/ProjectSummary";
import QuantityPriceTable from "../../components/QuoteBuilder/QuantityPriceTable";
import ArtworkUploader from "../../components/QuoteBuilder/ArtworkUploader";
import ProjectProgress from "../../components/QuoteBuilder/ProjectProgress";
import CustomerInformation from "../../components/QuoteBuilder/CustomerInformation";
import FinalProjectReview from "../../components/QuoteBuilder/FinalProjectReview";
import SubmissionConfirmation from "../../components/QuoteBuilder/SubmissionConfirmation";
import { supabase } from "../../lib/supabase";

import { calculateEstimate } from "../../utils/pricingEngine";
import {
  garmentRates,
  printLocationOptions,
  printSizeRates,
  serviceRates,
} from "../../data/pricingData";
import "./QuoteCalculator.css";



function QuoteCalculator() {
  const [service, setService] = useState("screenPrint");
  const [quantity, setQuantity] = useState(12);
  const [garment, setGarment] = useState("tshirt");
  const [artworkFile, setArtworkFile] = useState(null);
  const [customerSupplied, setCustomerSupplied] =
    useState(false);
  const [printSize, setPrintSize] = useState("standard");
  const [selectedLocations, setSelectedLocations] =
    useState([]);
  const [colors, setColors] = useState(1);
  const [rushOrder, setRushOrder] = useState(false);
  const [submittedProject, setSubmittedProject] = useState(null);
  
  const togglePrintLocation = (location) => {
    setSelectedLocations((previousLocations) => {
      if (previousLocations.includes(location)) {
        return previousLocations.filter(
          (item) => item !== location
        );
      }

      return [...previousLocations, location];
    });
  };
const estimate = useMemo(
  () =>
    calculateEstimate({
      service,
      quantity,
      garment,
      customerSupplied,
      printSize,
      selectedLocations,
      colors,
      rushOrder,
    }),
  [
    service,
    quantity,
    garment,
    customerSupplied,
    printSize,
    selectedLocations,
    colors,
    rushOrder,
  ]
);

const quantityOptions = [12, 24, 48, 72, 100];

const quantityEstimates = useMemo(
  () =>
    quantityOptions.map((optionQuantity) => ({
      quantity: optionQuantity,
      estimate: calculateEstimate({
        service,
        quantity: optionQuantity,
        garment,
        customerSupplied,
        printSize,
        selectedLocations,
        colors,
        rushOrder,
      }),
    })),
  [
    service,
    garment,
    customerSupplied,
    printSize,
    selectedLocations,
    colors,
    rushOrder,
  ]
);

  const selectedServiceLabel =
  serviceRates[service].label;

const selectedGarmentLabel = customerSupplied
  ? "Customer-Supplied Garments"
  : garmentRates[garment].label;

const selectedPrintSizeLabel =
  printSizeRates[printSize].label;

const displayQuantity =
  estimate.calculationQuantity;

  const [customerInfo, setCustomerInfo] = useState({
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  dueDate: "",
  contactMethod: "email",
  projectNotes: "",
});

const handleCustomerInfoChange = (event) => {
  const { name, value } = event.target;

  setCustomerInfo((currentInfo) => ({
    ...currentInfo,
    [name]: value,
  }));
};

const customerInfoComplete =
  customerInfo.fullName.trim() !== "" &&
  customerInfo.email.trim() !== "" &&
  customerInfo.phone.trim() !== "";


  
const projectReady =
  customerInfoComplete &&
  selectedLocations.length > 0;

const handleProjectSubmit = async () => {
  if (!projectReady) {
    return;
  }

  const projectReference = `INK-${new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "")}-${Date.now()
    .toString()
    .slice(-5)}`;

console.log("rushOrder before submit:", rushOrder);

  const projectData = {
    reference: projectReference,

    customer: customerInfo,
    project: {
      service: selectedServiceLabel,
      garment: selectedGarmentLabel,
      quantity: displayQuantity,
      printSize: selectedPrintSizeLabel,
      locations: selectedLocations,
      colors: service === "screenPrint" ? colors : null,
      rushOrder,
    },

    pricing: {
      total: estimate.total,
      pricePerGarment: estimate.pricePerShirt,
    },
  };
let artworkPath = null;

if (artworkFile) {
  const fileExtension =
    artworkFile.name.split(".").pop();

  artworkPath = `${projectData.reference}/${Date.now()}.${fileExtension}`;

  const { error: artworkError } = await supabase.storage
    .from("project-artwork")
    .upload(artworkPath, artworkFile);

  if (artworkError) {
    console.error(
      "Artwork upload failed:",
      artworkError
    );

    return;
  }
}
  const { error } = await supabase
  .from("projects")
  .insert({
    reference: projectData.reference,
    customer_name: projectData.customer.fullName,
    customer_email: projectData.customer.email,
    customer_phone: projectData.customer.phone,
    business_name: projectData.customer.businessName || null,
    due_date: projectData.customer.dueDate || null,
    contact_method: projectData.customer.contactMethod,
    project_notes: projectData.customer.projectNotes || null,

    decoration_method: projectData.project.service,
    garment_style: projectData.project.garment,
    quantity: projectData.project.quantity,
    decoration_size: projectData.project.printSize,
    decoration_locations: projectData.project.locations,
    ink_colors: projectData.project.colors,
    rush_order: projectData.project.rushOrder,

    estimated_total: projectData.pricing.total,
    price_per_garment: projectData.pricing.pricePerGarment,

    artwork_path: artworkPath,

    status: "new",
  });

if (error) {
  console.error("Supabase project submission failed:");
  console.error("message:", error.message);
  console.error("code:", error.code);
  console.error("details:", error.details);
  console.error("hint:", error.hint);

  return;
}

  setSubmittedProject(projectData);

  console.log(
    "InknHustle Project Submission:",
    projectData
  );
};


  return submittedProject ? (
  <SubmissionConfirmation
  projectReference={submittedProject.reference}
  estimatedTotal={submittedProject.pricing.total}
  customerName={submittedProject.customer.fullName}
  customerEmail={submittedProject.customer.email}
  artworkUploaded={Boolean(submittedProject.artwork?.path)}
  onStartAnotherProject={() => setSubmittedProject(null)}
/>
) : (
    <section className="quote-calculator" id="quote">
      <div className="quote-calculator-container">
        <div className="quote-heading">
          <span className="quote-eyebrow">
            PROJECT BUILDER
          </span>

          <h2>Build Your Project</h2>

          <p>
  Configure your apparel, upload your artwork,
and receive a real-time project estimate.
</p>
        </div>

<ProjectProgress />

        <div className="quote-layout">
          <div className="quote-form">
            <label>
              Printing Method

              <select
                value={service}
                onChange={(event) =>
                  setService(event.target.value)
                }
              >
                <option value="screenPrint">
                  Screen Printing
                </option>

                <option value="dtf">
                  DTF Printing
                </option>

                <option value="htv">
                  Heat Transfer Vinyl
                </option>
              </select>
            </label>

            <label>
              Quantity

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
              />
            </label>

<GarmentSelector
  garmentRates={garmentRates}
  selectedGarment={garment}
  customerSupplied={customerSupplied}
  onGarmentChange={setGarment}
/>

<label className="quote-checkbox">
  <input
    type="checkbox"
    checked={customerSupplied}
    onChange={(event) =>
      setCustomerSupplied(event.target.checked)
    }
  />

  Customer will supply the garments
</label>

            
            <label>
              Print Size

              <select
                value={printSize}
                onChange={(event) =>
                  setPrintSize(event.target.value)
                }
              >
                {Object.entries(printSizeRates).map(
                  ([value, item]) => (
                    <option key={value} value={value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </label>

            <PrintLocationSelector
  printLocationOptions={printLocationOptions}
  selectedLocations={selectedLocations}
  onToggleLocation={togglePrintLocation}
/>


            {service === "screenPrint" && (
              <label>
                Number of Ink Colors

                <select
                  value={colors}
                  onChange={(event) =>
                    setColors(Number(event.target.value))
                  }
                >
                  <option value="1">1 color</option>
                  <option value="2">2 colors</option>
                  <option value="3">3 colors</option>
                  <option value="4">4 colors</option>
                </select>
              </label>
            )}

            <label className="quote-checkbox">
              <input
                type="checkbox"
                checked={rushOrder}
                onChange={(event) =>
                  setRushOrder(event.target.checked)
                }
              />

              Rush order — adds 25%
            </label>
          </div>

         <ProjectSummary
  selectedServiceLabel={selectedServiceLabel}
  selectedGarmentLabel={selectedGarmentLabel}
  displayQuantity={displayQuantity}
  selectedPrintSizeLabel={selectedPrintSizeLabel}
  service={service}
  colors={colors}
  rushOrder={rushOrder}
  selectedLocations={selectedLocations}
  estimate={estimate}
/>
<QuantityPriceTable
  quantityEstimates={quantityEstimates}
  currentQuantity={displayQuantity}
  onQuantityChange={setQuantity}
/>

<ArtworkUploader
  selectedFile={artworkFile}
  onFileChange={setArtworkFile}
/>
<CustomerInformation
  customerInfo={customerInfo}
  onCustomerInfoChange={handleCustomerInfoChange}
/>

<FinalProjectReview
  customerInfo={customerInfo}
  selectedServiceLabel={selectedServiceLabel}
  selectedGarmentLabel={selectedGarmentLabel}
  displayQuantity={displayQuantity}
  selectedPrintSizeLabel={selectedPrintSizeLabel}
  selectedLocations={selectedLocations}
  estimate={estimate}
  projectReady={projectReady}
  onSubmit={handleProjectSubmit}
  submittedProject={submittedProject}
/>
        </div>
        </div>
    </section>
  );

}
export default QuoteCalculator;