chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)  => {
    if (request.action === "READ") {
      chrome.storage.local.get(["overall_seen_tweets"]).then((result) => {
        if(Object.keys(result).length === 0)
          sendResponse([]);
        else
          sendResponse(result.overall_seen_tweets);
      });
      
    } else {
      // WRITE
      chrome.storage.local.set({ overall_seen_tweets: request.overall_seen_tweets }).then(() => {  
        sendResponse(true);
      });
    }

    return true;
  }
);

chrome.storage.onChanged.addListener((changes) => {
  chrome.action.setBadgeText({text: changes.overall_seen_tweets.newValue.length + ""});
  chrome.action.setBadgeBackgroundColor({color: '#9688F1'}); 
})