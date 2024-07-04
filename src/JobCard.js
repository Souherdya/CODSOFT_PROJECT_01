async function jobCard(count) {
    for (let i = 0; i < count; i++) {
        var newDiv = document.createElement("div");
        newDiv.className = "job-card";
        

        // Create logo div and details div if needed
        var logoDiv = document.createElement("div");
        logoDiv.className = "logo";
        
        newDiv.appendChild(logoDiv);
        
        var detailsDiv = document.createElement("div");
        detailsDiv.className = "details";
        
        newDiv.appendChild(detailsDiv);

        // Get the parent div
        var parentDiv = document.getElementsByClassName("main-content")[0];
        if (parentDiv) {
            parentDiv.appendChild(newDiv);
        } else {
            console.error("Parent div not found");
        }
    }
}

window.onload = function() {
    // Retrieve the number of divs to be appended from localStorage
    let count = parseInt(localStorage.getItem('jobCardCount')) || 0;
    count++;
    localStorage.setItem('jobCardCount', count);
    jobCard(count);
}
