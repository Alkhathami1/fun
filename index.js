// index.js

// Function to fetch all reports for a specified device
async function getAllReports(deviceId) {
  try {
    const response = await fetch(`https://ggateway.apigateway.alkhathami-project.cloud.goog/devices/${deviceId}/incidents`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}

// Function to display reports as clickable HTML links
function displayReports(reports) {
  const reportList = document.getElementById('reportList');
  reportList.innerHTML = ''; // Clear previous reports
  
  reports.forEach(report => {
    const reportLink = document.createElement('a');
    reportLink.href = report.link; // Assuming each report object has a 'link' property
    reportLink.textContent = report.title; // Assuming each report object has a 'title' property
    reportLink.classList.add('report-link');
    reportList.appendChild(reportLink);
    reportList.appendChild(document.createElement('br')); // Add line break between links
  });
}

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  const deviceId = document.getElementById('deviceId').value;
  const reports = await getAllReports(deviceId);
  displayReports(reports);
}

// Event listener for form submission
document.getElementById('reportForm').addEventListener('submit', handleSubmit);
