// All important declaration to perform all cart operations
const WaffleConeImg = document.querySelector('.ConesCollectionFS>.Component1_FS>img');
const CakeConeImg = document.querySelector('.ConesCollectionFS>.Component2_FS>img');
const SweetConeImg = document.querySelector('.ConesCollectionFS>.Component3_FS>img');
const RainbowSprinklesImg = document.querySelector('.RainbowSprinkles>img');
const MaraschinoCherriesImg = document.querySelector('.MaraschinoCherries>img');
const WhippedCreamImg = document.querySelector('.WhippedCream>img');
let All_H2_Inside_ViewCart = document.querySelectorAll('.ViewCartFS > div h2');
const All_H2Spans_Inside_ViewCart = document.querySelectorAll('.ViewCartFS .ConeSelectedName');
const All_AmountFS = document.querySelectorAll('.AmountFS');
let CurrentPurchaseStackDIV = document.querySelector('.CurrentPurchaseStack');
const AllADD_Btns = document.querySelectorAll('.AddBtn');
let CurrentPriceDIV = document.querySelector('.CurrentPrice');
let PushToTotalPurchases_Btn = document.querySelector('.PushToTotalPurchases');
let TotalPurchasesStackDIV = document.querySelector('.TotalPurchasesStack');
const TotalPriceDIV = document.querySelector('.TotalPrice');
const CurrentPurchaseStack_Trash = document.querySelector('.CurrentPurchaseStack .trash').cloneNode(true);
const CurrentPrice_Trash = document.querySelector('.CurrentPrice .trash').cloneNode(true);
const TotalPurchaseStack_Trash = document.querySelector('.CurrentPurchaseStack .trash').cloneNode(true);
const TotalPrice_Trash = document.querySelector('.CurrentPrice .trash').cloneNode(true);
let NotificationBadgeDIV = document.querySelector('.NotificationBadge');

// Variables to count prices and push strings for cones and topping
let CountScoopsAdded = 0;
let CountCurrentPrice = 0;
let CountTotalPrice = 0;
let count = 1;
let ConeStr = "";
let ToppingStr = "";

// Reset first column of cart after pressing the PushToTotalPurchases_Btn button
function ResetCurrentCart() {
    All_H2Spans_Inside_ViewCart[0].innerHTML = All_H2Spans_Inside_ViewCart[2].innerHTML = '';
    CurrentPurchaseStackDIV.innerHTML = CurrentPriceDIV.innerHTML = '';
    CurrentPurchaseStackDIV.appendChild(CurrentPurchaseStack_Trash);
    CurrentPriceDIV.appendChild(CurrentPrice_Trash);
    CountScoopsAdded = CountCurrentPrice = 0;
}

// Reset everything in the cart
function ResetEverything() {
    All_H2Spans_Inside_ViewCart[0].innerHTML = All_H2Spans_Inside_ViewCart[2].innerHTML = '';
    CurrentPurchaseStackDIV.innerHTML = CurrentPriceDIV.innerHTML = TotalPurchasesStackDIV.innerHTML = TotalPriceDIV.innerHTML = '';
    NotificationBadgeDIV.innerHTML = 0;
    ConeStr = ToppingStr = "";
    CurrentPurchaseStackDIV.appendChild(CurrentPurchaseStack_Trash);
    CurrentPriceDIV.appendChild(CurrentPrice_Trash);
    TotalPurchasesStackDIV.appendChild(TotalPurchaseStack_Trash);
    TotalPriceDIV.appendChild(TotalPrice_Trash);
    CountScoopsAdded = CountCurrentPrice = CountTotalPrice = 0;
    count = 1;
}

// Unable Plus minus buttons
function Plus_Minus_Utility(AmountFS_Obj) {
    const minus = AmountFS_Obj.querySelector('div:first-child>button:first-child');
    const amount = AmountFS_Obj.querySelector('div:first-child>button:nth-child(2)');
    const plus = AmountFS_Obj.querySelector('div:first-child>button:nth-child(3)');
    minus.addEventListener('click', () => {
        if (parseInt(amount.innerHTML) > 0) amount.innerHTML = parseInt(amount.textContent) - 1;
    });
    plus.addEventListener('click', () => {
        amount.innerHTML = parseInt(amount.textContent) + 1;
    });
}

function IdentifyScoopType(ScoopIndex) {
    switch (ScoopIndex) {
        case 0: return 'chocolate';
        case 1: return 'vanilla';
        case 2: return 'strawberry';
        case 3: return 'raspberry';
        case 4: return 'praline_pecans';
        case 5: return 'mint';
        case 6: return 'butterscotch';
        case 7: return 'orange';
        case 8: return 'coconut';
        case 9: return 'pineapple';
        case 10: return 'banana';
    }
}

function IdentifyScoopRate(ScoopIndex) {
    switch (ScoopIndex) {
        case 0: return 35;
        case 1: return 15;
        case 2: return 20;
        case 3: return 25;
        case 4: return 40;
        case 5: return 30;
        case 6: return 35;
        case 7: return 25;
        case 8: return 30;
        case 9: return 25;
        case 10: return 20;
    }
}

function ResetAmountBtn(AmountBtn) {
    AmountBtn.innerHTML = 0;
}

// Close icon utility update CountTotalPrice notification badge
function CloseIcon_Utility(TotalPurchaseDIV) {    
    const CloseIconDIV = TotalPurchaseDIV.querySelector('.CloseIcon');
    CloseIconDIV.addEventListener('click', () => {
        const StringContainingPrice = TotalPurchaseDIV.innerHTML.slice(3, -1);
        const FindPrice = StringContainingPrice.match(/\d+/);
        TotalPurchaseDIV.remove();
        TotalPrice_Utility(-parseInt(FindPrice[0], 10));
    });
    ResetCurrentCart();
}

// Total price utility (the last cell of the cart)
function TotalPrice_Utility(TotalAmount) {
    if (TotalAmount < 0) NotificationBadgeDIV.innerHTML = parseInt(NotificationBadgeDIV.innerHTML, 10) - 1;
    CountTotalPrice += TotalAmount;
    const TotalPriceDIVOnlyChild = document.createElement('div');
    TotalPriceDIVOnlyChild.innerHTML = `&#x20B9;${CountTotalPrice}&nbsp;&nbsp;<button class="ResetEverything">Reset EveryThing in the cart</button>`;
    TotalPriceDIV.innerHTML = TotalPriceDIVOnlyChild.innerHTML;
    document.querySelector('.ResetEverything').addEventListener('click', () => {
        ResetEverything();
    })
}

// Total purchase utility (the second cell of the cart)
function TotalPurchases_Utitlity(ConeType, ToppingType) {
    let TotalAmount = null;
    if (ConeType == 'Waffle Cone') {
        if (ToppingType == 'Rainbow Sprinkles') TotalAmount = 20 + CountCurrentPrice;
        else if (ToppingType == 'Maraschino Cherries') TotalAmount = 40 + CountCurrentPrice;
        else TotalAmount = 20 + CountCurrentPrice;
    }
    else if (ConeType == 'Cake Cone') {
        if (ToppingType == 'Rainbow Sprinkles') TotalAmount = 12 + CountCurrentPrice;
        else if (ToppingType == 'Maraschino Cherries') TotalAmount = 32 + CountCurrentPrice;
        else TotalAmount = 17 + CountCurrentPrice;
    }
    else {
        if (ToppingType == 'Rainbow Sprinkles') TotalAmount = 15 + CountCurrentPrice;
        else if (ToppingType == 'Maraschino Cherries') TotalAmount = 35 + CountCurrentPrice;
        else TotalAmount = 20 + CountCurrentPrice;
    }
    if (TotalPurchasesStackDIV.firstElementChild?.classList.contains('trash')) {
        TotalPurchasesStackDIV.firstElementChild.remove();
        TotalPriceDIV.firstElementChild.remove();
    }
    const TotalPurchaseDIV = document.createElement('div');
    TotalPurchaseDIV.classList.add('TotalPurchaseCard');
    TotalPurchaseDIV.innerHTML =
        `${count}. Added a ${ConeType} and ${ToppingType} as Topping on the following scoops, amounting to a total of &#8594; &#x20B9;${TotalAmount}<br>
    <span class="CurrentPurchaseCard">${CurrentPurchaseStackDIV.innerHTML}</span>
    <div class="CloseIcon"><img src="FrozenScoopsImgs/CloseIcon.png" alt=""></div>`;
    TotalPurchasesStackDIV.appendChild(TotalPurchaseDIV);
    TotalPrice_Utility(TotalAmount);

    // CloseIcon_Utility
    CloseIcon_Utility(TotalPurchaseDIV);
}

// Push to total purchase cell through current price cell
function PushToTotalPurchases_Utitlity() {
    PushToTotalPurchases_Btn.addEventListener('click', () => {
        if (CurrentPriceDIV.querySelector('div')) CurrentPriceDIV.querySelector('div').remove();
        if (All_H2Spans_Inside_ViewCart[2].innerHTML.length > 50) {
            NotificationBadgeDIV.innerHTML = parseInt(NotificationBadgeDIV.innerHTML, 10) + 1;
            if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Waffle Cone')) {
                if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Rainbow Sprinkles')) return TotalPurchases_Utitlity('Waffle Cone', 'Rainbow Sprinkles');
                else if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Maraschino Cherries')) return TotalPurchases_Utitlity('Waffle Cone', 'Maraschino Cherries');
                else return TotalPurchases_Utitlity('Waffle Cone', 'Whipped Cream');
            }
            else if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Cake Cone')) {
                if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Rainbow Sprinkles')) return TotalPurchases_Utitlity('Cake Cone', 'Rainbow Sprinkles');
                else if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Maraschino Cherries')) return TotalPurchases_Utitlity('Cake Cone', 'Maraschino Cherries');
                else return TotalPurchases_Utitlity('Cake Cone', 'Whipped Cream');
            }
            else {
                if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Rainbow Sprinkles')) return TotalPurchases_Utitlity('Sweet Cone', 'Rainbow Sprinkles');
                else if (All_H2Spans_Inside_ViewCart[2].innerHTML.includes('Maraschino Cherries')) return TotalPurchases_Utitlity('Sweet Cone', 'Maraschino Cherries');
                else return TotalPurchases_Utitlity('Sweet Cone', 'Whipped Cream');
            }
        } else {
            const WarningIfConeNotSelectedDIV = document.createElement('DIV');
            // WarningIfConeNotSelectedDIV.classList.add('WarningIfConeNotSelected');
            WarningIfConeNotSelectedDIV.style.marginTop = '0.75rem';
            WarningIfConeNotSelectedDIV.style.marginBottom = '0.75rem';
            WarningIfConeNotSelectedDIV.style.textAlign = 'center';
            WarningIfConeNotSelectedDIV.classList.add('red');
            WarningIfConeNotSelectedDIV.innerHTML = 'Select a cone and a topping first to proceed!';
            CurrentPriceDIV.appendChild(WarningIfConeNotSelectedDIV);
        }
        // ResetCurrentCart();
    });
}

// Updating the current price (the 3rd cell of cart)
function UpdateCurrentPrice(UpdatedPrice) {
    CountCurrentPrice += UpdatedPrice;
    const UpdatePriceDIV = document.createElement('div');
    UpdatePriceDIV.innerHTML = CountCurrentPrice;
    CurrentPriceDIV.innerHTML = `&#x20B9;${UpdatePriceDIV.innerHTML}&nbsp;&nbsp;<button class="PushToTotalPurchases">Push in the Total Purchases &#8625;</button>`;
    PushToTotalPurchases_Btn = document.querySelector('.PushToTotalPurchases');
    PushToTotalPurchases_Utitlity();
}

// Adding to cart (the 1st cell of cart)
function Add_To_Cart(ADD_Btn, AmountFS_Obj, ScoopIndex) {
    const AmountBtn = AmountFS_Obj.querySelector('div:first-child>button:nth-child(2)');
    const amount = parseInt(AmountBtn.textContent);
    if (amount > 0) {
        if (CountScoopsAdded + amount <= 6) {
            if (document.querySelectorAll('.red')) {
                const All_Red = document.querySelectorAll('.red');
                All_Red.forEach(red => {
                    red.remove();
                });
            }
            const StackScoopsDIV = document.createElement('div');
            const FlavourName = IdentifyScoopType(ScoopIndex);
            const ScoopRate = IdentifyScoopRate(ScoopIndex);
            if (CurrentPurchaseStackDIV.firstElementChild?.classList.contains('trash')) {
                StackScoopsDIV.innerHTML = `Added &times;${amount} ${FlavourName} scoop!  &#8594; &#x20B9;${amount * ScoopRate}`;
                CurrentPurchaseStackDIV.innerHTML = `<div>${StackScoopsDIV.innerHTML}</div>`;
            }
            else {
                StackScoopsDIV.innerHTML = `Added &times;${amount} ${FlavourName} scoop!  &#8594; &#x20B9;${amount * ScoopRate}`;
                CurrentPurchaseStackDIV.appendChild(StackScoopsDIV);
            }
            CountScoopsAdded += amount;
            UpdateCurrentPrice(amount * ScoopRate);
        } else {
            if (document.querySelectorAll('.red')) {
                const All_Red = document.querySelectorAll('.red');
                All_Red.forEach(red => {
                    red.remove();
                });
            }
            const DisplayLimit = document.createElement('div');
            DisplayLimit.style.marginTop = '0.75rem';
            DisplayLimit.style.marginBottom = '0.75rem';
            DisplayLimit.style.textAlign = 'center';
            DisplayLimit.classList.add('red');
            DisplayLimit.innerHTML = 'Sorry! You cannot add more than 6 scoops in a cone.&#x1F622;';
            CurrentPurchaseStackDIV.appendChild(DisplayLimit);
        }
    }
    ResetAmountBtn(AmountBtn);
}

// Appending cone name in the spans of cell 1st and cell 3rd
function AppendConeName(DisplayStr) {
    All_H2Spans_Inside_ViewCart[0].style.color = All_H2Spans_Inside_ViewCart[2].style.color = "green";
    All_H2Spans_Inside_ViewCart[0].innerHTML = All_H2Spans_Inside_ViewCart[2].innerHTML = `(${DisplayStr})`;
}

// Strings i.e. ConeStr and ToppingStr to push it to spans of 1st and 3rd cells of cart 
WaffleConeImg.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('SelectScoopsFS').scrollIntoView({ behavior: 'smooth' });
    ConeStr = 'Selected a Waffle Cone';
    AppendConeName(`${ConeStr} ${ToppingStr}`);
});
CakeConeImg.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('SelectScoopsFS').scrollIntoView({ behavior: 'smooth' });
    ConeStr = 'Selected a Cake Cone';
    AppendConeName(`${ConeStr} ${ToppingStr}`);
});
SweetConeImg.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('SelectScoopsFS').scrollIntoView({ behavior: 'smooth' });
    ConeStr = 'Selected a Sweet Cone';
    AppendConeName(`${ConeStr} ${ToppingStr}`);
});


// Strings i.e. ConeStr and ToppingStr to push it to spans of 1st and 3rd cells of cart 
RainbowSprinklesImg.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('SelectScoopsFS').scrollIntoView({ behavior: 'smooth' });
    ToppingStr = 'And Rainbow sprinkles As Topping';
    AppendConeName(`${ConeStr} ${ToppingStr}`);
});
MaraschinoCherriesImg.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('SelectScoopsFS').scrollIntoView({ behavior: 'smooth' });
    ToppingStr = 'And Maraschino Cherries As Topping';
    AppendConeName(`${ConeStr} ${ToppingStr}`);
});
WhippedCreamImg.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('SelectScoopsFS').scrollIntoView({ behavior: 'smooth' });
    ToppingStr = 'And Whipped Cream As Topping';
    AppendConeName(`${ConeStr} ${ToppingStr}`);
});

// Adding plus, minus utility for each buttons of scoop containers
All_AmountFS.forEach((AmountFS) => {
    Plus_Minus_Utility(AmountFS);
});

// Adding add utility for each buttons of scoop containers
AllADD_Btns.forEach((ADD_Btn, ScoopIndex) => {
    ADD_Btn.addEventListener('click', () => {
        Add_To_Cart(ADD_Btn, All_AmountFS[ScoopIndex], ScoopIndex);
    });
});



