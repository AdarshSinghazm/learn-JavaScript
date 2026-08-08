const balanceAmt = document.querySelector(".balanceAmount")
const incomeAmt = document.querySelector(".incomeAmount")
const expenseAmt = document.querySelector(".expenseAmount")
const description = document.querySelector("#description")
const amount = document.querySelector("#amount")
const type = document.querySelector("#type")
const category = document.querySelector("#category")
const date = document.querySelector("#date")
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector(".list")
const allBtn = document.querySelector(".allBtn")
const incomeBtn = document.querySelector(".incomeBtn")
const expenseBtn = document.querySelector(".expenseBtn")
const startingBalanceInput = document.querySelector("#startingBalance")
const setBalanceBtn = document.querySelector("#setBalanceBtn")
const toggleMode = document.querySelector(".toggleMode")
const filterButtons = [allBtn, incomeBtn, expenseBtn]

let transactions = JSON.parse(localStorage.getItem("transactions")) || []
let startingBalance = Number(localStorage.getItem("startingBalance")) || 0

const savedTheme = localStorage.getItem("theme")
if(savedTheme === "light"){
    document.body.classList.add("light-mode")
    toggleMode.innerText = "Dark🌙"
}

toggleMode.addEventListener("click", function(){
    document.body.classList.toggle("light-mode")
    const isLight = document.body.classList.contains("light-mode")
    toggleMode.innerText = isLight ? "Dark🌙" : "Light☀️"
    localStorage.setItem("theme", isLight ? "light" : "dark")
})

init()

function init(){
    if(transactions.length > 0){
        const emptyState = document.querySelector("#emptyState");
        if(emptyState) emptyState.remove();
        transactions.forEach(renderTransaction)
    }
    if(startingBalance > 0){
        startingBalanceInput.placeholder = `Current: $${startingBalance}`
    }
    updateTotals()
    setActiveFilter(allBtn)
}

setBalanceBtn.addEventListener("click", function(){
    const value = Number(startingBalanceInput.value)
    if(!startingBalanceInput.value.trim() || isNaN(value) || value < 0){
        alert("Enter a valid starting balance")
        return
    }
    startingBalance = value
    localStorage.setItem("startingBalance", startingBalance)
    updateTotals()

    startingBalanceInput.value = ""
})

addBtn.addEventListener("click", function(e){
    const descVal = description.value.trim()
    const amtVal = Number(amount.value)
    const categoryVal = category.value.trim()

    if(!descVal || !amount.value || !type.value || !categoryVal || !date.value){
        alert("Fill all details of transaction")
        return
    }
    if(isNaN(amtVal) || amtVal <= 0){
        alert("Amount must be a number greater than 0")
        return
    }

    addTransaction(descVal, amtVal, type.value, categoryVal, date.value)
    resetEverything()
})

function addTransaction(desc, amt, type, category, date){
    const emptyState = document.querySelector("#emptyState");
    if(emptyState){
        emptyState.remove();
    }

    const transaction = {
        id: Date.now(),
        desc,
        amt: Math.round(amt * 100) / 100,
        type,
        category,
        date
    }
    transactions.push(transaction)
    saveTransactions()

    renderTransaction(transaction)
    updateTotals()
}

function renderTransaction(transaction){
    const li = document.createElement("li");
    li.dataset.id = transaction.id;

    if(transaction.type == "income"){
        li.classList.add("income-entry")
    } else {
        li.classList.add("expense-entry")
    }

    const transactionInfo = document.createElement("div");
    transactionInfo.classList.add("transactionInfo");

    const transactionDesc = document.createElement("span")
    transactionDesc.classList.add("transactionDesc");
    transactionDesc.innerText = transaction.desc;
    transactionInfo.appendChild(transactionDesc);

    const transactionCategory = document.createElement("span")
    transactionCategory.classList.add("transactionCategory");
    transactionCategory.innerText = transaction.category
    transactionInfo.appendChild(transactionCategory);

    const transactionDate = document.createElement("span")
    transactionDate.classList.add("transactionDate");
    transactionDate.innerText = transaction.date
    transactionInfo.appendChild(transactionDate);

    li.appendChild(transactionInfo);

    const transactionAmount = document.createElement("span")
    transactionAmount.classList.add("transactionAmount");
    const sign = transaction.type == "income" ? "+" : "-";
    transactionAmount.innerText = `${sign}${formatCurrency(transaction.amt)}`;
    li.appendChild(transactionAmount);

    const del = document.createElement("button")
    del.classList.add("del");
    del.type = "button"
    del.setAttribute("aria-label", "Delete transaction")
    del.innerText = `×`;
    del.addEventListener("click", function(){
        transactions = transactions.filter(t => t.id !== transaction.id)
        saveTransactions()
        li.remove()
        updateTotals()
        if(transactions.length === 0){
            list.innerHTML = `<li id="emptyState">Nothing is here</li>`
        }
    })
    li.appendChild(del);

    list.appendChild(li);
}

function updateTotals(){
    const totalIncome = round(
        transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amt, 0)
    )
    const totalExpense = round(
        transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amt, 0)
    )
    const balance = round(startingBalance + totalIncome - totalExpense)

    incomeAmt.innerText = formatCurrency(totalIncome)
    expenseAmt.innerText = formatCurrency(totalExpense)
    balanceAmt.innerText = formatCurrency(balance)
}

function round(num){
    return Math.round(num * 100) / 100
}

function formatCurrency(num){
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

function saveTransactions(){
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function resetEverything(){
    description.value = "";
    amount.value = "";
    type.value = "";
    category.value = "";
    date.value = "";
}

function filterList(filterType){
    const items = document.querySelectorAll(".list li:not(#emptyState)")
    items.forEach(li => {
        if(filterType === "all"){
            li.style.display = "flex"
        } else if(filterType === "income"){
            li.style.display = li.classList.contains("income-entry") ? "flex" : "none"
        } else {
            li.style.display = li.classList.contains("expense-entry") ? "flex" : "none"
        }
    })
}

function setActiveFilter(activeBtn){
    filterButtons.forEach(btn => btn.classList.remove("active"))
    activeBtn.classList.add("active")
}

allBtn.addEventListener("click", () => {
    filterList("all")
    setActiveFilter(allBtn)
})
incomeBtn.addEventListener("click", () => {
    filterList("income")
    setActiveFilter(incomeBtn)
})
expenseBtn.addEventListener("click", () => {
    filterList("expense")
    setActiveFilter(expenseBtn)
})