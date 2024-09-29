import { CDN_URL } from "../utils/constants";

const RestaurantCard=(props)=>{
    const {resData}=props;
    const {name,cuisines,avgRating,costForTwo,cloudinaryImageId}=resData?.info;
    
   

    return (
        <div className="res-card" style={{backgroundColor:"#f0f0f0"}}>
            <img className="res-logo" src={CDN_URL+cloudinaryImageId} alt="Restraunt-pic"/>
            <h3 className="cost">{name}</h3>
            <h6>{cuisines.join(", ")}</h6>

            <div className="res-li">
                <li>{avgRating}</li>
                <li>{resData.info.sla.deliveryTime}  Minutes</li>
            </div>
            <h6 className="cost">{costForTwo}</h6>
            
        </div>
    );
}

export default RestaurantCard;