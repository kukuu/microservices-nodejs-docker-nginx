	//Builtt with Closure

	// Build an abstract interface  to save post function - Higher Order Functions 
        //Takes selector and a network function for handling  requests for the Services.
        // 2 Parameters: a SELECTOR and a Network 'blue print' function.
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

		//Create an INTERFACE for a  named instance of the Abstract function for AJAX operations
		//SOLID principles
		//Re-use same function to make requests
		//Single Responsibility
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

		//POST data for video and book micro-services and cache re-use function name
		//Actioning API calls for end points
		const postVideoName = makePostNameFunc("https://localhost:8080/api/v1/videos");
		const postBookName = makePostNameFunc("https://localhost:8080/api/v1/books");


		//Build SEARCH procedure
		const search = () => {
			try {
				fetch("http://localhost:8080/api/v1/search")
				.then(resp = resp.json())
				.then(results => {
					//Generating dynamic template for results
					//Dom manipulations
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



