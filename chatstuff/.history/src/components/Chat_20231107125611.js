import React, {useEffect} from 'react';
import Pusher from 'pusher-js';

function PusherFunction() {
	useEffect(() => {
		const pusher = new Pusher('cd56aaada30e0002e21e', {
			cluster: 'us3'
		})
		const channel1 = pusher.subscribe('channel_name1');
		channel1.bind('private_channel_id',function(data) {
		    console.log(data)
		    // Code that runs when channel1 listens to a new message
		})
		
		return (() => {
			pusher.unsubscribe('channel_name1')
			// pusher.unsubscribe('channel_name2')
		})
	}, []);

	return(
		<div>
	
		</div>
	)
}


export default PusherFunction;