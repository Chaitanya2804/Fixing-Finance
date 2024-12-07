const canvas = document.getElementById("data-set");
const context = canvas.getContext("2d");
const line = new Chart(context,{});

// Corrected IDs in accordance with the form
const initialAmount = document.getElementById("initial"); 
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");


const button = document.querySelector(".input-group button"); 

// Attach an event listener
button.addEventListener("click", calculateGrowth); 
let chart = null;

function calculateGrowth(e) {
    e.preventDefault();

    try {
        const initial = parseInt(initialAmount.value); 
        const period = parseInt(years.value); 
        const interest = parseInt(rates.value);
        const comp = parseInt(compound.value); 

        const data = [];
        const labels = [];

        for (let i = 1; i <= period; i++) {
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i); 
            data.push(final);
            labels.push("Year " + i); 
        }

        drawGraph(labels, data);

    } catch (error) {
        console.error(error);
    }
}

function drawGraph(labels, data){
    if (chart) {
        chart.destroy(); 
    }

    chart = new Chart(context,{
        type: 'line',
        data: {
            labels,
            datasets :[{
                label: "compound",  
                data,
                fill: true,
                backgroundColor: "rgba(12,141,0,0.7)", 
                borderWidth: 3 
            }]
        }
    }); 
}
