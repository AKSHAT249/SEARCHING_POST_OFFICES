
let ip;
let info;
let postoffices;

document.addEventListener("DOMContentLoaded", function() {
    // Fetch the IP address from the API
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            // Display the IP address on the screen
            console.log(data)
            ip = data.ip;

            

            console.log(ip);
            document.getElementById("ip-address").innerHTML = data.ip;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
        });
});

let pincode;

document.getElementById("btn").addEventListener("click" , () => {

    fetch(`https://ipapi.co/${ip}/json/`).then( response=> response.json() ).then( (data) => info = data).then( () => {
        console.log(info);
        pincode = info.postal;
        console.log("postal", pincode);
        document.getElementById("body").innerHTML = ""
        document.getElementById("body").innerHTML += `
        <div style="background-color:black; width:1400px; display:flex; flex-direction:column; gap:10px; padding:20px;" >
            <h1 style="color:#B8BCCC">IP Address : <span style="color:white"> ${ip}</span></h1>
            <div style="display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-around;">
                <p style="color:#B8BCCC">Lat: <span style="color:white;">${info.latitude}</span></p>
                <p style="color:#B8BCCC">City: <span style="color:white;">${info.city}</span></p>
                <p style="color:#B8BCCC">Organisation: <span style="color:white;">${info.org}</span></p>
            </div>
            <div style="display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-around; ">
                <p style="color:#B8BCCC">Long: <span style="color:white;">${info.longitude}</span></p>
                <p style="color:#B8BCCC">Region: <span style="color:white;">${info.region}</span></p>
                <p style="color:#B8BCCC">Hostname: <span style="color:white;">${info.asn}</span></p>
            </div>
            <div style="width:1400px; display:flex; flex-direction:column; background-color:#575A85; align-items:center; padding:50px;">
                <h1 style="color:#B8BCCC; align-items:center;">Your Current Location</h1>
                <iframe src="https://maps.google.com/maps?q=${info.latitude}, ${info.longitude}&z=15&output=embed" width="1390px" height="700px" frameborder="0" style="border:0; padding:20px;"></iframe>
            </div>
            
        </div>
    
    `

    fetch(`https://api.postalpincode.in/pincode/${pincode}`).then( response => response.json() ).then( (data) => {
        console.log(data);
        postoffices = data[0].PostOffice;
        console.log("all post offices", postoffices);
        document.getElementById("body").innerHTML += `
            <div style="background-color:black; display:flex; flex-direction:column; padding:20px;">
                <h1 style="text-align:center; color:#B8BCCC;">More Information About You</h1>
                <p style="color:#B8BCCC;" >Time Zone: <span style="color:white;">${info.timezone}</span> </p>
                <p style="color:#B8BCCC;" >Date and Time: <span style="color:white;">${new Date()}</span> </p>
                <p style="color:#B8BCCC;" >Pincode: <span style="color:white;">${pincode}</span> </p>
                <p style="color:#B8BCCC;" >Message: <span style="color:white;">${data[0].Message}</span>  </p>
            </div>
            <div style="background-color:black; padding:20px;"  >
                <h1 style="color:#B8BCCC; text-align:center;">Post Offices Near You</h1>
                <input style="color:white; align:center; border: 3px solid #575A85 " placeholder="Search By Name" />
                <div id="posts" style="display:flex; background-color:black; flex-wrap:wrap; justify-content:space-around; flex-direction:row; padding:20px; gap:20px;">
                </div>
            </div>
        
        `

        postoffices.map( (item,index) => {
            console.log(item)
            return ( document.getElementById("posts").innerHTML += `
            <div style="display:flex; background-color:#575A85; width:450px; height: 330px; flex-direction:column; gap:20px; padding:20px;">
                <p style="color:white;">${item.Name}</p>
                <p style="color:white;">${item.BranchType}</p>
                <p style="color:white;">${item.DeliveryStatus}</p>
                <p style="color:white;">${item.District}</p>
                <p style="color:white;">${item.Division}</p>
            </div>
            `
        )})
    });
    
    



    } )
    // console.log(info)

    

})