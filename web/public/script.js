	//Builtt with Closure

	// Build an abstract interface  to save post function
	const API = (() => {
		const makeSaveFunc = (selector, postNameFunc) => () => {
			try {
				const val = document.querySelector(selector).value;
				postNameFunc(val);
			} catch (e) {
				console.log(e);
				console.log('------------------');
			}
			return false;
		}

		//Create an INTERFACE for a  named instance of the Abstract function
		//Re-use same function to make requests
		const makePostNameFunc = uri => val => {
			fetch(uri, {
				method: "POST",
				body: JSON.stringify({name: val }),
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});
		};

		//fetch data for video and book micro-services and cache re-use function name
		const postVideoName = makePostNameFunc("https://localhost:8080/api/v1/videos");
		const postVideoName = makePostNameFunc("https://localhost:8080/api/v1/books");


		//Build SEARCH procedure
		const search = () => {
			try {
				fetch("http://localhost:8080/api/v1/search")
				.then(resp = resp.json())
				.then(results => {
					const ul = document.querySelector("#matches");
					ul.innerHtml = "";
					results.forEach(data => {
						const li = document.createElement("li");
						const liContent =`
						<p>${data.name}</p>
						<p>${data.type}</p>
						`;

						li.innerHtml = liContent;

						ul.appendChild("li");
					})
				})

			} catch (e){
				console.log(e);
			}
		}

	//return results
	return {
		savedVideo: makeSaveFunc("#videoName", postVideoName),
		savedBook: makeSaveFunc("#bookName", postBookName),
		search
	}
})();



