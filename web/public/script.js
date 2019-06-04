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
	})

//Create an INTERFACE for a  named instance of the Abstract function


//Dispatch 2 to fetch data 


//Build SEARCH procedure


//return results