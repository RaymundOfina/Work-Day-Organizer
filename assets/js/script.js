var schedule = [];

// this function gives the current date
document.getElementById("currentDay").innerHTML = moment().format("dddd, MMMM Do");

if( localStorage.getItem("schedule")){
    schedule = JSON.parse(localStorage.getItem("schedule"));
}

for(i=9;i<=17;i++){
    if(schedule[i] != null){
        $("#description-" + i).html(schedule[i].desc);
    }

    if(i < moment().hour()){
        $("#description-" + i).addClass("past");
    }else if(i == moment().hour()){
        $("#description-" + i).addClass("present");
    }else{
        $("#description-" + i).addClass("future");
    }
}

$(".description").click(function(){
    var id = $(this).attr("id").replace("description-", "");

    if(!$("#textarea-" + id).length){
        $(this).html("");

        var newEl = document.createElement("textarea");
        $(newEl).attr("id", "textarea-" + id);
        $(newEl).attr("rows", "3");
        $(newEl).attr("max-rows", "3");

        $(this).append(newEl);

        for(var i=9;i<schedule.length;i++){
            if(schedule[i] != null){
                if(schedule[i].time === id){
                    $(newEl).val(schedule[i].desc);
                    break;
                }
            }
        }

        $(newEl).css("padding", "10px");
        $("#description-" + id).css("padding", "0");

        newEl.focus();
    }
    
});

// Save data to localStorage
$(".container").on("click", ".saveBtn", function(){
    var id = $(this).attr("id").replace("save-", "");
    var desc = $("#textarea-" + id).val();

    schedule[parseInt(id)] = {
        time: id,
        desc: desc
    };

    localStorage.setItem("schedule", JSON.stringify(schedule));
    
    $("#description-" + id).css("padding", "10px");
    $("#description-" + id).html(desc);
});