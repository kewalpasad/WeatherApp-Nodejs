const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', e => {
	const location = search.value;

	fetch(`http://localhost:3000/weather?location=${location}`).then(response => {
		response.json().then(data => {
			if (data.error) {
				messageOne.innerHTML = data.error;
				messageTwo.innerText = '';
				// console.log(data.error);
			} else {
				messageOne.innerHTML = data.location;
				messageTwo.innerHTML = data.forecast;
				// console.log(data.location);
				// console.log(data.forecast);
			}
		});
	});

	e.preventDefault();
});
