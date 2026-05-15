let btnaddstudent = document.getElementById('btnaddstudent')

 btnaddstudent.addEventListener('click', () => {
 let txtfname = document.getElementById("txtfname").value
 let txtlname = document.getElementById("txtlname").value
 let txtemail = document.getElementById("txtemail").value

	
	if(txtfname == ""|| txtemail == "" ){
		alert("Name and email must be filled")
	}else{
		
			let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
			let status = document.querySelector("select").value;
			let timenow =Date.now();
			let role ="Student"
			let autopassword = "12345678"
			let user = firebase.auth().currentUser;
            let createdby =user.email
			firebase.auth().createUserWithEmailAndPassword(txtemail,autopassword)
			.then((UserCredentials) => {
				 firebase.database().ref('userDetails/' + emailid).set({
					FirstName:txtfname,
					LastName:txtlname,
					Email:txtemail,
					Status: status,
					createdBy:createdby,
					Role: role,
					createdOn: timenow
				});
			     alert ("New student added password is 12345678 and username is email")	
			})
			.catch((error) => {
				console.log(error)
				alert(error.message)
			});

	}

 });


 function loaddata(){
 	let tablebody =document.getElementById('tablebody')

 	firebase.database().ref("userDetails").on("value",(snapshot) =>{
 		tablebody.innerHTML =""

 		snapshot.forEach((childSnapshot) =>{
 			let data =childSnapshot.val()
 			let key =childSnapshot.key

 			if(data.Status =="active" && data.Role == "Student"){
 				tablebody.innerHTML += `
 					 <tr>
               <td>${data.Email}</td>
               <td>${data.FirstName}</td>
              <td>${data.LastName}</td>
              <td>
               <button class="btn btnred" onclick =" Suspendstudent('${key}')">Suspend</button>
            </td>
          </tr>
 				`
 			}
 		})

 	})
 }

 loaddata();


 function Suspendstudent(studentid){
 	let confirmSuspend =confirm("Are you sure you want to suspend this student?")
 	if(!confirmSuspend) return;
 	firebase.database().ref("userDetails/" + studentid).update({
 		Status: "inactive"
 	})
 	.then(() =>{
 		alert("Student suspended")
 	})
     .then((error) =>{
     	alert("Error while suspending")
     })

 }




//activation


function loaddatainactive(){
 	let tablebody =document.getElementById('tablebodyinactive')

 	firebase.database().ref("userDetails").on("value",(snapshot) =>{
 		tablebody.innerHTML =""

 		snapshot.forEach((childSnapshot) =>{
 			let data =childSnapshot.val()
 			let key =childSnapshot.key

 			if(data.Status =="inactive" && data.Role == "Student"){
 				tablebody.innerHTML += `
 					 <tr>
               <td>${data.Email}</td>
               <td>${data.FirstName}</td>
              <td>${data.LastName}</td>
              <td>
               <button class="btn btngreen" onclick =" Activatestudent('${key}')">Activate</button>
            </td>
          </tr>
 				`
 			}
 		})

 	})
 }

 loaddatainactive();


 function Activatestudent(studentid){
 	let confirmActivate =confirm("Are you sure you want to activate this student?")
 	if(!confirmActivate) return;
 	firebase.database().ref("userDetails/" + studentid).update({
 		Status: "active"
 	})
 	.then(() =>{
 		alert("Student activated")
 	})
     .then((error) =>{
     	alert("Error while activating")
     })

 }




let lbltotalactive = document.getElementById('lbltotalactive')
firebase.database().ref("userDetails").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active" && data.Role == "Student"){
      total++
    }

  })
  lbltotalactive.innerHTML = total
})
// inactive 
let lbltotalinactive = document.getElementById('lbltotalinactive')
firebase.database().ref("userDetails").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "inactive" && data.Role == "Student"){
      total++
    }
    })
  lbltotalinactive.innerHTML = total
})

