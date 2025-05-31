document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = 'http://localhost:3000';

  const sponsorTableBody = document.getElementById("sponsorTableBody");
  const registrationTableBody = document.getElementById("registrationTableBody");

  const sponsorTab = document.getElementById("sponsorTab");
  const registrationTab = document.getElementById("registrationTab");
  const sponsorSection = document.getElementById("sponsorSection");
  const registrationSection = document.getElementById("registrationSection");

  // --- Tab Toggle ---
  sponsorTab.addEventListener("click", () => {
    sponsorSection.classList.remove("hidden");
    registrationSection.classList.add("hidden");
    sponsorTab.classList.replace("bg-gray-300", "bg-blue-500");
    registrationTab.classList.replace("bg-blue-500", "bg-gray-300");
  });

  registrationTab.addEventListener("click", () => {
    registrationSection.classList.remove("hidden");
    sponsorSection.classList.add("hidden");
    registrationTab.classList.replace("bg-gray-300", "bg-blue-500");
    sponsorTab.classList.replace("bg-blue-500", "bg-gray-300");
  });

  // --- Fetch Sponsors ---
  const fetchSponsors = async () => {
    const res = await fetch(`${BASE_URL}/api/sponsors`);
    const data = await res.json();
    sponsorTableBody.innerHTML = "";
    data.forEach((sponsor) => {
      sponsorTableBody.innerHTML += `
        <tr>
          <td class="py-2 px-4">${sponsor.company_name}</td>
          <td class="py-2 px-4">${sponsor.contact_person}</td>
          <td class="py-2 px-4">${sponsor.contact_email}</td>
          <td class="py-2 px-4">${sponsor.contact_phone}</td>
          <td class="py-2 px-4">${sponsor.sponsorship_category}</td>
          <td class="py-2 px-4">${sponsor.message || ""}</td>
          <td class="py-2 px-4 space-x-2">
            <button onclick="updateSponsorPrompt(${sponsor.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
            <button onclick="deleteSponsor(${sponsor.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </td>
        </tr>
      `;
    });
  };

  // --- Fetch Registrations ---
  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/registrations`);
      const data = await res.json();
      registrationTableBody.innerHTML = "";
      data.forEach((reg) => {
        registrationTableBody.innerHTML += `
          <tr>
            <td class="py-2 px-4">${reg.full_name}</td>
            <td class="py-2 px-4">${reg.email}</td>
            <td class="py-2 px-4">${reg.phone}</td>
            <td class="py-2 px-4">${reg.institution}</td>
            <td class="py-2 px-4">${reg.student_id}</td>
            <td class="py-2 px-4">${reg.category}</td>
            <td class="py-2 px-4">${reg.event_name}</td>
            <td class="py-2 px-4">${reg.optional_event || ""}</td>
            <td class="py-2 px-4 space-x-2">
              <button onclick="updateRegistrationPrompt(${reg.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
              <button onclick="deleteRegistration(${reg.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        `;
      });
    } catch (err) {
      console.error("❌ Error fetching registrations:", err);
    }
  };

  // --- Delete Sponsor ---
  window.deleteSponsor = async (id) => {
    await fetch(`${BASE_URL}/api/sponsors/${id}`, { method: "DELETE" });
    fetchSponsors();
  };

  // --- Delete Registration ---
  window.deleteRegistration = async (id) => {
    await fetch(`${BASE_URL}/api/registrations/${id}`, { method: "DELETE" });
    fetchRegistrations();
  };

  // --- Update Sponsor ---
  window.updateSponsorPrompt = async (id) => {
    const res = await fetch(`${BASE_URL}/api/sponsors/${id}`);
    const sponsor = await res.json();

    const updatedCompanyName = prompt("Company Name:", sponsor.company_name);
    const updatedContact = prompt("Contact Person:", sponsor.contact_person);
    const updatedEmail = prompt("Email:", sponsor.contact_email);
    const updatedPhone = prompt("Phone:", sponsor.contact_phone);
    const updatedCategory = prompt("Category:", sponsor.sponsorship_category);
    const updatedMessage = prompt("Message:", sponsor.message || "");

    const updatedSponsor = {
      companyName: updatedCompanyName,
      contactPerson: updatedContact,
      contactEmail: updatedEmail,
      contactPhone: updatedPhone,
      sponsorshipCategory: updatedCategory,
      message: updatedMessage
    };

    await fetch(`${BASE_URL}/api/sponsors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSponsor)
    });

    fetchSponsors();
  };

  // --- Update Registration ---
  window.updateRegistrationPrompt = async (id) => {
    const res = await fetch(`${BASE_URL}/api/registrations/${id}`);
    const reg = await res.json();

    const updatedName = prompt("Full Name:", reg.full_name);
    const updatedEmail = prompt("Email:", reg.email);
    const updatedPhone = prompt("Phone:", reg.phone);
    const updatedInstitution = prompt("Institution:", reg.institution);
    const updatedStudentId = prompt("Student ID:", reg.student_id);
    const updatedCategory = prompt("Category (technical/nontechnical):", reg.category);
    const updatedEvent = prompt("Event Name:", reg.event_name);
    const updatedOptionalEvent = prompt("Optional Event:", reg.optional_event || "");

    const updatedReg = {
      full_name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
      institution: updatedInstitution,
      student_id: updatedStudentId,
      category: updatedCategory,
      event_name: updatedEvent,
      optional_event: updatedOptionalEvent
    };

    await fetch(`${BASE_URL}/api/registrations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReg)
    });

    fetchRegistrations();
  };

  // --- Initial Load ---
  fetchSponsors();
  fetchRegistrations();
});
