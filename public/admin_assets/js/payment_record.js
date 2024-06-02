const paymentRecordForm= document.querySelector('.payment_record_form');
const projectId= document.querySelector('#projectid');
const clientId=document.querySelector('#clientid');
const amount= document.querySelector('#amount');
const projectStatus= document.querySelector('#status');
let recordTable=document.querySelector('.record_table');
paymentRecordForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(selectedRow);
    if(validate()){
        let formData=readFormData();
        if(selectedRow==null){
            insertNewRecord(formData);
        }else{
            updateTableData(formData);
        }
        resetForm();
    }
});

function readFormData(){
    let formData={};
    formData['projectId']=projectId.value;
    formData['clientId']=clientId.value;
    formData['amount']= amount.value;
    formData['status']= projectStatus.value;

    return formData;
}

function resetForm(){
    projectId.value="";
    clientId.value="";
    amount.value="";
    projectStatus.value="";
}
function showError(input, message){
    const formField= input.parentElement;
    const error= formField.querySelector('small');
    error.textContent=message;
}
function hideError(input){
    const formField= input.parentElement;
    const error= formField.querySelector('small');
    error.textContent="";
}

// it needs to be validated if the project id and the client id exist in the database
function validate(){
    let valid=false;
    if(validateProjectid() && validateClientid() && validateAmount() && validateStatus()){
        valid=true;
    }
    return valid;
}

function validateProjectid(){
    let valid= false;
    if(!(projectId.value==="")){
        valid=true;
        hideError(projectId)
    }else{
        showError(projectId, "Please enter a valid project ID")
    }
    return valid;
}
function validateClientid(){
    let valid= false;
    if(!(clientId.value==="")){
        valid=true;
        hideError(clientId)
    }else{
        showError(clientId, "Please enter a valid client ID")
    }
    return valid;
}
function validateAmount(){
    let valid= false;
    if(!(amount.value==="")){
        valid=true;
        hideError(amount)
    }else{
        showError(amount, "Please enter a valid amount")
    }
    return valid;
}
function validateStatus(){
    let valid= false;
    if(!(projectStatus.value==="")){
        valid=true;
        hideError(projectStatus)
    }else{
        showError(projectStatus, "Please choose a project status")
    }
    return valid;
}

let serialNumber=1;
function insertNewRecord(data){
    let table= recordTable.getElementsByTagName('tbody')[0];
    let newRow= table.insertRow(table.length);
    cell1=newRow.insertCell(0);
    cell2=newRow.insertCell(1);
    cell3=newRow.insertCell(2);
    cell4=newRow.insertCell(3);
    cell5=newRow.insertCell(4);
    cell6=newRow.insertCell(5);

    cell1.innerHTML=serialNumber;
    cell2.innerHTML=data.projectId;
    cell3.innerHTML=data.clientId;
    cell4.innerHTML=data.amount;
    cell5.innerHTML=data.status;
    cell6.innerHTML='<button onclick="onEdit(this)">Edit</button> <button onclick="onDelete(this)">Delete</button>';

    serialNumber++;
}

let selectedRow=null;
function onEdit(td){
    selectedRow=td.parentElement.parentElement;
    projectId.value=selectedRow.cells[1].innerHTML;
    clientId.value=selectedRow.cells[2].innerHTML;
    amount.value=selectedRow.cells[3].innerHTML;
    projectStatus.querySelectorAll('option').forEach(option=>{
        let selectedOption=selectedRow.cells[4].textContent;
        if(selectedOption===option.textContent){
            projectStatus.value=option.value;
            return;
        }
    })
    paymentRecordForm.querySelector('#submit_btn').value="Update";
}

function updateTableData(formData){
    selectedRow.cells[1].innerHTML=formData.projectId;
    selectedRow.cells[2].innerHTML=formData.clientId;
    selectedRow.cells[3].innerHTML=formData.amount;
    selectedRow.cells[4].innerHTML=formData.status;

    paymentRecordForm.querySelector('#submit_btn').value="Add";
}

function onDelete(td){
    if(confirm('The record will be permanantly deleted.')){
        row=td.parentElement.parentElement;
        recordTable.deleteRow(row.rowIndex);
        resetForm();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.payment_record_form');
    const tableBody = document.querySelector('.record_table tbody');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const projectId = document.getElementById('projectid').value;
      const clientId = document.getElementById('clientid').value;
      const amount = document.getElementById('amount').value;
      const status = document.getElementById('status').value;
  
      const response = await fetch('http://localhost:5000/api/payment_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, clientId, amount, status }),
      });
  
      const result = await response.json();
      if (response.ok) {
        addToTable(result);
        form.reset();
      } else {
        console.error('Error:', result.message);
      }
    });
  
    async function fetchRecords() {
      const response = await fetch('http://localhost:5000/api/payment_records');
      const records = await response.json();
      records.forEach(record => addToTable(record));
    }
  
    function addToTable(record) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record._id}</td>
        <td>${record.projectId}</td>
        <td>${record.clientId}</td>
        <td>${record.amount}</td>
        <td>${record.status}</td>
        <td><button data-id="${record._id}" class="delete-btn">Delete</button></td>
      `;
      tableBody.appendChild(row);
    }
  
    tableBody.addEventListener('click', async function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const id = event.target.dataset.id;
  
        const response = await fetch(`http://localhost:5000/api/payment_records/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          event.target.closest('tr').remove();
        } else {
          console.error('Error deleting record');
        }
      }
    });
  
    fetchRecords();
  });
  