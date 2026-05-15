//count total users
let lblTotalStudents = document.getElementById('lblTotalStudents')
firebase.database().ref("userDetails").once("value", function(snapshot){
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		total++

	})
	lblTotalStudents.innerHTML = total
})

//count total courses
let lblTotalCourses = document.getElementById('lblTotalCourses')
firebase.database().ref("Courses").once("value", function(snapshot){
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		total++

	})
	lblTotalCourses.innerHTML = total
})


// count total lecturers
let lblTotalLectures = document.getElementById('lblTotalLectures')
firebase.database().ref("userDetails").once("value", function(snapshot){
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Role == "Admin"){
		total++
         }

	})
	lblTotalLectures.innerHTML = total
})


// count total approvals for all suspended accounts
let lblTotalApprovals = document.getElementById('lblTotalApprovals')
firebase.database().ref("userDetails").once("value", function(snapshot){
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Status == "inactive"){
		total++
         }

	})
	lblTotalApprovals.innerHTML = total
})