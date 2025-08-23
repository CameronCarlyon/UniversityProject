/**
 * Modal Management System
 */
class ModalManager {
  constructor() {
    this.initializeModals();
  }

  initializeModals() {
    try {
      this.disclaimerModal = document.querySelector("#disclaimer-modal");
      this.featureUnavailableModal = document.querySelector("#feature-unavailable-modal");
      this.seatUnavailableModal = document.querySelector("#seat-unavailable-modal");
      this.closeModalBtn = document.querySelector("#close-modal");
      this.openDisclaimerBtn = document.querySelector("#open-modal");
      this.featureUnavailableElements = document.querySelectorAll(".feature-unavailable");

      this.bindEvents();
    } catch (error) {
      console.warn("Modal elements not found on this page:", error.message);
    }
  }

  bindEvents() {
    if (this.openDisclaimerBtn && this.disclaimerModal) {
      this.openDisclaimerBtn.addEventListener("click", () => {
        this.disclaimerModal.showModal();
      });
    }

    if (this.featureUnavailableElements.length > 0 && this.featureUnavailableModal) {
      this.featureUnavailableElements.forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          this.featureUnavailableModal.showModal();
        });
      });
    }

    if (this.closeModalBtn && this.featureUnavailableModal) {
      this.closeModalBtn.addEventListener("click", () => {
        this.featureUnavailableModal.close();
      });
    }

    // Close modal on backdrop click
    [this.disclaimerModal, this.featureUnavailableModal, this.seatUnavailableModal]
      .filter(Boolean)
      .forEach(modal => {
        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.close();
          }
        });
      });
  }
}

/**
 * Navigation and Tab Management
 */
class TabManager {
  constructor() {
    this.initializeTabs();
  }

  initializeTabs() {
    // Auto-click default tab if it exists
    const defaultTab = document.getElementById("defaultTab");
    if (defaultTab) {
      defaultTab.click();
    }
  }

  openTab(evt, tabName) {
    try {
      // Hide all tab contents
      const tabContents = document.getElementsByClassName("tabContent");
      Array.from(tabContents).forEach(content => {
        content.style.display = "none";
      });

      // Remove active class from all tab options
      const tabOptions = document.getElementsByClassName("tabOption");
      Array.from(tabOptions).forEach(option => {
        option.classList.remove("active");
      });

      // Show selected tab and mark as active
      const selectedTab = document.getElementById(tabName);
      if (selectedTab) {
        selectedTab.style.display = "block";
        evt.currentTarget.classList.add("active");
        this.scrollToTop();
      }
    } catch (error) {
      console.error("Error switching tabs:", error);
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// Make openTab globally available for onclick handlers
let tabManager;

function openTab(evt, tabName) {
  if (tabManager) {
    tabManager.openTab(evt, tabName);
  }
}
/**
 * Passenger Management System
 */
class PassengerManager {
  constructor() {
    this.initializePassengerSystem();
  }

  initializePassengerSystem() {
    const addPassengerIcon = document.getElementById("add-icon");
    const passengerSectionContainer = document.getElementById("passenger-info-container");

    if (!addPassengerIcon || !passengerSectionContainer) {
      return; // Elements not found on this page
    }

    addPassengerIcon.addEventListener("click", () => {
      this.addNewPassenger(passengerSectionContainer);
    });
  }

  addNewPassenger(container) {
    try {
      console.log("Adding new passenger");
      
      const passengerCount = container.children.length;
      const originalSection = document.getElementById("passenger-info-box");
      
      if (!originalSection) {
        console.error("Original passenger section not found");
        return;
      }

      // Clone the passenger info box
      const newPassengerSection = originalSection.cloneNode(true);
      const newPassengerId = `passenger-info-box-${passengerCount + 1}`;
      
      newPassengerSection.id = newPassengerId;
      
      // Update header
      const header = newPassengerSection.querySelector("h3");
      if (header) {
        header.textContent = `Passenger ${passengerCount + 1}`;
      }

      // Reset form inputs
      this.resetFormInputs(newPassengerSection);

      // Append new section
      container.appendChild(newPassengerSection);

      // Update button placement
      this.updateButtonPlacement(container);
      
    } catch (error) {
      console.error("Error adding passenger:", error);
    }
  }

  resetFormInputs(section) {
    const inputs = section.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.tagName.toLowerCase() === "input") {
        input.value = "";
      } else if (input.tagName.toLowerCase() === "select") {
        input.selectedIndex = 0;
      }
    });
  }

  updateButtonPlacement(container) {
    const passengerBoxes = container.querySelectorAll(".booking-window");
    
    passengerBoxes.forEach((box, index) => {
      // Remove existing button containers
      const existingButtonContainer = box.querySelector(".button-container");
      if (existingButtonContainer) {
        existingButtonContainer.remove();
      }

      // Add button container to the last passenger box
      if (index === passengerBoxes.length - 1) {
        const newButtonContainer = document.createElement("div");
        newButtonContainer.classList.add("button-container");
        
        const newButton = document.createElement("button");
        newButton.textContent = "Continue to Seating";
        newButton.setAttribute("onclick", "openTab(event,'seating')");
        newButton.classList.add("btn", "btn-primary");
        
        newButtonContainer.appendChild(newButton);
        box.appendChild(newButtonContainer);
      }
    });
  }
}

/**
 * Seat Management System
 */
class SeatManager {
  constructor() {
    this.initializeSeatSystem();
  }

  initializeSeatSystem() {
    this.updateUnavailableSeats();
  }

  updateUnavailableSeats() {
    try {
      const seatElements = document.querySelectorAll(".seat");
      
      seatElements.forEach((seat) => {
        const seatId = seat.id;
        const seatNumberMatch = seatId.match(/\d+/);
        
        if (seatNumberMatch) {
          const seatNumber = parseInt(seatNumberMatch[0]);
          
          if (seatNumber >= 23) {
            seat.id = "feature-unavailable";
            seat.textContent = "NA";
            seat.classList.add("unavailable");
            seat.setAttribute("aria-label", "Seat not available");
          }
        }
      });
    } catch (error) {
      console.error("Error updating seat availability:", error);
    }
  }
}

/**
 * Application Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all systems
  new ModalManager();
  tabManager = new TabManager();
  new PassengerManager();
  new SeatManager();
  
  console.log("Application initialized successfully");
});