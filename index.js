let Curr=null;
let A=null;
let B=null;
function main(){
    let geolocation=null;
    if(window.navigator && window.navigator.geolocation){
        geolocation=window.navigator.geolocation;
    }
    if(geolocation){
        geolocation.watchPosition(onLocationUpdate,onError,{
            enableHighAccuracy:true,
            maximumAge:1000
        })
    }else{
        alert("cannot access location");
    }
}
function onLocationUpdate(event){
    Curr=event.coords;
    document.getElementById("loc").innerHTML="Your Location</br> Lat:"+Curr.latitude+"</br> Lon: "+Curr.longitude;
}
function onError(err){
    alert("cannot access location "+ err);
}

function setA(){
    A=Curr;
    updateInfo();
}
function setB(){
    B=Curr;
    updateInfo();
}
function updateInfo(){
    if(A!=null){
        document.getElementById("aBtn").innerHTML="Latitude:"+A.latitude+"<br>"+"Longitude:"+A.longitude;
    }
    if(B!=null){
        document.getElementById("bBtn").innerHTML="Latitude:"+B.latitude+"<br>"+"Longitude:"+B.longitude;
    }
    if(A!=null && B!=null){
        let dist=getDistance(A,B);
        document.getElementById("info").innerHTML="Distance: "+dist+" m"
    }
}
function getDistance(latlon1,latlon2){
    const r=6371000;
    const xyz1=latlonToxyz(latlon1,r);
    const xyz2=latlonToxyz(latlon2,r);
    const h=herons(xyz1,xyz2);
    return h;
}
function latlonToxyz(latlon,r){
    const xyz={x:0,y:0,z:0}
    xyz.y=Math.sin(degToRad(latlon.latitude))*r;
    r=Math.cos(degToRad(latlon.latitude))*r;
    xyz.z=Math.cos(degToRad(latlon.longitude))*r;
    xyz.x=Math.sin(degToRad(latlon.longitude))*r;
    return xyz;
}
function degToRad(degree){
    return degree*Math.PI/180;
}
function herons(p1,p2){
    return Math.sqrt(
        (p1.x-p2.x)*(p1.x-p2.x)+
        (p1.y-p2.y)*(p1.y-p2.y)+
        (p1.z-p2.z)*(p1.z-p2.z)
    )
}
function setinst(){
    document.getElementById("instructions").innerHTML="A will be your starting location and B is your end point location"
}
function setint(){
    document.getElementById("instructions").innerHTML="<strong> It may vary </strong> since we have used formula for parallel distancing curvature calculations not compatible"
}