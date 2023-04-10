<!-- <!DOCTYPE html>
<html>
 <head>
  <title>Treemap</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.css" />
  
  <style>
  </style>
 </head>
 <body>
  <br /><br />
  <div class="container" style="width:900px;">
   <h2 align="center">Adolescents</h2>
   <br /><br />
   <div id="treeview"></div>
  </div>
 </body>
</html>

<script>
$(document).ready(function(){
 $.ajax({ 
   url: "fetch.php",
   method:"POST",
   dataType: "json",       
   success: function(data)  
   {
  $('#treeview').treeview({data: data});
   }   
 });
 
});
</script> -->



<!DOCTYPE html>
<html>
 <head>
  <title>Treemap</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.css" />
  
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Poiret+One&display=swap");

* {
  font-family: "Poiret One", cursive;
  font-weight: bold;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

li,
p,
a {
  font-size: 1.6rem;
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3.5rem;
}

h3 {
  font-size: 3rem;
}

.row {
  margin: 0;
}

.navbar-style {
  background-color: #f8f9fa;
  box-shadow: 2px 4px 13px 1px rgba(8, 8, 8, 0.04);
}

#logo {
 
  display: initial;
  font-weight: 600;
  font-size: 3.5rem;
  letter-spacing: 1px;
  text-transform: capitalize;
  color: #fd5c63;
  text-shadow: 2px 5px 3px rgba(0, 0, 0, 0.06);
  padding: 0;
}

.navbar-light .navbar-nav .nav-link {
  color: #525252;
  text-transform: capitalize;
  letter-spacing: 0.1rem;
  padding-left: 1rem;
  font-size: 1.9rem;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: #fd5c63;
}

.btn{
    background-color:rgb(231, 169, 138) ;
    color:white;
}

.navbar-brand{
  padding: top 10px;
}


  </style>
 </head>
 <body>
  <br>
<div class="container-fluid navbar-style py-3">
        <div class="row">
       <div class="col-md-10 col col-12 mx-auto">
               <nav class="navbar navbar-expand-lg navbar-light bg-light">
                   <a class="navbar-brand" href="/" id="logo"> SAATHI </a>
                   <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
                   </button> -->
                   <div class="collapse navbar-collapse" id="navbarSupportedContent">
                   <ul class="navbar-nav ml-auto">
                       <a class="nav-item active">
                       <a class="nav-link" href="/">Home</a>
                       </a>
                                  
                   </ul>
                   </div>
               </nav>
         </div>
         </div>
           </div>

  <br /><br />

  <div class="container" style="width:900px;">
   <h2 align="center">Adolescents</h2>
   <br /><br />
   <div id="treeview"></div>
  </div>
 </body>
</html>

<script>
$(document).ready(function(){
 $.ajax({ 
   url: "fetch.php",
   method:"POST",
   dataType: "json",       
   success: function(data)  
   {
  $('#treeview').treeview({data: data});
   }   
 });
 
});
</script>
