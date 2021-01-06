
//Максимум не включается, минимум включается
const Random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const Sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const OnCursore = () => {
	document.getElementById("console").style.setProperty('--animation', '1s blink step-end infinite');
}

const OffCursore = () => {
	document.getElementById("console").style.setProperty('--animation', 'none');
}


const Execute = async(text, type) => {
	let last_char;
	const spec_chars = ['.', ',', '-', '+', '=', ')', '(', '?', '%', '^', '*', '<', '>'];
	const big_chars =  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D',
						'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
	for(const ch of text) {
		document.getElementById("console").innerHTML += ch;
		if(ch === last_char){
			await Sleep(Random(25, 100));
		}else if (spec_chars.includes(ch)) { // Spec symbols need to press shift
			await Sleep(Random(300, 350));
		}else if (big_chars.includes(ch)) { // Big chars need to press shift
			await Sleep(Random(300, 350));
		}else if(ch.charCodeAt(0) === 10) { // New line have ascii code 10
			const r = Random(700, 800);
			console.log(r);
			await Sleep(r);
		} else {
			await Sleep(Random(50, 250));
		}
		last_char = ch;
	}
	
	OnCursore();
	await Sleep(3000);
	OffCursore();
	
	while(document.getElementById("console").innerHTML.length > 0){
		document.getElementById("console").innerHTML = document.getElementById("console").innerHTML.substring(0, document.getElementById("console").innerHTML.length - 1);

		await Sleep(Random(60, 80));

	}
	
	OnCursore();
}

const Colors = {
	"1": () => {
			document.getElementById("console").style.setProperty('--color', "rgb(12 142 17)");
		},
	"2": () => {
			document.getElementById("console").style.setProperty('--color', "#fff");
		}
};

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("console").innerHTML = "";
	OnCursore();
	document.getElementById("console").style.setProperty('--color', "#fff");
	document.getElementById("launch").addEventListener("click", async () => {
		const text = document.getElementById("data").value;
		const type = document.getElementById("type").value;
		const color_type = document.getElementById("color_type").value;
		
		Colors[color_type]();
		
		document.getElementById("console").innerHTML = "";
		
		await Sleep(3000);
		
		OffCursore();
		
		Execute(text, type);
	});
});