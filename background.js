console.log("background");
extractBtn = document.getElementById('extractBtn');
resetBtn = document.getElementById('resetBtn');
extractedLinks = document.getElementById('extractedLinks');
extractedLinksContainer = document.getElementById('extractedLinksContainer');

extractBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "Extract links" });
    });
})

chrome.runtime.onMessage.addListener((response) => {
    console.log(response.data);

    if (response.data.length > 0) {
        extractedLinks.style.display = 'block';
        for (let i = 0; i < response.data.length; i++) {
            extractedLinksContainer.innerHTML += `<li><span>${response.data[i]['href']}</span> <a href="${response.data[i]['innerText']}" target="_blank">${response.data[i]['innerText']}</a></li>`;
        }
    }
    else {
        extractedLinksContainer.innerHTML += `<li>No links found!!!</li>`;
    }
});

resetBtn.addEventListener('click', () => {
    extractedLinksContainer.innerHTML = '';
    extractedLinks.style.display = 'none';
})