
//Максимум не включается, минимум включается
const Random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const Sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}



const Execute = async(text, type) => {
	let last_char;
	const spec_chars = ['.', ',', '-', '+', '=', ' '];
	for(const ch of text) {
		document.getElementById("console").innerHTML += ch;
		if(ch === last_char){
			await Sleep(Random(25, 100));
		}else if (spec_chars.includes(ch)) {
			await Sleep(Random(140, 250));
		}else{
			await Sleep(Random(50, 250));
		}
		last_char = ch;
	}
	await Sleep(3000);
	
	while(document.getElementById("console").innerHTML.length > 0){
		document.getElementById("console").innerHTML = document.getElementById("console").innerHTML.substring(0, document.getElementById("console").innerHTML.length - 1);
		await Sleep(Random(15, 60));
	}
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
	document.getElementById("console").innerHTML = " ";
	document.getElementById("console").style.setProperty('--color', "#fff");
	document.getElementById("launch").addEventListener("click", async () => {
		const text = document.getElementById("data").value;
		const type = document.getElementById("type").value;
		const color_type = document.getElementById("color_type").value;
		
		Colors[color_type]();
		
		document.getElementById("console").innerHTML = " ";
		
		await Sleep(3000);
		
		Execute(text, type);
	});
});