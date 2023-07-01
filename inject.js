class TweetCount {
  overall_seen_tweets = [];

  constructor() {
    chrome.runtime.sendMessage({ action: "READ" }).then(
      response => this.overall_seen_tweets = response
    )
  }

  update_tweetCount() {
    let current_tweets = document.querySelectorAll('[data-testid="tweetText"]');
    // https://medium.com/@rivoltafilippo/javascript-merge-arrays-without-duplicates-3fbd8f4881be#:~:text=Using%20ES5%20we%20can%20merge,and%20remove%20duplicates%20using%20indexOf.
    this.overall_seen_tweets = [...new Set([...this.overall_seen_tweets,...[...current_tweets].map(el => el.id)])]
  
    chrome.runtime.sendMessage({ action: "WRITE", overall_seen_tweets: this.overall_seen_tweets })
  }
}

console.log("Loading...")

let tweetcount = new TweetCount();
let interval = setInterval(() => tweetcount.update_tweetCount(),1000)
