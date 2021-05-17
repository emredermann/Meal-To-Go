﻿const config = require('config.json');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { first, where } = require('../knex');

// users hardcoded for simplicity, store in a db for production applications
/*const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', type:'student' },
{ id: 2, username: 'admin', password: 'admin', firstName: 'AdT', lastName: 'AdUser', type:'admin' }];*/

module.exports = {
    authenticate,
    getNewDeliveryOrders,
    getOldDeliveryOrders,
    getOrderDetails,
    getDeliveryGuy,
    acceptDelivery,
    getRegions,
    getUserRegions,
    postRegion,
    removeRegion
    

};



async function authenticate({ username, password }) {
    
    let result = await knex('user').join('delivery_guy','DELIVERY_GUY_ID','=','USER_ID').where({USER_ID: username, PASSWORD: password}).then((user)=>{
        
        try{
            
            user[0].USER_ID;
        }
        catch{
            
            throw 'Invalid ID or Password';
        }
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    
        return {
                   
            ...omitPassword(user),
              token
         };
        ;}).catch(function(err){
            throw err;
                 
        })      
        
    if(result === 'Invalid ID or Password')
        return result;
        

        let t = await knex('delivery_guy').where({DELIVERY_GUY_ID:username}).update({isAVAILABLE:true}).then((user)=>{
        
            try{
                console.log(user);
                //user[0].DELIVERY_GUY_ID;
            }
            catch{
                
                throw 'Internal Server Error';
            }
            return user;
                ;}).catch(function(err){
                throw err;
                     
            });
           
            if (t ===  'Internal Server Error')
                return t;
              
    return result;
    
}


async function getNewDeliveryOrders(id){
    
    let result = await knex('orders').where({DELIVERY_GUY_ID: id}).where({ORDERSTATE:'Requested'})
                    .join('HAS_ITEM','HAS_ITEM.ORDER_NO','=','orders.ORDER_NO').join('MENU_ITEM','MENU_ITEM.FOOD_ID','=','HAS_ITEM.FOOD_ID')
                    .join('restaurant','restaurant.RESTAURANT_ID','=','MENU_ITEM.RESTAURANT_ID')
                    .distinct('HAS_ITEM.ORDER_NO','CUSTOMER_ID','orders.DELIVERY_GUY_ID','orders.ORDERSTATE','RESTAURANTNAME')
                    .then((data)=>{
                        try{
                            
                            //data[0].DELIVERY_GUY_ID;
                            return data;
                        }catch{
                            throw "Internal Server Error"
                        }
                    });
    return result;
                
}

async function getOldDeliveryOrders(id){
    
    let result = await knex('orders').where({DELIVERY_GUY_ID: id}).where({ORDERSTATE:'Delivered'})
                    .join('HAS_ITEM','HAS_ITEM.ORDER_NO','=','orders.ORDER_NO').join('MENU_ITEM','MENU_ITEM.FOOD_ID','=','HAS_ITEM.FOOD_ID')
                    .join('restaurant','restaurant.RESTAURANT_ID','=','MENU_ITEM.RESTAURANT_ID')
                    .distinct('HAS_ITEM.ORDER_NO','CUSTOMER_ID','orders.DELIVERY_GUY_ID','orders.ORDERSTATE','RESTAURANTNAME')
                    .then((data)=>{
                        try{
                            
                            data[0].DELIVERY_GUY_ID;
                            return data;
                        }catch{
                            throw "Internal Server Error"
                        }
                    });
    return result;
                
}
//

async function getDeliveryGuy(id){
    return knex('deliveryguy').joinRaw('orders').where({DELIVERY_GUY_ID: id});
}


// TO BE CAHNGED
async function getOrderDetails(id){
    let result = await knex('HAS_ITEM').where('HAS_ITEM.ORDER_NO',id).join('orders','orders.ORDER_NO','=','HAS_ITEM.ORDER_NO')
    .join('MENU_ITEM','MENU_ITEM.FOOD_ID','=','HAS_ITEM.FOOD_ID')
    .then((data)=>{
        try{
            
            data[0].ORDER_NO;
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });
    return result;
}


// helper functions
function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function acceptDelivery({u_id,od}){
    console.log(u_id);
    console.log(od);
    let result = await knex('orders').update({ORDERSTATE:'On-The-Way'}).where({ORDER_NO:od}).then((data)=>{
        try{
            
            //data[0].ORDER_NO;
            console.log(data);
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });

    result = await knex('delivery_guy').update({isAVAILABLE:false}).where({DELIVERY_GUY_ID:u_id}).then((data)=>{
        try{
            
            console.log(data);
            //data[0].ORDER_NO;
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });
    return result;


}

async function getRegions(){
    let result = await knex('region').then((data)=>{
        try{
            
            //console.log(data);
            //data[0].ORDER_NO;
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });
    return result;
}

async function getUserRegions(id){
    let result = await knex('service_choice').where({DELIVERY_GUY_ID:id}).then((data)=>{
        try{
            
            //console.log(data);
            //data[0].DELIVERY_GUY_ID;
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });
    return result;
}

async function postRegion({region,id}){
    let result = await knex('service_choice').insert({REGION_NAME:region},{DELIVERY_GUY_ID,id}).then((data)=>{
        try{
            //console.log(data);
            //data[0].DELIVERY_GUY_ID;
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });
    return result;
}

async function removeRegion(id){

    let splitter = id.split('~');
    let delid = splitter[0];
    let region  = splitter[1];

    let result = await knex('service_choice').where({REGION_NAME:region}).where({DELIVERY_GUY_ID,delid}).del().then((data)=>{
        try{
            //console.log(data);
            //data[0].DELIVERY_GUY_ID;
            return data;
        }catch{
            throw "Internal Server Error"
        }
    });
    return result;
}