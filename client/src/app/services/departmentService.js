import {fetchData, postData, deleteData} from "./fetchData";


export function fetchAllDepartments(){
    return fetchData("/departments/all");
}

export function fetchDepartmentById(id){
    return fetchData(`/departments/${id}`);
}

export function deleteDepartment(id){
    return deleteData(`/departments/${id}`);
}

export function addDepartment(data){
    return postData("/departments/", data);
}