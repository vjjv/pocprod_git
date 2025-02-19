// Function to dynamically create the HTML structure
function createHTMLStructure() {
    const container = document.createElement('div');
    container.className = 'container';
  
    container.innerHTML = `
      <!-- Preview Section -->
      <section id="preview-part" class="preview-part">
        <img src="assets/spin.gif" alt="loading" class="spin-loading" style="display: none" />
        <div class="preview">
          <!-- Video Progress Bar -->
          <div class="progress-parent">
            <div class="video-progress-bar-sudo">
              <div class="video-progress-bar" id="videoProgressBar"></div>
            </div>
          </div>
          <!-- Preview Image or Canvas -->
          <img src="" alt="Preview Image" id="preview-img" class="preview-img" />
          <canvas id="videoCanvas" class="video-canvas"></canvas>
        </div>
        <!-- Control Bar -->
        <div class="controls">
          <!-- Back Button -->
          <img src="assets/back.png" alt="Back" class="back-btn" id="backButton" />
          <!-- Action Button will be dynamically added here -->
        </div>
      </section>
  
      <!-- Capture Section -->
      <section class="canvas-part">
        <!-- Progress Bar -->
        <div class="progress-bar" id="progressBar"></div>
        <!-- Canvas -->
        <canvas id="canvas" class="active"></canvas>
  
        <!-- Capture Button with SVG -->
        <div class="capture-btn" id="captureButton">
          <svg id="progressRing" class="progress-ring" xmlns="http://www.w3.org/2000/svg">
            <circle class="outer-circle" stroke="rgba(255, 255, 255,0.9)" stroke-width="3" fill="none"></circle>
            <circle class="progress-ring__circle" stroke="rgb(255, 0, 0)" stroke-width="3" fill="none"></circle>
            <circle class="inner-circle" fill="rgba(255, 255, 255,0.9)"></circle>
          </svg>
        </div>
      </section>
    `;
  
    // Append the container to the body (or any other desired parent element)
    document.body.appendChild(container);
  }
  
  // Call the function to create and append the structure on page load
  document.addEventListener('DOMContentLoaded', createHTMLStructure);
  