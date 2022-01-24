chrome.runtime.onMessage.addListener((response)=>{

    if (response.text == "Extract links") {

            links = document.querySelectorAll('a');

            if(links.length > 0){

                let extractedLinksArr = [];
                for(i=0; i<links.length; i++){
                    extractedLinksArr.push({'href':links[i].innerText, 'innerText':links[i].getAttribute('href')});
                };

                chrome.runtime.sendMessage({data: extractedLinksArr});
        }
    }
});