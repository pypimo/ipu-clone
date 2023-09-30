/*TABLE*/
async function loadIntoTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const { headers, rows } = await response.json();
    // const data = await response.json();
    // console.log(data);

    // empty table
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const head of headers) {
        const headEle = document.createElement("th");
        headEle.textContent = head;
        tableHead.querySelector("tr").appendChild(headEle);
    }

    for (const row of rows) {
        const rowEle = document.createElement("tr");
        for (const cellTxt of row) {
            const cellEle = document.createElement("td");
            cellEle.textContent = cellTxt;
            rowEle.appendChild(cellEle);
        }
        tableBody.appendChild(rowEle);
    }
}

/*GRAPH*/
async function getChart(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    length = data.rows.length;
    console.log(length);
    values = [];
    labels = [];
    for (i = 0; i < length; i++) {
        values.push(data.rows[i][3]);
        labels.push(data.rows[i][1]);
    }  

    let chartStatus = Chart.getChart("line-chart"); // <canvas> id
    if (chartStatus != undefined) {
    chartStatus.destroy();
    }
    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
                data: values,
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'blue'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                  display: false
                }
            },
            hover: {
               mode: 'nearest',
               intersect: false
            },
            scales: {
                x : {
                    ticks : {
                        display: false
                    },
                    grid: {
                        display: false
                      }
                }
            }
        }
    });
}

function myFunction() {
    const message = "Sorry! Only USICT B.Tech. Results are available right now. Other results will be availble soon :)";
    alert(message);
}


function showSection() {
    document.getElementById("results-display").style.display = "block";
}

function hideSection() {
    document.getElementById("hide-display").style.display = "none";
}


let loginForm = document.getElementById("selection-bar");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const clg = document.getElementById("colleges");
    const year = document.getElementById("year");
    const branch = document.getElementById("branch");
    const fileName = clg.value + "-" + year.value + "-" + branch.value + ".json";
    
    // perform operation with form input
    // alert("This form has been successfully submitted!");
    console.log(`This displays results of ${clg.value} for the batch of ${year.value} for the branch ${branch.value}`);
    showSection();
    hideSection();
    loadIntoTable(fileName, document.querySelector("table"));
    getChart(fileName);
});

function dropdown() {
    var ele = document.getElementById("menu");
    if (ele.style.display==="none") {
        ele.style.display= "block";
    } else {
        ele.style.display = "none";
    }
    console.log("working!!");
}



