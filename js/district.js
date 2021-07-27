//message
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')
const messageFour = document.getElementById('message-4')
const messageFive = document.getElementById('message-5')
const messageSix = document.getElementById('message-6')

const districtInput = document.getElementById('districtInput')
const section = document.querySelector('section')
const error = document.getElementById('error')
const dateSpan = document.getElementById('dateSpan')
const dateDiv = document.getElementById('datediv')
const statesInput = document.getElementById('statesDropdown')
const loading = document.getElementById('loading')
const statesDropdown = document.querySelector('#states')
const districtsDropdown = document.querySelector('#districtsDropdown')

var wholeData;
function district(){    
    fetch('https://api.covid19india.org/state_district_wise.json').then((response)=>{
        response.json().then((data)=>{
            wholeData = data;
            let states = Object.keys(data)
            let stateHTML = '<option> Please Select your state</option>'
            let p;
            for(p = 1; p < states.length; p++){
                stateHTML += `<option value = "${states[p]}">${states[p]}</option>`
            }
            statesDropdown.innerHTML = stateHTML
            loading.textContent = ''
            statesInput.style.display = "block";
        })
    }).catch((error)=>{
        loading.textContent = 'failed to load. Please check your connection!'
    })

    statesDropdown.addEventListener('change', districtState)
}
district();

function districtState(){
    section.style.display = "none";
    if(!wholeData[statesDropdown.value]){
        return districtsDropdown.textContent = "please select a valid option"
    }

    districts = Object.keys(wholeData[statesDropdown.value].districtData)
    districtsData = wholeData[statesDropdown.value].districtData

    districtHTML = '<label>District:  </label><select name="districts" id="districts">'
    let p;
    for(p=0; p<districts.length; p++){
        districtHTML += `<option value = "${districts[p]}">${districts[p]}</option>`
    }
    districtHTML += '</select>'
    districtsDropdown.innerHTML = districtHTML
    
    document.getElementById('districts').addEventListener('change', ()=>{
        districtName = document.getElementById('districts').value
        var data = districtsData[districtName];
        messageOne.textContent = data.confirmed;
        messageTwo.textContent = data.deceased;
        messageThree.textContent = data.recovered;
        messageFour.textContent = data.delta.confirmed;
        messageFive.textContent = data.delta.deceased;
        messageSix.textContent = data.delta.recovered;
        section.style.display = "block";
    })
}

let districts;
let stateHTML;
let districtsData;
let districtName;

function india(){
    loading.textContent = 'loading...'
    districtInput.style.display = "none"
    section.style.display = "none"
    fetch('https://api.covid19india.org/data.json').then((response)=>{
    response.json().then((indiadata)=>{
        var data = indiadata.statewise[0]
        console.log(data)
            loading.textContent = 'Last Updated:' + data.lastupdatedtime
            messageOne.textContent = data.confirmed;
            messageTwo.textContent = data.deaths;
            messageThree.textContent = data.recovered;
            messageFour.textContent = data.deltaconfirmed;
            messageFive.textContent = data.deltadeaths;
            messageSix.textContent = data.deltarecovered;
            section.style.display = "block";
    })
    })
}

let stateData;
function state(){
    statesDropdown.removeEventListener('change', districtState)
    districtInput.style.display = "block"
    section.style.display = "none";
    districtsDropdown.textContent = ''
    fetch('https://api.covid19india.org/data.json').then((response)=>{
    response.json().then((data)=>{
        stateData = data.statewise;
        let states = stateData
        let stateHTML = '<option value="notallowed"> Please Select your state</option>'
        let p;
        for(p = 1; p < states.length; p++){
            var statename = states[p].state
            stateHTML += `<option value = "${p}">${statename}</option>`
        }
        statesDropdown.innerHTML = stateHTML
        loading.textContent = ''
        statesInput.style.display = "block";
    })
}).catch((error)=>{
    loading.textContent = 'failed to load. Please check your connection!'
    // console.log('failed to load. Please check your connection!')
})

statesDropdown.addEventListener('change', statestate)
}

function statestate(){

        // section.style.display = "none";
        if(statesDropdown.value === "notallowed"){
            loading.textContent = ''
            return districtsDropdown.textContent = "please select a valid option"
        }
            var index = parseInt(statesDropdown.value)
            var data = stateData[index]
            for(i=1; i < data.length; i++){
                if(data[i].state == statesDropdown.value){
                    data = data[i]
                }
            }
            console.log(data)
            districtsDropdown.textContent = ""
                loading.textContent = 'Last Updated:' + data.lastupdatedtime
                messageOne.textContent = data.confirmed;
                messageTwo.textContent = data.deaths;
                messageThree.textContent = data.recovered;
                messageFour.textContent = data.deltaconfirmed;
                messageFive.textContent = data.deltadeaths;
                messageSix.textContent = data.deltarecovered
                section.style.display = "block";
}