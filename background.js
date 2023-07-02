const checkSameDay = time_stamp => {
  const date1 = new Date(time_stamp).toLocaleDateString();
  const date2 = new Date().toLocaleDateString();

  return date1 === date2;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)  => {
    if (request.action === "READ") {
      // READ
      chrome.storage.local.get().then((result) => {
        if(!checkSameDay(result.time_stamp) && Object.keys(result).length === 0)
          sendResponse([]);
        else
          sendResponse(result.overall_seen_tweets);
      });
      
    } else {
      // WRITE
      chrome.storage.local.set({ overall_seen_tweets: request.overall_seen_tweets, time_stamp: new Date().getTime() }).then(() => {  
        sendResponse(true);
      });
    }

    return true;
  }
);

chrome.storage.onChanged.addListener((changes) => {
  if(changes.overall_seen_tweets) {
    chrome.action.setBadgeText({text: changes.overall_seen_tweets.newValue.length + ""});
    chrome.action.setBadgeBackgroundColor({color: '#9688F1'}); 
  }
})