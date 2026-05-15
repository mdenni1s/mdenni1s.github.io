
let totalAdmins = 0
let totalStudents = 0
firebase.database().ref("userDetails").once("value", function(snapshot){
	
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Role == "Admin"){
		totalAdmins++
		
         }else{
         	totalStudents++
           
         }

	})
	  //display total count
       drawbargraph()

})


function drawbargraph(){
	const canvasforbargraph = document.getElementById("mybargraph")
	new Chart(canvasforbargraph, {
		type :'bar',
		data:{
			labels : ['Admins','Students'],
			datasets :[{
				label : "System users",
				data: [totalAdmins, totalStudents],
				borderWidth :1
			}]
		},
		options :{
           responsive: true,
           scale:{
           	y:{
           		beginZero:true
           	}
           }
		}
	})
}


//courses pie
let totalactivecourses = 0
let totalinactivecourses = 0
firebase.database().ref("Courses").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active"){
      totalactivecourses++
    }else{
    	totalinactivecourses++
    }

  })
 //show data 
   coursespie();
})


function coursespie(){
	const canvasforcourses = document.getElementById("mypiecourses")
	new Chart(canvasforcourses, {
		type : 'pie',
		data : {
			labels:["Active", "Inactive"],
			datasets: [{
				data:[totalactivecourses,totalinactivecourses]
			}]
		}
	})
}

//admins donut
 let totalActiveAdmins = 0
 let totalInactiveAdmins = 0
firebase.database().ref("userDetails").once("value", function(snapshot){
	
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if ( data.Status =="active" && data.Role == "Admin"){
		totalActiveAdmins++
		
         }else if( data.Status =="inactive" && data.Role == "Admin"){
         	totalInactiveAdmins++
         }

	})
	  //display total count
         admindoughnut()

})

function admindoughnut(){
	const canvasforadmins = document.getElementById("mydoughnutadmins")
	new Chart(canvasforadmins, {
		type : 'doughnut',
		data : {
			labels:["Active Admins", "Inactive Admins"],
			datasets: [{
				data:[totalActiveAdmins,totalInactiveAdmins]
				
			}]
		}
	})
}

// venus graph

let totalActiveGps = 0
let totalInactiveGps = 0
firebase.database().ref("GpsVenus").once("value", function(snapshot){
	
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Status == "active"){
		totalActiveGps++
		
         }else{
         	totalInactiveGps++
           
         }

	})
	  //display total count
       drawgpsbargraph()

})


function drawgpsbargraph(){
	const canvasforgpsbargraph = document.getElementById("mygpsbargraph")
	new Chart(canvasforgpsbargraph, {
		type :'bar',
		data:{
			labels : ['Active Gps','Inactive Gps'],
			datasets :[{
				label : "Venus",
				data: [totalActiveGps, totalInactiveGps],
				borderWidth :1
			}]
		},
		options :{
           responsive: true,
           scale:{
           	y:{
           		beginZero:true
           	}
           }
		}
	})
}


function handlePrint() {
    console.log("Preparing document...");
    

    window.print();
}