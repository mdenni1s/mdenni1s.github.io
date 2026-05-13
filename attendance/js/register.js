let btncreate = document.getElementById('btncreate')

btncreate.addEventListener('click', () =>{
    let txtfname =document.getElementById("txtfname").value
	let txtlname =document.getElementById("txtlname").value
	let txtemail =document.getElementById("txtemail").value
	let txtpass =document.getElementById("txtpass").value
	let txtconpass =document.getElementById("txtconpass").value

	if(txtfname == ""|| txtemail == "" || txtpass ==""){
		alert("Name and email must be filled")
	}else{
		if  (txtpass ==txtconpass) {
			let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
			let status = "inactive"
			let timenow =Date.now();
			let role ="Admin"
			firebase.auth().createUserWithEmailAndPassword(txtemail,txtpass)
			.then((UserCredentials) => {
				 firebase.database().ref('userDetails/' + emailid).set({
					FirstName:txtfname,
					LastName:txtlname,
					Email:txtemail,
					Status: status,
					createdBy:txtemail,
					Role: role,
					createdOn: timenow
				});
			     alert ("Account Created")	
			})
			.catch((error) => {
				console.log(error)
				alert(error.message)
			});
		}else{
			alert ('password do not match')
	 }
	}

 });
