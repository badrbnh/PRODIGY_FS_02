import {fetchData, postData, deleteData, updateData} from "./fetchData";


export function fetchAllEmployees(){
    return fetchData("/employees/all");
}

export function fetchEmployeeById(id){
    return fetchData(`/employee/${id}`);
}

export function deleteEmployee(id){
    return deleteData(`/employees/${id}`);
}

export function addEmployee(data){
    return postData("/employees/", data);
}

export function updateEmployee(id, data){
    return updateData(`/employees/${id}`, data);
}