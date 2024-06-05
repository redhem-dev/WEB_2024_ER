var Constants = 
{
    // API_BASE_URL : "http://localhost:8888/WEB/WEB - PROJECT ER/backend/"
    get_api_base_url : function(){
        if(location.hostname === "localhost"){
            return "http://localhost:8888/WEB/WEB - PROJECT ER/backend/";
        }
        else{
            return "https://lionfish-app-acggi.ondigitalocean.app/backend/";
        }
    }

}