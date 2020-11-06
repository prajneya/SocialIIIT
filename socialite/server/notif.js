const webpush = require('web-push')
const data = require('./util/userdata')

const vapidKeys = {
  publicKey:
    'BKwpE_Ph0Eql5-9Z8m23YNZFTYwSVVO07vGvpjaUNAk1qGDhgHL6rSb3x4qD-Jg5nCtg7aGHyeSl90LXWMjQCCQ',
  privateKey: 'bsglLAvCKifp_MDXOkoohlP9_3abKYzsL6PqcMGN1Wk'
}

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:shauryadewanmanu@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

//function to send the notification to the subscribed device
const sendNotif = (id) => {
  subscription = data.getUserSub(id);
  webpush.sendNotification(subscription, "You have new notifications")
}
