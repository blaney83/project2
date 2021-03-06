$(document).ready(function () {

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var zip = $("#zipCode").val().trim();
        getResults(zip);
        function getResults(zip) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                // submit a get request to the restful service zipSearch or locSearch.
                url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
                // or
                // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
                dataType: 'jsonp',
                jsonpCallback: 'searchResultshandler',
            }).then(function (res) {

                searchResultsHandler(res);
            })
        }
        function searchResultsHandler(farmersMarketdata) {
            console.log("helloooooooooo")
            console.log(farmersMarketdata.results)
            var results = farmersMarketdata.results;
            results.forEach(function (marketResult) {

                //append tables here
                var tableRow = "<tr>";
                tableRow += "<td>" + marketResult.marketname + "</td>";
                tableRow += "<td>" + zip + "</td>";
                tableRow += '<td>' + '<button class="rating" marketName="' + marketResult.marketname + '" id="' + marketResult.id + '">Rate</button></td>';
                tableRow += '<td>' + '<button class="moreInfo" id="' + marketResult.id + '">More Info</button></td>';
                tableRow += "</tr>";
                $("#append-here").append(tableRow);

            })

        };

        //this is another way to write an event listener which will work on elements created via JavaScript
        $(document).on("click", ".moreInfo", function (e) {
            event.preventDefault();
            console.log("working")
            var marketdetails = e.target.id;
            getDetails(marketdetails);


            function getDetails(marketdetails) {
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    // submit a get request to the restful service mktDetail.
                    url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + marketdetails,
                    dataType: 'jsonp',
                    jsonpCallback: 'detailResultHandler'
                }).then(function (res) {
                    console.log(res)
                    detailResultsHandler(res);
                })
                //iterate through the JSON result object.
                function detailResultsHandler(farmersmarket) {
                    console.log(farmersmarket.marketdetails)
                    var results = farmersmarket.marketdetails
                    var detailRow = "<tr>";
                    detailRow += "<td>" + results.Address + "</td>";
                    detailRow += "<td><a href='" + results.GoogleLink + "'>Google</a></td>";
                    detailRow += "<td>" + results.Products + "</td>";
                    detailRow += "<td>" + results.Schedule + "</td>";
                    detailRow += "</tr>";

                    $("#details-here").empty();

                    $("#details-here").append(detailRow);
                    $(".modal").modal("show");


                }
            }


        })
    });
    $(document).on("click", ".rating", function (e) {
        console.log("hey click handler")
        console.log(e)

        var recInfo = e.target.id;
        var recName = e.target.parentElement.parentElement.children[0].childNodes[0].data;
        console.log(recName)
        $.ajax({
            type: "POST",
            url: "api/recommendations",
            data: {
                info: recInfo,
                marketName: recName,
            }
        }).then(function (res) {
            alert("Thank you for recommending this farmers market.");
        })
    })
})
