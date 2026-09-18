var cl = console.log;

const stdform = document.getElementById('stdform');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const contect = document.getElementById('contect');
const addstdBtn = document.getElementById('addstdBtn');
const updatestdBtn = document.getElementById('updatestdBtn');
const stdcontainer = document.getElementById('stdcontainer');


//  let stdArr = [
//     {
//         fname: "shuhbam",
//         lname: "dubukwad",
//         email: "shubham@gmail.com",
//         contect: 87234582345,
//         id: "232"
//     },
//     {
//         fname: "prashant",
//         lname: "dubukwad",
//         email: "prashant@gmail.com",
//         contect: 5634564562,
//         id: "122"
//     },
//     {
//         fname: "vitthel",
//         lname: "dubukwad",
//         email: "vitthel@gmail.com",
//         contect: 843284512,
//         id: "4352"
//     },
//     {
//         fname: "sumitra",
//         lname: "dubukwad",
//         email: "sumitra@gmail.com",
//         contect: 9820495325,
//         id: "5672"
//     }
// ];

// localStorage.setItem('stdArr',JSON.stringify(stdArr))
//stdread//

let stdArr = JSON.parse(localStorage.getItem('stdArr'))
cl(stdArr)

//raedtodo//
function readstd(ele) {
    cl(ele)
    let result = ``;
    ele.forEach((ele, i) => {
        result += `<tr id="${ele.id}">
                                        <td>${i + 1}</td>
                                        <td>${ele.fname}</td>
                                        <td>${ele.lname}</td>
                                        <td>${ele.email}</td>
                                        <td>${ele.contect}</td>
                                        <td class="text-center">
                                            <i onclick="editstd(this)" class="fa-solid fa-user-pen fa-2x text-primary" role="button" data-id="${ele.id}" ></i>
                                        </td>
                                        <td class="text-center">
                                            <i onclick="deletestd(this)" class="fa-solid fa-user-xmark fa-2x text-danger" role="button" data-id="${ele.id}" ></i>
                                        </td>
                                    </tr>`;
    });
    stdcontainer.innerHTML = result;
}
readstd(stdArr);


//stdcreate//
function oncreatestd(eve) {
    eve.preventDefault()
    cl(eve);
    let stdObj = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contect: contect.value,
        id: Date.now().toString()
    }
    stdform.reset()
    stdArr.push(stdObj);
    localStorage.setItem('stdArr', JSON.stringify(stdArr))
    let tr = document.createElement('tr')
    tr.id=stdObj.id;
    tr.innerHTML = ` <td>${stdArr.length}</td>
                                        <td>${stdObj.fname}</td>
                                        <td>${stdObj.lname}</td>
                                        <td>${stdObj.email}</td>
                                        <td>${stdObj.contect}</td>
                                        <td class="text-center">
                                            <i  onclick="editstd(this)" class="fa-solid fa-user-pen fa-2x text-primary" role="button" id="${stdObj.id}" ></i>
                                        </td>
                                        <td class="text-center">
                                            <i  onclick="deletestd(this)" class="fa-solid fa-user-xmark fa-2x text-danger" role="button" id="${stdObj.id}" ></i>
                                        </td>
                                    </tr>`;
    stdcontainer.append(tr);

    swal.fire({
        title: `STD-CREATE SUCCESSFULLY..!!`,
        text: `your student information created has been successfully..!!`,
        icon: `success`,
        timer: 1800
    })

}



//std-edit//
function editstd(ele) {
    cl(ele);
    let edit_id = ele.closest('tr').id;
    localStorage.setItem("edit_id",edit_id)
    let edit_Obj = stdArr.find(p => p.id === edit_id)

    fname.value = edit_Obj.fname;
    lname.value = edit_Obj.lname;
    email.value = edit_Obj.email;
    contect.value = edit_Obj.contect;

    addstdBtn.classList.add('d-none');
    updatestdBtn.classList.remove('d-none');

}
//std-update//

function onupdatestd() {
    let updateID = localStorage.getItem('edit_id');
    localStorage.removeItem('edit_id')
    let update_OBJ = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contect: contect.value,
        id: updateID
    }
    let getIndex = stdArr.findIndex(p => p.id === updateID)
    stdArr[getIndex] = update_OBJ;
    localStorage.setItem('stdArr',JSON.stringify(stdArr))

    let tr = document.getElementById(updateID).children;
    tr[1].innerText = update_OBJ.fname;
    tr[2].innerText = update_OBJ.lname;
    tr[3].innerText = update_OBJ.email;
    tr[4].innerText = update_OBJ.contect;

    stdform.reset()
    addstdBtn.classList.add('d-none');
    updatestdBtn.classList.remove('d-none');



    swal.fire({
        title: `STD-UPDATE SUCCESSFULLY..!!`,
        text: `your student information updated has been successfully..!!`,
        icon: `success`,
        timer: 1800
    })
}

//std-delete//
function deletestd(ele) {
    let delete_ID = ele.closest('tr').id;
    // cl(ele);
    let getconfermation = confirm(`are you surecan delete your student information ${delete_ID}`)
    if (getconfermation) {

        let getIndex = stdArr.findIndex(p => p.id === delete_ID)
        stdArr.splice(getIndex, 1);
        ele.closest('tr').remove()
        let allrows = document.querySelectorAll('#stdcontainer tr td:first-child');
        allrows.forEach((ele, i) => { ele.innerText = i + 1 })
        localStorage.setItem('stdArr', JSON.stringify(stdArr))
        swal.fire({
            title: `STD-REMOVE SUCCESSFULLY..!!`,
            text: `your student information deleted has been successfully..!!`,
            icon: `success`,
            timer: 1800
        })

    }
}

stdform.addEventListener('submit', oncreatestd);
updatestdBtn.addEventListener('click', onupdatestd);