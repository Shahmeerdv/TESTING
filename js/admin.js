document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = 'http://localhost:3000';  // <-- backend base URL here

  const sponsorTableBody = document.getElementById("sponsorTableBody");
  const addForm = document.getElementById("addForm");
  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  const cancelEdit = document.getElementById("cancelEdit");

  // Fetch and display sponsors
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
            <button onclick="editSponsor(${sponsor.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
            <button onclick="deleteSponsor(${sponsor.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </td>
        </tr>
      `;
    });
  };

  // Add new sponsor
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addForm);
    const payload = Object.fromEntries(formData);
    await fetch(`${BASE_URL}/submit-sponsor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    addForm.reset();
    fetchSponsors();
  });

  // Delete sponsor
  window.deleteSponsor = async (id) => {
    await fetch(`${BASE_URL}/api/sponsors/${id}`, { method: "DELETE" });
    fetchSponsors();
  };

  // Populate edit form
  window.editSponsor = async (id) => {
    const res = await fetch(`${BASE_URL}/api/sponsors/${id}`);
    const sponsor = await res.json();
    Object.entries(sponsor).forEach(([key, value]) => {
      if (editForm.elements.namedItem(key)) {
        editForm.elements.namedItem(key).value = value;
      }
    });
    editModal.classList.remove("hidden");
    editModal.classList.add("flex");
  };

  // Cancel edit
  cancelEdit.addEventListener("click", () => {
    editModal.classList.add("hidden");
    editModal.classList.remove("flex");
  });

  // Submit edit
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(editForm);
    const payload = Object.fromEntries(formData);
    await fetch(`${BASE_URL}/api/sponsors/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    editModal.classList.add("hidden");
    editModal.classList.remove("flex");
    fetchSponsors();
  });

  fetchSponsors();
});
