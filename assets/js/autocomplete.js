

$(document).ready(function(){

    $('.search-box input[type="text"]').on("keyup input", function(){
        /* Get input value on change */
        var inputVal = $(this).val();



        var resultDropdown = $(this).siblings(".result");

        if(inputVal.length){

            paramsString='?CustomerName='+inputVal;
            $.ajax({
                url: "/api/customers" + paramsString,
                contentType: "application/json",
                dataType: 'json',
                success: function(result){

                    console.log(result);

                    var strHtml;
                    for(var i = 0; i < result.length; i++) {
                        var obj = result[i];
                        strHtml+='<p>'+result[i].customerName +'<br>Knd.-Nr.'+ result[i].id +'</p>';
                    }
                    strHtml+='<p style="background-color:cornflowerblue;"><a href="/customer">Neue Kontakt erstellen</a></p>';
                    resultDropdown.html(strHtml);
                }

            })

            // $.get("http://localhost:8099/api/customers.jsonld", {term: inputVal}).done(function(data){
            //     alert(data);
            //     resultDropdown.html(data);
            // });


        } else{
            resultDropdown.empty();
        }
    });

    // Set search input value on click of result item
    $(document).on("click", ".result p", function(){
        var strCustomerName=$(this).text();
        var pos=strCustomerName.search("Knd.");
        strCustomerName=strCustomerName.substring(0, pos);

        $(this).parents(".search-box").find('input[type="text"]').val(strCustomerName);
        $(this).parent(".result").empty();
    });
});