const intialPriceELe = document.querySelector("#initialPrice");
const quantityEle = document.querySelector("#quantity");
const currentPriceEle = document.querySelector("#currentPrice");
const tellMeBtn = document.querySelector("#tellMe");
const message = document.querySelector("#message");

function noLossNoProfit(message){
    sendUpdate(message);
}

function lossMessage(loss,lossPercentage){

    let message = `Your loss is ${loss} and loss percentage is ${lossPercentage}% `;

    if(lossPercentage < 26){
        message +='😶';
    }else if(lossPercentage  < 51){
        message += '😟'
    }else if(lossPercentage < 76){
        message += '😰';
    }else{
        message += '😭';
    }
    sendUpdate('');
    sendUpdate(message);
}

function profitMessage(profit,proftPercentage){
    let message = `Your profit is ${profit} and profit percentage is ${proftPercentage}% `;

    if(proftPercentage  > 75){
        message +='💸 🤭';
    }else if(proftPercentage > 50){
        message += '💸 😍'
    }else if(proftPercentage > 25){
        message += '💸 😂';
    }else{
        message += '💸  😄';
    }

    sendUpdate('');
    sendUpdate(message);
}

function calculateProfitandLoss(intialPrice,currentPrice,quantity){
    let costPrice = parseToFloat(intialPrice.value);
    let sellingPrice = parseToFloat(currentPrice.value);
    
    quantity = Number(quantity.value);
    // console.log({sellingPrice},{costPrice},{quantity});
    
    if(costPrice > sellingPrice){
        let loss = parseToFloat(costPrice - sellingPrice);
        let lossPerc = parseToFloat((loss/costPrice)*100);
        let totalLoss = parseToFloat(loss*quantity);
        lossMessage(totalLoss,lossPerc);
        // console.log({loss},{lossPerc},{totalLoss});
    }else if(costPrice == sellingPrice){
            noLossNoProfit('You made no loss 😑 no profit 👌')
    }else{
        let profit = parseToFloat(sellingPrice - costPrice);
        let profitPerc = parseToFloat((profit/costPrice)*100);
        let totalProfit = parseToFloat(profit * quantity);
        profitMessage(totalProfit,profitPerc);
        // console.log({profit},{profitPerc},{totalProfit});
    }
}

function parseToFloat(value){
    return parseFloat(value).toFixed(2);
}

function sendUpdate(msg){
    message.innerText = msg;
}
  
function isFloat(ele){
    sendUpdate('');
    let n = parseToFloat(ele.value);
    let res = n % 1 !== 0; //Number(n) === n &&
    if(!res){
        return false;
    }
    sendUpdate(`${ele.name} can only be a whole number.`);
    ele.value = "";
    return true;
}

function isEmptyOrNan(ele){
    sendUpdate('');
    let val = parseToFloat(ele.value);
    // console.log({val});
    if(!isNaN(val)){
        return false;
    }
    // console.log({ele});
    sendUpdate(`${ele.name} cannot be empty or other than a number type.`);
    return true;
}

function tellMe(){
    sendUpdate("");
    let intialPrice = intialPriceELe;
    let quantity = quantityEle;
    let currentPrice = currentPriceEle;

    if(!isEmptyOrNan(intialPrice)){
        if(!isEmptyOrNan(quantity)){
            if(!isFloat(quantity)){
                if(!isEmptyOrNan(currentPrice)){
                        calculateProfitandLoss(intialPrice,currentPrice,quantity);
                }
            }
        }
    }

}

tellMeBtn.addEventListener("click",tellMe);

