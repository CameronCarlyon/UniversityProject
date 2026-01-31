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
      this.closeSeatModalBtn = document.querySelector("#close-modal-seat");
      this.openDisclaimerBtn = document.querySelector("#open-modal");
      this.featureUnavailableElements = document.querySelectorAll(".feature-unavailable");

      this.bindEvents();
    } catch (error) {
      console.warn("Modal elements not found on this page:", error.message);
    }
  }

  bindEvents() {
    if (this.openDisclaimerBtn && this.disclaimerModal) {
      this.openDisclaimerBtn.addEventListener("click", (event) => {
        event.preventDefault();
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
      this.closeModalBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.featureUnavailableModal.close();
      });
    }

    if (this.closeSeatModalBtn && this.seatUnavailableModal) {
      this.closeSeatModalBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.seatUnavailableModal.close();
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

    // Close modals on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (this.featureUnavailableModal?.open) {
          this.featureUnavailableModal.close();
        }
        if (this.seatUnavailableModal?.open) {
          this.seatUnavailableModal.close();
        }
      }
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
      // Click the tab to trigger openTab
      defaultTab.click();
      // Ensure active class is added to default tab
      defaultTab.classList.add("active");
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

      // Show selected tab
      const selectedTab = document.getElementById(tabName);
      if (selectedTab) {
        selectedTab.style.display = "block";
        
        // Find and activate the corresponding tab button
        // Check if evt.currentTarget is a tab button, otherwise find it by tab name
        let tabButton = null;
        if (evt.currentTarget && evt.currentTarget.classList.contains("tabOption")) {
          tabButton = evt.currentTarget;
        } else {
          // Find the correct tab button based on the onclick attribute
          Array.from(tabOptions).forEach(option => {
            const onclickAttr = option.getAttribute("onclick");
            if (onclickAttr && onclickAttr.includes(`'${tabName}'`)) {
              tabButton = option;
            }
          });
        }
        
        if (tabButton) {
          tabButton.classList.add("active");
        }
        
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
    this.randomizeOccupiedSeats();
    this.bindSeatClickHandlers();
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
            seat.classList.add("unavailable");
            seat.setAttribute("aria-label", "Seat not available");
          }
        }
      });
    } catch (error) {
      console.error("Error updating seat availability:", error);
    }
  }

  randomizeOccupiedSeats() {
    try {
      // Get all seats in the cabin (rows 17-50)
      const allSeats = document.querySelectorAll(".seat");
      const cabinSeats = Array.from(allSeats).filter(seat => {
        const seatNumberMatch = seat.id.match(/\d+/);
        if (seatNumberMatch) {
          const seatNumber = parseInt(seatNumberMatch[0]);
          return seatNumber >= 17 && seatNumber <= 50;
        }
        return false;
      });
      
      if (cabinSeats.length === 0) return;
      
      // Fisher-Yates shuffle algorithm
      const shuffled = [...cabinSeats];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Randomize 15% of cabin seats as taken/occupied
      const occupiedCount = Math.ceil(cabinSeats.length * 0.15);
      for (let i = 0; i < occupiedCount; i++) {
        shuffled[i].classList.add("taken");
      }
    } catch (error) {
      console.error("Error randomizing occupied seats:", error);
    }
  }

  bindSeatClickHandlers() {
    try {
      const seatElements = document.querySelectorAll(".seat");
      
      seatElements.forEach((seat) => {
        seat.addEventListener("click", (event) => {
          // Ignore clicks on taken seats
          if (seat.classList.contains("taken")) {
            return;
          }
          
          // Handle unavailable seats (rows 23+)
          if (seat.classList.contains("unavailable")) {
            seat.classList.add("active");
            if (seat.classList.contains("active")) {
              seat.textContent = "NA";
            }
            document.getElementById("seating-details").textContent = "Seat Unavailable";
            return;
          }
          
          // Handle normal seat selection
          seatElements.forEach(s => s.classList.remove("active"));
          seat.classList.add("active");
          const seatNumber = seat.id.replace("seat-", "");
          document.getElementById("seat-number").textContent = seatNumber;
          document.getElementById("seating-details").textContent = "";
        });
      });
    } catch (error) {
      console.error("Error binding seat click handlers:", error);
    }
  }
}

/**
 * Custom Select Dropdown Manager
 */
class CustomSelectManager {
  constructor() {
    this.initializeCustomSelects();
  }

  initializeCustomSelects() {
    document.querySelectorAll('.custom-select').forEach(select => {
      // Skip date picker - it has its own handler
      if (select.id === 'date-picker') return;
      
      const trigger = select.querySelector('.custom-select-trigger');
      const options = select.querySelectorAll('.custom-option');
      
      // Toggle dropdown on click of entire select area
      select.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other dropdowns
        document.querySelectorAll('.custom-select.open').forEach(other => {
          if (other !== select) other.classList.remove('open');
        });
        select.classList.toggle('open');
      });
      
      // Handle option selection
      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = option.getAttribute('data-value');
          const text = option.textContent;
          
          // Update the trigger text and value
          trigger.textContent = text;
          select.setAttribute('data-value', value);
          select.classList.add('has-value');
          
          // Close the dropdown
          select.classList.remove('open');
        });
      });
    });
    
    // Close dropdowns only when clicking outside any .custom-select
    document.addEventListener('click', (e) => {
      // If the click is not inside any .custom-select, close all
      if (!e.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select.open').forEach(select => {
          select.classList.remove('open');
        });
      }
    });
  }
}

/**
 * Custom Date Picker Manager
 */
class DatePickerManager {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = null; // for one-way
    this.rangeStart = null; // for return journey
    this.rangeEnd = null;
    this.isReturnJourney = false;
    this.datePicker = document.getElementById('date-picker');
    if (this.datePicker) {
      this.init();
    }
  }

  init() {
    const trigger = this.datePicker.querySelector('.custom-select-trigger');
    // Listen for return journey checkbox
    const returnCheckbox = document.getElementById('return-journey');
    if (returnCheckbox) {
      this.isReturnJourney = returnCheckbox.checked;
      returnCheckbox.addEventListener('change', (e) => {
        this.isReturnJourney = e.target.checked;
        // Reset selection when toggling
        this.selectedDate = null;
        this.rangeStart = null;
        this.rangeEnd = null;
        this.renderCalendar();
        this.updateTrigger();
      });
    }
    // Toggle calendar on click
    this.datePicker.addEventListener('click', (e) => {
      if (!e.target.closest('.date-picker-dropdown')) {
        e.stopPropagation();
        document.querySelectorAll('.custom-select.open').forEach(other => {
          if (other !== this.datePicker) other.classList.remove('open');
        });
        this.datePicker.classList.toggle('open');
        if (this.datePicker.classList.contains('open')) {
          this.renderCalendar();
        }
      }
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.datePicker.contains(e.target)) {
        this.datePicker.classList.remove('open');
      }
    });
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    // Support two months side by side, one set of controls
    const calendarContainer = this.datePicker.querySelector('.date-picker-calendar');
    calendarContainer.innerHTML = '';

    const monthsWrapper = document.createElement('div');
    monthsWrapper.className = 'date-picker-months-wrapper';

    // Header row (spans both months)
    const headerRow = document.createElement('div');
    headerRow.className = 'date-picker-header';
    headerRow.style.justifyContent = 'space-between';
    headerRow.style.alignItems = 'center';
    headerRow.style.marginBottom = 'var(--spacing-md)';
    headerRow.style.padding = '0 var(--spacing-sm)';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'date-nav-btn';
    prevBtn.id = 'prev-month';
    prevBtn.textContent = '<';
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    const headerSpan = document.createElement('span');
    headerSpan.style.flex = '1 1 0';
    headerSpan.style.textAlign = 'center';
    headerSpan.textContent = `${monthNames[month]} ${year}  |  ${monthNames[(month+1)%12]} ${month+1>11?year+1:year}`;

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'date-nav-btn';
    nextBtn.id = 'next-month';
    nextBtn.textContent = '>';
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });

    headerRow.appendChild(prevBtn);
    headerRow.appendChild(headerSpan);
    headerRow.appendChild(nextBtn);
    calendarContainer.appendChild(headerRow);

    // Helper to render a month
    const renderMonth = (y, m) => {
      const monthDiv = document.createElement('div');
      monthDiv.className = 'date-picker-month';
      // Weekdays
      const weekdays = document.createElement('div');
      weekdays.className = 'date-picker-weekdays';
      ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => {
        const wd = document.createElement('div');
        wd.textContent = d;
        weekdays.appendChild(wd);
      });
      monthDiv.appendChild(weekdays);
      // Days
      const daysGrid = document.createElement('div');
      daysGrid.className = 'date-picker-days';
      const firstDay = new Date(y, m, 1).getDay();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const daysInPrevMonth = new Date(y, m, 0).getDate();
      // Previous month days
      for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayEl = this.createDayElement(day, true, y, m - 1);
        daysGrid.appendChild(dayEl);
      }
      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(y, m, day);
        dateObj.setHours(0, 0, 0, 0);
        const dayEl = this.createDayElement(day, false, y, m, dateObj);
        daysGrid.appendChild(dayEl);
      }
      monthDiv.appendChild(daysGrid);
      monthsWrapper.appendChild(monthDiv);
    };

    // Render current and next month side by side
    renderMonth(year, month);
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    renderMonth(nextYear, nextMonth);
    calendarContainer.appendChild(monthsWrapper);
  }

  createDayElement(day, isOtherMonth, year, month, dateObjOverride) {
    const dayEl = document.createElement('div');
    dayEl.className = 'date-day';
    dayEl.textContent = day;
    if (isOtherMonth) {
      dayEl.classList.add('other-month');
    }
    // Use provided dateObjOverride or construct
    let dateObj = dateObjOverride || new Date(year, month, day);
    dateObj.setHours(0, 0, 0, 0);
    // Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Disable and grey out past dates
    if (dateObj < today) {
      dayEl.classList.add('unselectable');
      dayEl.setAttribute('aria-disabled', 'true');
    }
    if (dateObj.getTime() === today.getTime()) {
      dayEl.classList.add('today');
    }
    // Range highlighting
    if (this.isReturnJourney && this.rangeStart && this.rangeEnd) {
      const t = dateObj.getTime();
      const start = this.rangeStart.getTime();
      const end = this.rangeEnd.getTime();
      if (t === start) dayEl.classList.add('range-start');
      if (t === end) dayEl.classList.add('range-end');
      if (t > start && t < end) dayEl.classList.add('range');
    } else if (!this.isReturnJourney && this.selectedDate) {
      if (dateObj.getTime() === this.selectedDate.getTime()) {
        dayEl.classList.add('selected');
      }
    } else if (this.isReturnJourney && this.rangeStart && !this.rangeEnd) {
      if (dateObj.getTime() === this.rangeStart.getTime()) {
        dayEl.classList.add('range-start');
      }
    }
    dayEl.addEventListener('click', (e) => {
      if (dateObj < today) return;
      e.stopPropagation();
      this.handleDateClick(year, month, day);
    });
    return dayEl;
  }

  handleDateClick(year, month, day) {
    const clickedDate = new Date(year, month, day);
    clickedDate.setHours(0, 0, 0, 0);
    if (this.isReturnJourney) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        // Start new range
        this.rangeStart = clickedDate;
        this.rangeEnd = null;
      } else if (!this.rangeEnd) {
        // Set end date
        if (clickedDate < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = clickedDate;
        } else {
          this.rangeEnd = clickedDate;
        }
      }
      this.updateTrigger();
    } else {
      this.selectedDate = clickedDate;
      this.updateTrigger();
      // Close calendar
      this.datePicker.classList.remove('open');
    }
    this.renderCalendar();
  }

  updateTrigger() {
    const trigger = this.datePicker.querySelector('.custom-select-trigger');
    if (this.isReturnJourney) {
      if (this.rangeStart && this.rangeEnd) {
        trigger.textContent = `${this.rangeStart.toLocaleDateString()} ⇄ ${this.rangeEnd.toLocaleDateString()}`;
        this.datePicker.classList.add('has-value');
        this.datePicker.setAttribute('data-value', `${this.rangeStart.toISOString()}|${this.rangeEnd.toISOString()}`);
      } else if (this.rangeStart) {
        trigger.textContent = `${this.rangeStart.toLocaleDateString()} ⇄ ...`;
        this.datePicker.classList.remove('has-value');
        this.datePicker.setAttribute('data-value', '');
      } else {
        trigger.textContent = 'Select date';
        this.datePicker.classList.remove('has-value');
        this.datePicker.setAttribute('data-value', '');
      }
    } else {
      if (this.selectedDate) {
        trigger.textContent = this.selectedDate.toLocaleDateString();
        this.datePicker.classList.add('has-value');
        this.datePicker.setAttribute('data-value', this.selectedDate.toISOString());
      } else {
        trigger.textContent = 'Select date';
        this.datePicker.classList.remove('has-value');
        this.datePicker.setAttribute('data-value', '');
      }
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
  new CustomSelectManager();
  new DatePickerManager();

  // --- Search Button Enable/Disable Logic ---
  const fromInput = document.getElementById('airport-from-input');
  const toInput = document.getElementById('airport-to-input');
  const datePicker = document.getElementById('date-picker');
  const searchBtn = document.querySelector('.flights-primary .form-btn');

  function isDateSelected() {
    if (!datePicker) return false;
    // For one-way: data-value is ISO string; for return: two ISO strings separated by |
    const val = datePicker.getAttribute('data-value');
    if (!val) return false;
    if (document.getElementById('return-journey')?.checked) {
      // Return: must have two dates
      const parts = val.split('|');
      return parts.length === 2 && parts[0] && parts[1];
    } else {
      // One-way: must have one date
      return !!val;
    }
  }

  function updateSearchBtnState() {
    const fromFilled = fromInput && fromInput.value.trim().length > 0;
    const toFilled = toInput && toInput.value.trim().length > 0;
    const dateFilled = isDateSelected();
    if (fromFilled && toFilled && dateFilled) {
      searchBtn.disabled = false;
    } else {
      searchBtn.disabled = true;
    }
  }

  if (fromInput && toInput && datePicker && searchBtn) {
    fromInput.addEventListener('input', updateSearchBtnState);
    toInput.addEventListener('input', updateSearchBtnState);
    // Listen for date changes via MutationObserver (since custom picker updates data-value)
    const observer = new MutationObserver(updateSearchBtnState);
    observer.observe(datePicker, { attributes: true, attributeFilter: ['data-value'] });
    // Also listen for return journey toggle
    const returnCheckbox = document.getElementById('return-journey');
    if (returnCheckbox) {
      returnCheckbox.addEventListener('change', () => {
        // Date selection resets, so update button state
        setTimeout(updateSearchBtnState, 0);
      });
    }
    // Initial state
    updateSearchBtnState();
  }

  
  console.log("Application initialized successfully");
});