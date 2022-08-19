// USING DATE RANGE PICKER TO DISABLE DATES

var start = moment();
var end = moment();
//
function cb(started, ended) {
  if (dateId) {
    $(`#${dateId}`)
      .children("span")
      .html(started.format("DD/MM/YYYY") + " - " + ended.format("DD/MM/YYYY"));
  }

  if (carryId) {
    $(`#book_${carryId}`)
      .children("span")
      .html(started.format("DD/MM/YYYY") + " - " + ended.format("DD/MM/YYYY"));
  }

  pwp.date_range = {
    start: started.format("DD/MM/YYYY"),
    end: ended.format("DD/MM/YYYY"),
  };
  console.log(my_id ? my_id : carryId);
  newObj[my_id ? my_id : carryId].book_date = pwp.date_range;

  let s = started.format("DD/MM/YYYY").split("/").reverse();
  let e = ended.format("DD/MM/YYYY").split("/").reverse();

  let a = moment(s);
  let b = moment(e);
  duration = b.diff(a, "days");
  let room_price = $(`#data-obj${my_id ? my_id : carryId}`).data("price");

  if (duration == 0) {
    duration = 1;
  }
  $(`#data-obj${my_id ? my_id : carryId}`).html(+room_price * duration);

  console.log(room_price);
  console.log(duration);

  dateId = "";
  carryId = "";
  my_id = "";
}
//
let disabledArr = [
  "08/06/2022",
  "08/07/2022",
  "08/20/2022",
  "08/09/2022",
  "08/10/2022",
];

$(".booking_range")
  .daterangepicker(
    {
      startDate: start,
      endDate: end,
      open: "center",
      minDate: moment(),
      isInvalidDate: (arg) => {
        //          console.log(arg)
        let thisMonth = arg._d.getMonth() + 1; // Months are 0 based
        if (thisMonth < 10) {
          thisMonth = "0" + thisMonth; // Leading 0
        }
        //
        let thisDate = arg._d.getDate();
        if (thisDate < 10) {
          thisDate = "0" + thisDate; // Leading 0
        }

        let thisYear = arg._d.getYear() + 1900;
        var thisCompare = thisMonth + "/" + thisDate + "/" + thisYear;

        if ($.inArray(thisCompare, disabledArr) != -1) {
          console.log(" DATE FOUND HERE");
          return true;
        }
      },
    },
    cb
  )
  .focus();

cb(start, end);

// Function to disallow a range selection that includes disabled dates.
$(".booking_range").on("apply.daterangepicker", function (e, picker) {
  //        console.log(e, picker)
  // Get the selected bound dates.
  var startDate = picker.startDate.format("DD/MM/YYYY");
  var endDate = picker.endDate.format("DD/MM/YYYY");
  console.log(startDate + " to " + endDate);

  // Compare the dates again.
  var clearInput = false;
  for (i = 0; i < disabledArr.length; i++) {
    if (startDate < disabledArr[i] && endDate > disabledArr[i]) {
      console.log("Found a disabled Date in selection!");
      clearInput = true;
    }
  }

  // If a disabled date is in between the bounds, clear the range.
  if (clearInput) {
    // To clear selected range (on the calendar).
    var today = new Date();
    $(this).data("daterangepicker").setStartDate(today);
    $(this).data("daterangepicker").setEndDate(today);

    // To clear input field and keep calendar opened.
    $(this).val("").focus();
    console.log("Cleared the input field...");

    // Alert user!
    //            alert("Your range selection includes disabled dates!");
  }
});


// TEXT EDITING WXSGY WITH TINY

let htm = `<div class="mv-2">
		<ul class="list-group">
			<li class="list-group-item p-4">
				<h4>Privacy policies</h4>			
        
        <form class="mt-20" class="privacyPolicy" method="post">
          <textarea id="pp" name="pp">
           
          </textarea>
        </form>
        
        <button class="btn btn-primary mt-20" id="privacyPolicy" style="background-color: #f35588;">Create from template</button>
			</li>
		</ul>
	</div>`

  <script src="https://cdn.tiny.cloud/1/389dk9hmiohyrnvo1t6i02swtfly47ildidbpxesuwselmrf/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script> 
  // <script src='https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.0.0/tinymce.min.js' referrerpolicy="origin"></script>

  <script>
    tinymce.init({
      selector: 'textarea',
//      plugins: 'a11ychecker advcode casechange export formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
//      toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter pageembed permanentpen table',
      toolbar_mode: 'floating',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      branding: false
    });    
    
  </script>

$.get('/admin/settings/fetchPolicy/', (res)=>{
        
  if(res){
    
    $('#sp').html(res.store_policy);
    $('#pp').html(res.privacy_policy);
    $('#tos').html(res.terms_of_service);
    $('#shp').html(res.shipping_policy);
    
//      tinyMCE.init({
//        // General options
//        mode : "specific_textareas",
//        theme : "advanced",
//        width: "100%",
//        plugins : "pagebreak,paste,fullscreen,visualchars",
//
//        // Theme options
//        theme_advanced_buttons1 : "code,|,bold,italic,underline,|,sub,sup,|,charmap,|,fullscreen,|,bullist,numlist,|,pasteword",
//        theme_advanced_buttons2 :"",
//        theme_advanced_buttons3 :"",
//        theme_advanced_buttons4 :"",
//        theme_advanced_toolbar_location : "top",
//        theme_advanced_toolbar_align : "left",
//        theme_advanced_statusbar_location : "bottom",
//        valid_elements : "i,sub,sup",
//        invalid_elements : "p, script",
//        editor_deselector : "mceOthers"
//        });
  }    
  
  
}, 'json')
  
let data = {}

$('#savePolicy').on('click', (e)=>{
  e.preventDefault()
  
  const storePolicy = tinymce.get("sp").getContent()
  const privacyPolicy = tinymce.get("pp").getContent()
  const termOfService = tinymce.get("tos").getContent()
  const shippingPolicy = tinymce.get("shp").getContent()
  
//    console.log(storePolicy)
  
  data = {
    storePolicy,
    privacyPolicy,
    termOfService,
    shippingPolicy
  }
   
  $.post('/admin/settings/save/policy/', data, (res)=>{
//      console.log(res)
    if(res.status == 'success'){
      pwp.showToast('User policies have been saved',"success", false)
    }else{
      pwp.showToast('Unable to save user policies, please try again...',"danger", true)
    }
  }, 'json')
})

// UPDATE THE TEXT FIELD WITH THE DETAILS NEEDED TO POPULATE THE PRIVACY POLICY AND TERMS OF SERVICES

$('#privacyPolicy').on('click', ()=>{
  tinymce.get('pp').setContent(defaultPolicy.privacy);
})  

$('#termOfService').on('click', ()=>{
  tinymce.get('tos').setContent(defaultPolicy.termOfService);
})  
