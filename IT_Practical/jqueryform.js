$(document).ready(function () {
    $("#f1").on('click',function(){
        // e.preventDefault();
        $("body").css("background-color ", "beige");
        const   jqueryform = {};
        jqueryform.Name = $("#username").val();
        jqueryform.LASTNAME = $("#lname").val();
        jqueryform.DOB = $("#dob").val();
        jqueryform.ROLLNO = $("#roll").val();
        jqueryform.GENDER = $("#p4").val();
        jqueryform.MOBILE= $("#mno").val();
        jqueryform.EMAIL = $("#email").val();
        jqueryform.ADDRESS = $("#add").val();
        jqueryform.COURSE = $("#course").val();
        console.log(jqueryform.Name);
        
 
 
    })});