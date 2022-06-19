

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



                    var strHtml='';
                    for(var i = 0; i < result.length; i++) {
                        var obj = result[i];
                        strHtml+='<p class="resultP">'+result[i].customerName +'<br>Knd.-Nr:'+ result[i].id +'</p>';
                    }
                    strHtml+='<p style="background-color:cornflowerblue;"><a href="/customer">Neue Kontakt erstellen</a></p>';
                    resultDropdown.html(strHtml);
                }

            })

        } else{
            resultDropdown.empty();
        }
    });

    // Set search input value on click of result item
    $(document).on("click", ".result p", function(e){

     //   console.log(event.target.className);

        var strCustomerInfo=$(this).text();
        var pos=strCustomerInfo.search("Knd.");
        strCustomerName=strCustomerInfo.substring(0, pos);
        strCustomerId=strCustomerInfo.substring(pos);

        var Kunde=$(this).parents(".search-box").find('input[type="text"]');
        Kunde.attr("name",strCustomerId);
        Kunde.val(strCustomerName);

        $(this).parent(".result").empty();
    });

    //cancel select drop down
    $(document).on("click", function(event){



        if((event.target.className != 'resultP')) {

            // if((event.target).id !='searchKunden' && ! $('#searchKundenResult').is(':empty')) {
            $("#searchKundenResult").empty();

            // $("#Kunde").val('');


        } else if  ((event.target).id !='searchBestell' && ! $('#searchBestellResult').is(':empty')) {


            $("#searchBestellResult").empty();

            $("#searchBestell").val('');
        }

    });

    $(document).on("click", "#saveInvoice", function(e){
        let customerId=$("#Kunde").attr("name");
        const pos=customerId.search(":")+1;
        customerId=customerId.substring(pos);

        const invoiceDate=$("#Rechnungsdatum").val();
        const shippingCosts=parseInt($("#ShippingCosts").val()) || 0;



        // invoiceJson='{"Customer": "/api/customers/'+customerId+'", "InvoiceDate": "'+invoiceDate+'", "shippingCosts":'+shippingCosts +'}';

        invoiceJson='{"InvoiceDate": "'+ invoiceDate + '", ';
        invoiceJson+='"ShippingCosts": '+ shippingCosts + ', ';
        invoiceJson+='"Customer":  "/api/customers/' + customerId +'", ';
        invoiceJson+='"invoiceDate": "'+ invoiceDate + '", ';
        invoiceJson+='"shippingCosts": '+ shippingCosts + ', ';
        invoiceJson+='"customer":  "/api/customers/' + customerId +'"} ';


        console.log(invoiceJson);



        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: invoiceJson,
        };

        // console.log('json'+JSON.stringify(customer));
        fetch('/api/invoices', requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));


        console.log(customerId);
       console.log(invoiceDate);
        console.log(shippingCosts);

    });

});



