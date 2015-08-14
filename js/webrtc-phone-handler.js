var my_num;
var friend_num;
var phone;
var session;
function start_phone(){
  my_num = document.getElementById('my_number').value;
  friend_num = document.getElementById('friend_number').value;
  // ~Warning~ You must get your own API Keys for non-demo purposes.
  // ~Warning~ Get your PubNub API Keys: http://www.pubnub.com/get-started/
  // The phone *number* can by any string value
  phone = PHONE({
    number        : my_num,
    publish_key   : 'pub-c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    subscribe_key : 'sub-c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    ssl           : true
  });

  // As soon as the phone is ready we can make calls
  phone.ready(function(){
    PUBNUB.$('buttons').innerHTML = '';
    var call_button = document.createElement('button');
    call_button.innerHTML = 'Call';
    call_button.onclick = start_call;
    PUBNUB.$('buttons').appendChild(call_button);
  });

  // When Call Comes In or is to be Connected
  phone.receive(function(session){
    // Display Your Friend's Live Video
    session.connected(function(session){
      video = session.video;
      video.addEventListener('playing', init_video, false);
    });
  });
};
function start_call(){
  // Dial a Number and get the Call Session
  // For simplicity the phone number is the same for both caller/receiver.
  // you should use different phone numbers for each user.
  session = phone.dial(friend_num);
}