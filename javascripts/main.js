"use strict";

let apiKeys = {};
let imageList = (searchText) => {
	return new Promise ((resolve, reject)=>{
		$.ajax({
			method:'GET',
			url:'apiKeys.json'
		}).then((response) => {
			// console.log("response", response);
			apiKeys = response;
			let authHeader = 'Client-ID '+apiKeys.client_id;


			$.ajax({
				method:'GET',
				headers:{
					'Authorization': authHeader
				},
				url:`https://api.imgur.com/3/gallery/t/${searchText}`
			}).then( (response2) => {
				// console.log('imgur response', response2.data.items);
				resolve(response2.data.items);

			}, (errorResponse2) => {
				// console.log('imgur fail', errorResponse2);
				reject(errorResponse2);
			});

		}, (errorResponse) => {
			console.log('errorResponse', errorResponse);
		});
	});
};



$(document).ready(function() {
	console.log("jquery is ready");
	imageList('cat').then((dataFromImgur)=>{
		console.log('data from imgur: ',dataFromImgur);
	});

});
