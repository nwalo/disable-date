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
//    console.log(tempObj)
//		tempObj = {};
//    console.log(tempObj)
