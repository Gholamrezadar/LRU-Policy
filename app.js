var frame_count = 0;
var page_input = [];
var page_count = 0;

var current_page_number = 0;
var order_table = []

var frames = []
var page_to_replace = undefined
var is_tekrari = false
var is_full = false


// utility
function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
}

function init()
{
    frame_count = 0;
    page_input = [];
    page_count = 0
    current_page_number = 0;
    order_table = []
    frames = []
    page_to_replace = undefined
    is_tekrari = false
    is_full = false


    // get user inputs
    frame_count = parseInt($("#frame_count").val());
    page_input = $("#page_input").val().split(" ");
    page_count = page_input.length;

    // create #frame-containers-container
    frame_containers = ''
    for (let i = 0; i < page_count; i++) {
        frame_containers += '<div class="frame-container">';
        for (let j = 0; j < frame_count; j++) {
            frame_containers += '<div class="frame">-</div>';
        }
        frame_containers += '<div class="frame-detail">-</div></div>';

    }
    $("#frame-containers-container").html(frame_containers);

    // create #order-container
    order_container = ''
    order_container += '<div class="frame-detail">اولویت</div>';
        for (let j = 0; j < frame_count; j++) {
            order_container += '<div class="frame">-</div>';
        }

    $("#order-container").html(order_container);
}

function update()
{
    is_tekrari = false
    is_full = false

    if(current_page_number >= page_count)
    {
        console.log("end")
        alert("صفحه ای باقی نمانده")
        return;
    }
    current_page = page_input[current_page_number]

    // update order table
    if(order_table.includes(current_page))
    {
        is_tekrari = true
        order_table = arrayRemove(order_table, current_page);
        order_table.push(current_page)
    }
    else
    {
        if (order_table.length < frame_count)
        {
            
            order_table.push(current_page)
        }
        else
        {
            is_full = true
            page_to_replace = order_table[0]
            order_table.shift()
            order_table.push(current_page)
        }    
    }

    // update #order-container
    order_container = ''
    order_container += '<div class="frame-detail">اولویت</div>';
        for (let j = 0; j < frame_count; j++) {
            if(order_table[order_table.length-1-j] != undefined)
            {
                order_container += '<div class="frame">'+order_table[order_table.length-1-j]+'</div>';
            }
            else
            {
                order_container += '<div class="frame">-</div>';
            }
        }

    $("#order-container").html(order_container);

    // update frames    
    if(!is_full)
    {
        // placement
        if(!is_tekrari)
        {
            // gheire tekrari
            row = []
            order_table.forEach(element => {
                row.push(element)
            });
            row[frame_count] = "-"

            frames.push(row)

        }
        else
        {
            row = []
            frames[current_page_number-1].forEach(element => {
                if(element != 'F' && element != '-')
                {
                    row.push(element)
                }
            });
            row[frame_count] = "-"

            frames.push(row)
        }
    }
    else
    {
        // replacement
        if(!is_tekrari)
        {
            console.log("replace1")
            // gheire tekrari
            row = []
            frames[current_page_number-1].forEach(element => {
                if(element != 'F' && element != '-')
                {
                    console.log("replace")
                    // replacement
                    if(element == page_to_replace)
                    {
                        row.push(current_page)
                    }
                    else
                    {
                        row.push(element)
                    }
                    
                }
            });
            row[frame_count] = "F"

            frames.push(row)
            
        }
        else
        {
            row = []
            frames[current_page_number-1].forEach(element => {
                if(element != 'F' && element != '-')
                {
                    row.push(element)
                }
            });
            row[frame_count] = "-"

            frames.push(row)
        }

    }

    // updates #frames-containers-container
    frame_containers = ''
    for (let i = 0; i < page_count; i++) {
        frame_containers += '<div class="frame-container">';
        for (let j = 0; j < frame_count; j++) {
            try
            {
                if(frames[i][j] == undefined)
                {
                    frame_containers += '<div class="frame">-</div>';
                }
                else
                {
                    frame_containers += '<div class="frame">'+frames[i][j]+'</div>';
                }
            }
            catch
            {
                frame_containers += '<div class="frame">-</div>';
            }
            
        }

        try
        {   
            frame_containers += '<div class="frame-detail">'+frames[i][frame_count]+'</div></div>';

        }
        catch
        {
            frame_containers += '<div class="frame-detail">-</div></div>';
        }
        

    }
    $("#frame-containers-container").html(frame_containers);


    console.log(frames)
    current_page_number++;
}

// page startup
init()

// register event handlers
$("#frame_count").keypress(function(){
    init()
})

$("#page_input").keypress(function(){
    init()
})

$("#request-page-button").click(function(){
    update()
})