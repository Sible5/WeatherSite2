"use strict";

$(function(){
    var urlTotal;

    $("#zipCode").submit(function(event){
        event.preventDefault();
        var zipCodeText = $("#zipCodeData").val();
        
        //builds URL for API
        const urlFirst = "https://api.openweathermap.org/data/2.5/weather?zip=";
        const urlSecond = "&appid=a1484c058a6d7d94fc3699dafaa02c92";

        const urlFinal = urlFirst+zipCodeText+urlSecond;

        urlTotal = urlFinal;
        
        //Hides the data until submit is pressed
        var T = document.getElementById("hideData");
        T.style.display = "block";
        
        //Sets radio button back to imperial when new zip code is searched
        $('#var1')[0].checked = true;
        
        //Checks weather for zip code, shows in Imperial Units
        $.ajax ({
            url: urlTotal,
            success: function (result){

                $("#cityName").text(result.name);
                $("#sky").text(result.weather[0].description);
    
                let F = Math.round(result.main.temp * (9/5) - 459.67);
                let F2 = Math.round(result.main.feels_like * (9/5) - 459.67);
    
                $("#temperature").text(F);
                $("#tempImp").text(" F")
                $("#FeelsLike").text(F2);
                $("#FeelsImp").text(" F")
    
                let windSpeed = Math.round(result.wind.speed / .44704);
    
                $("#WindSpeed").text(windSpeed);
                $("#WindImp").text(" mph")
                }
            })
        })
        //changes values to imperial from metric
    $("#choiceForm").on("change", function(event){
        event.preventDefault();
        var selectedOption = $('input[name=choice]:checked').val();
        if (selectedOption == "Imperial"){
            $.ajax ({
                url: urlTotal,
                success: function (result){
                    $("#cityName").text(result.name);
                    $("#sky").text(result.weather[0].description);
        
                    let F = Math.round(result.main.temp * (9/5) - 459.67);
                    let F2 = Math.round(result.main.feels_like * (9/5) - 459.67);
        
                    $("#temperature").text(F);
                    $("#tempImp").text(" F")
                    $("#FeelsLike").text(F2);
                    $("#FeelsImp").text(" F")
        
                    let windSpeed = Math.round(result.wind.speed / .44704);
        
                    $("#WindSpeed").text(windSpeed);
                    $("#WindImp").text(" mph")
                    }
                })
        }
        //changes values from imperial to metric
        if (selectedOption == "Metric"){
            $.ajax ({
                url: urlTotal,
                
                success: function (result){
                    $("#cityName").text(result.name);
                    $("#sky").text(result.weather[0].description);
        
                    let F = Math.round(result.main.temp -273.15);
                    let F2 = Math.round(result.main.feels_like -273.15);
        
                    $("#temperature").text(F);
                    $("#tempImp").text(" C")
                    $("#FeelsLike").text(F2);
                    $("#FeelsImp").text(" C")
        
                    let windSpeed = Math.round(result.wind.speed);
        
                    $("#WindSpeed").text(windSpeed);
                    $("#WindImp").text(" m/s")
                    }
                })
        }
})
    
});