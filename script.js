let emplyeeTableBody = document.querySelector("tbody")
let filterByDept = document.querySelector("#filter-by-department")
let filterByGen = document.querySelector("#filter-by-gender")
let sortBySalary = document.querySelector("#sort-by-salary")

let prevBtn = document.querySelector("#prev-btn")
let nextBtn = document.querySelector("#nxt-btn")
let pageNumber = document.querySelector('span')


// fetching data from given data base and making it into table format and appendig to the main body
function showData(arr){

    emplyeeTableBody.innerHTML = ""

    arr.forEach((ele,i)=>{
        let tRow = document.createElement('tr')
        tRow.setAttribute('class', 'employee-details')

        let idTd = document.createElement('td')
        idTd.innerText = ele.id

        let nameTd = document.createElement('td')
        nameTd.innerText = ele.name

        let genderTd = document.createElement('td')
        genderTd.innerText = ele.gender

        let departmentTd = document.createElement('td')
        departmentTd.innerText = ele.department

        let salaryTd = document.createElement('td')
        salaryTd.innerText = ele.salary

        tRow.append(idTd, nameTd, genderTd, departmentTd, salaryTd)
        emplyeeTableBody.append(tRow)
    })
}


// adding filter functionality , so we can filter by department when selected by user
function filterByD(){
    let res = filterByDept.value
    
    getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=${res}`)
}

filterByDept.addEventListener('change', filterByD)


// adding filter functionality , so we can filter by gender when selected by user
function filterByG(){
    let res = filterByGen.value
    
    getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=gender&filterValue=${res}&sort=salary&order=asc`)
}

filterByGen.addEventListener('change', filterByG)


// using async await functionality to fetch and read the data the pass it to show data function
async function getData(url){

    let res = await fetch(url)
    let data = await res.json()

    showData(data.data)

}


let pageNo = 1;

prevBtn.addEventListener('click', ()=>{
    pageNo = pageNo - 1

    if (pageNo > 0){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNo}&limit=10`)
    }
    else{
        pageNo = 1 
    }

    pageNumber.innerText = `${pageNo}`
})

nextBtn.addEventListener('click', ()=>{
    pageNo = pageNo + 1
    
    if (pageNo <= 10 && pageNo > 1){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNo}&limit=10`)
    }
    else{
        getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10")
        pageNo = 1
    }

    pageNumber.innerText = `${pageNo}`
})

getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10")