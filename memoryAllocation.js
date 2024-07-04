let ana=[];
let holes=[];
let cpyHoles=[];
let processes=[];
let notCompelete=[];
let chart="",chart2="",chart3="",chart4="",chart5="";
// let resultTable = "<table class='output'><tr><th>Algo.</th><th>Total HoleSize(kb)</th><th>Min Hole(kb)</th><th>Max Hole(kb)</th><th>Not Allocated</th></tr>";

function displayInputTable(){
    let size = document.getElementById('nholes').value;
    var table = "<table class='input'><tr><th>Holes</th><th>Hole Size(kb)</th></tr>";
    for(let i=0; i<size; i++){
        table += "<tr>";
        table += "<td class='td'>"+"H"+(i+1)+"</td>";
        table += "<td><input type='number' id='holeSize"+(i+1)+"'></td>";
        table += "</tr>";
    }
    table += "</table>";
    var saveData = "<button>Save Data</button>";
    document.getElementById('inputTable').innerHTML=table;
    document.getElementById('save').innerHTML=saveData;
}

function saveDataHole(){
    chart=`<h2 style='color:#000'>Memory: &nbsp;</h2>`
    let size = document.getElementById('nholes').value;
    holes = []; 
    
    for (let i = 0; i < size; i++) {
        let hole = {};
        hole.holeId = "H" + (i + 1);
        hole.holeSize = parseInt(document.getElementById('holeSize'+ (i+1)).value);
        holes.push(hole);
        chart += `<div class='chart'><div class='hole'>${holes[i].holeSize} kb</div></div>`;
        if(i!=size-1) chart += `<div class='chart pro'>P</div>`;
    }
    document.getElementById('gainchart').innerHTML = chart;
    cpyHoles=JSON.parse(JSON.stringify(holes));
    // cpyHoles=holes;
    
    let process=`<hr width='100%'><br><div class="input">
    <label for="nprocess">Enter the number of Process: </label>
    <input type="number" name="nprocess" id="nprocesses"><br><br>
    <button id="inputButton" onclick="displayTable()"> Get Process Input Table</button>
    </div>`
    document.getElementById('processInput').innerHTML=process;
}
                
function displayTable(){
    let size = document.getElementById('nprocesses').value;
    let table = "<table class='input'><tr><th>Processes</th><th>Process Size(kb)</th></tr>";
    for(let i=0; i<size; i++){
        table += "<tr>";
        table += "<td class='td'>"+"P"+(i+1)+"</td>";
        table += "<td><input type='number' id='processSize"+(i+1)+"'></td>";
        table += "</tr>";
    }
    table += "</table>";
    var saveData = "<button>Save Data</button>";
    document.getElementById('processInputTable').innerHTML=table;
    document.getElementById('processesInput').innerHTML=saveData;
}

function saveDataProcess(){
    if(chart2===""){
        chart2=`<h2 style='color:#000'>Memory(FirstFit): &nbsp;</h2>`;
        chart3=`<h2 style='color:#000'>Memory(NextFit): &nbsp;</h2>`;
        chart4=`<h2 style='color:#000'>Memory(BestFit): &nbsp;</h2>`;
        chart5=`<h2 style='color:#000'>Memory(WrostFit): &nbsp;</h2>`;
        let size = document.getElementById('nprocesses').value;
        processes = []; 
        
        for (let i = 0; i < size; i++) {
            let process = {};
            process.processId = "P" + (i + 1);
            process.processSize = parseInt(document.getElementById('processSize'+ (i+1)).value);
            processes.push(process);
        }
        for(let i=0; i<holes.length; i++){
            chart2 += `<div class='chart' id='FF${holes[i].holeId}'><div class='hole' id='F${holes[i].holeId}'>${holes[i].holeSize} kb</div></div>`;
            if(i!=holes.length-1) chart2 += `<div class='chart pro'>P</div>`;
            chart3 += `<div class='chart' id='NF${holes[i].holeId}'><div class='hole' id='N${holes[i].holeId}'>${holes[i].holeSize} kb</div></div>`;
            if(i!=holes.length-1) chart3 += `<div class='chart pro'>P</div>`;
            chart4 += `<div class='chart' id='BF${holes[i].holeId}'><div class='hole' id='B${holes[i].holeId}'>${holes[i].holeSize} kb</div></div>`;
            if(i!=holes.length-1) chart4 += `<div class='chart pro'>P</div>`;
            chart5 += `<div class='chart' id='WF${holes[i].holeId}'><div class='hole' id='W${holes[i].holeId}'>${holes[i].holeSize} kb</div></div>`;
            if(i!=holes.length-1) chart5 += `<div class='chart pro'>P</div>`;
        }
        document.getElementById('fgaintchart').innerHTML = chart2;
        document.getElementById('ngaintchart').innerHTML = chart3;
        document.getElementById('bgaintchart').innerHTML = chart4;
        document.getElementById('wgaintchart').innerHTML = chart5;

        // FirstFit algo.
        ana=[]
        notCompelete=[];
        holes=JSON.parse(JSON.stringify(cpyHoles));
        for(let i=0; i<processes.length; i++){
            let diff,idx=-1,j;
            for(j=0; j<holes.length; j++){
                diff=holes[j].holeSize-processes[i].processSize;
                if(diff>=0){
                    idx=j;
                    holes[idx].holeSize-=processes[i].processSize;
        
                    let fill=document.getElementById(`F${holes[idx].holeId}`);
                    fill.innerText=`${holes[idx].holeSize} kb`;
        
                    let div=document.getElementById(`FF${holes[idx].holeId}`);
                    let child=document.createElement("div");
                    child.setAttribute('class','pro');
                    child.innerText=`P${i+1}`;
                    div.appendChild(child);
                    break;
                }
            }
            if(idx!=j) notCompelete.push(`P${i+1}`)
        }
        let min=Infinity,max=-1,sum=0,analysis={};
        for(let i=0; i<holes.length; i++){
            sum+=holes[i].holeSize;
            if(holes[i].holeSize>0 && holes[i].holeSize<min) min=holes[i].holeSize;
            if(holes[i].holeSize>max) max=holes[i].holeSize;
        }
        if(min>sum) min=0;
        analysis.name="FirstFit";
        analysis.totalHole=sum;
        analysis.minHole=min;
        analysis.maxHole=max;
        analysis.notAllotted=notCompelete;
        if(notCompelete.length==0) analysis.notAllotted=0;
        ana.push(analysis);

        // NextFit algo.
        notCompelete=[];
        holes=JSON.parse(JSON.stringify(cpyHoles));
        let j=0,t=holes.length-1,idx=0,prevIdx=0;
        for(let i=0; i<processes.length; i++){
            let diff;
            j=prevIdx;
            while(true){
                diff=holes[j].holeSize-processes[i].processSize;
                if(diff>=0){
                    idx=j;
                    prevIdx=j;
                    holes[idx].holeSize-=processes[i].processSize;
                    
                    let fill=document.getElementById(`N${holes[idx].holeId}`);
                    fill.innerText=`${holes[idx].holeSize} kb`;
                    
                    let div=document.getElementById(`NF${holes[idx].holeId}`);
                    let child=document.createElement("div");
                    child.setAttribute('class','pro');
                    child.innerText=`P${i+1}`;
                    div.appendChild(child);
                    break;
                }
                j=(j+1)%holes.length;
                if(j==prevIdx){
                    notCompelete.push(`P${i+1}`);
                    break;
                }
            }
        }
        min=Infinity,max=-1,sum=0,analysis={};
        for(let i=0; i<holes.length; i++){
            sum+=holes[i].holeSize;
            if(holes[i].holeSize>0 && holes[i].holeSize<min) min=holes[i].holeSize;
            if(holes[i].holeSize>max) max=holes[i].holeSize;
        }
        if(min>sum) min=0;
        analysis.name="NextFit"
        analysis.totalHole=sum;
        analysis.minHole=min;
        analysis.maxHole=max;
        analysis.notAllotted=notCompelete;
        if(notCompelete.length==0) analysis.notAllotted=0;
        ana.push(analysis);

        // BestFit algo.
        notCompelete=[];
        holes=JSON.parse(JSON.stringify(cpyHoles));
        for(let i=0; i<processes.length; i++){
            let diff,idx=-1;
            min=Infinity;
            for(let j=0; j<holes.length; j++){
                diff=holes[j].holeSize-processes[i].processSize;
                if(diff>=0 && diff<min){
                    min=diff;
                    idx=j;
                }
            }
            if(min!=Infinity && min>=0){
                holes[idx].holeSize-=processes[i].processSize;

                let fill=document.getElementById(`B${holes[idx].holeId}`);
                fill.innerText=`${holes[idx].holeSize} kb`;

                let div=document.getElementById(`BF${holes[idx].holeId}`);
                let child=document.createElement("div");
                child.setAttribute('class','pro');
                child.innerText=`P${i+1}`;
                div.appendChild(child);
            }
            else notCompelete.push(`P${i+1}`);
        }
        min=Infinity,max=-1,sum=0,analysis={};
        for(let i=0; i<holes.length; i++){
            sum+=holes[i].holeSize;
            if(holes[i].holeSize>0 && holes[i].holeSize<min) min=holes[i].holeSize;
            if(holes[i].holeSize>max) max=holes[i].holeSize;
        }
        if(min>sum) min=0;
        analysis.name="BestFit"
        analysis.totalHole=sum;
        analysis.minHole=min;
        analysis.maxHole=max;
        analysis.notAllotted=notCompelete;
        if(notCompelete.length==0) analysis.notAllotted=0;
        ana.push(analysis);

        // WrostFit algo.
        notCompelete=[];
        holes=JSON.parse(JSON.stringify(cpyHoles));
        for(let i=0; i<processes.length; i++){
            let max=-1,idx=-1;
            for(let j=0; j<holes.length; j++){
                if(holes[j].holeSize>max){
                    max=holes[j].holeSize;
                    idx=j;
                }
            }
            if(max>=processes[i].processSize){
                holes[idx].holeSize-=processes[i].processSize;
    
                let fill=document.getElementById(`W${holes[idx].holeId}`);
                fill.innerText=`${holes[idx].holeSize} kb`;
    
                let div=document.getElementById(`WF${holes[idx].holeId}`);
                let child=document.createElement("div");
                child.setAttribute('class','pro');
                child.innerText=`P${i+1}`;
                div.appendChild(child);
            }
            else notCompelete.push(`P${i+1}`);
        }
        min=Infinity,max=-1,sum=0,analysis={};
        for(let i=0; i<holes.length; i++){
            sum+=holes[i].holeSize;
            if(holes[i].holeSize>0 && holes[i].holeSize<min) min=holes[i].holeSize;
            if(holes[i].holeSize>max) max=holes[i].holeSize;
        }
        if(min>sum) min=0;
        analysis.name="WrostFit"
        analysis.totalHole=sum;
        analysis.minHole=min;
        analysis.maxHole=max;
        analysis.notAllotted=notCompelete;
        if(notCompelete.length==0) analysis.notAllotted=0;
        ana.push(analysis);


        document.getElementById("hl").style.display="block";
        // let min=Infinity,max=-1,sum=0;
        // for(let i=0; i<holes.length; i++){
        //     sum+=holes[i].holeSize;
        //     if(holes[i].holeSize>0 && holes[i].holeSize<min) min=holes[i].holeSize;
        //     if(holes[i].holeSize>max) max=holes[i].holeSize;
        // }
        let resultTable = "<table class='output'><tr><th>Algo.</th><th>Total HoleSize(kb)</th><th>Max Hole(kb)</th><th>Min Hole(kb)</th><th>Not Allocated</th></tr>";
        for(let i=0; i<ana.length; i++){
            resultTable += `<tr><td>${ana[i].name}</td><td>${ana[i].totalHole}</td><td>${ana[i].maxHole}</td><td>${ana[i].minHole}</td><td>${ana[i].notAllotted}</td></tr>`;
        }
        console.log(resultTable);
        document.getElementById('outputTable').innerHTML = resultTable;


        let efficient=document.getElementById("analysis");
        efficient.style.display="block";

        min=Infinity;
        let sameAllotted=[];
        for(let i=0; i<ana.length; i++){
            if(min>ana[i].notAllotted.length){
                min=ana[i].notAllotted.length;
                sameAllotted=[];
            }
            if(min==ana[i].notAllotted.length) sameAllotted.push(`${i}`);
        }
        max=-1;
        let sameAllottedMaxHole=[];
        if(sameAllotted.length!=1){
            for(let i=0; i<sameAllotted.length; i++){
                if(ana[sameAllotted[i]].maxHole>max){
                    max=ana[sameAllotted[i]].maxHole;
                    sameAllottedMaxHole=[];
                }
                if(max==ana[sameAllotted[i]].maxHole) sameAllottedMaxHole.push(`${i}`);
            }
            min=Infinity;
            let sameAllottedMinHole=[];
            if(sameAllottedMaxHole.length!=1){
                for(let i=0; i<sameAllottedMaxHole.length; i++){
                    if(ana[sameAllottedMaxHole[i]].minHole<min){
                        min=ana[sameAllottedMaxHole[i]].minHole;
                        sameAllottedMinHole=[];
                    }
                    if(min==ana[sameAllottedMaxHole[i]].minHole) sameAllottedMinHole.push(`${i}`);
                }
                /*sameAllottedMinHole vala jetla hoy e badha.*/
            }
            else {/* je hoy ane print karay devanu. (1 sameAllottedMaxHole valu)*/}
        }
        else {/* je ek hoy ane print karay devanu.(1 sameAllotted valu)*/}

        // let totalHoleSize=document.createElement("h2");
        // totalHoleSize.innerText=`Total Holes Size of the memory: ${sum} kb`;
        // analysis.appendChild(totalHoleSize);
        // let minHole=document.createElement("h2");
        // minHole.innerText=`Minimum Hole Size of the memory: ${min} kb`;
        // analysis.appendChild(minHole);
        // let maxHole=document.createElement("h2");
        // maxHole.innerText=`Maximum Hole Size of the memory: ${max} kb`;
        // analysis.appendChild(maxHole);
        document.getElementById("author").innerHTML="by Urmil Gadhiya(22BCE092)";
    }
}