export class BlockchainService {

    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL;
        this.accessToken = "Basic " + process.env.REACT_APP_ACCESS_TOKEN;
    }

    form_chaincode = "form-20T1041";
    grants_chaincode = "workandpensionsdepartment-grants";

    listContracts() {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getContractByRange", "", ""]
            })
          }).then(promise => promise.json());
    }

    listContract(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getContractById", id]
            })
          }).then(promise => promise.json());
    }

    listContractHistory(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getContractHistoryById", id]
            })
          }).then(promise => promise.json());
    }

    createContract(personId, employerId, workingHours, effectiveDate, contractDate, contractId) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["createRelationship", personId, employerId, workingHours, effectiveDate, contractDate, contractId],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    updateContract(contractId, workingHours, effectiveDate) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["updateRelationship", contractId, workingHours, effectiveDate],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    terminateContract(contractId, effectiveDate) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["terminateRelationship", contractId, effectiveDate],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    suspendContract(contractId, suspensionStartDate) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["suspendRelationshipStart", contractId, suspensionStartDate],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    suspendAllContract(personId, suspensionStartDate) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["suspendAllRelationshipStart", personId, "" + suspensionStartDate.getTime() + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    resumeContract(contractId, suspensionEndDate) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["suspendRelationshipEnd", contractId, suspensionEndDate],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    listPersons() {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getPersonByRange", "", ""]
            })
          }).then(promise => promise.json());
    }

    listPerson(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getPersonById", id]
            })
          }).then(promise => promise.json());
    }

    listPersonHistory(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getPersonHistoryById", id]
            })
          }).then(promise => promise.json());
    }

    listPersonContracts(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["executeQuery", "SELECT json_extract(valueJson, '$.contractDate') AS contractDate, json_extract(valueJson, '$.contractId') AS contractId, json_extract(valueJson, '$.employerId') AS employerId, json_extract(valueJson, '$.personId') AS personId FROM <STATE> WHERE json_extract(valueJson, '$.assetType') = 'demo_20T1041_v2.contract' AND json_extract(valueJson, '$.personId') = '" + id + "' AND json_extract(valueJson, '$.insuranceEnd') is null"]
            })
          }).then(promise => promise.json());
    }

    createPerson(person) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["createPerson", "" + JSON.stringify(person) + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    updatePerson(person) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["updatePerson", "" + JSON.stringify(person) + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    deletePerson(id) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["deletePerson", "" + id + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    listEmployers() {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getEmployerByRange", "", ""]
            })
          }).then(promise => promise.json());
    }

    listEmployer(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getEmployerById", id]
            })
          }).then(promise => promise.json());
    }

    listEmployerHistory(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["getEmployerHistoryById", id]
            })
          }).then(promise => promise.json());
    }

    listEmployerContracts(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["executeQuery", "SELECT json_extract(valueJson, '$.contractDate') AS contractDate, json_extract(valueJson, '$.contractId') AS contractId, json_extract(valueJson, '$.employerId') AS employerId, json_extract(valueJson, '$.personId') AS personId FROM <STATE> WHERE json_extract(valueJson, '$.assetType') = 'demo_20T1041_v2.contract' AND json_extract(valueJson, '$.employerId') = '" + id + "' AND json_extract(valueJson, '$.insuranceEnd') is null"]
            })
          }).then(promise => promise.json());
    }

    createEmployer(employer) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["createEmployer", "" + JSON.stringify(employer) + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    updateEmployer(employer) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["updateEmployer", "" + JSON.stringify(employer) + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    deleteEmployer(id) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.form_chaincode,
                args: ["deleteEmployer", "" + id + ""],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }

    listLeaves() {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.grants_chaincode,
                args: ["getLeaveByRange", "", ""]
            })
          }).then(promise => promise.json());
    }

    listLeave(id) {
        return fetch(this.baseUrl + "/chaincode-queries", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.grants_chaincode,
                args: ["getLeaveById", id]
            })
          }).then(promise => promise.json());
    }

    createLeave(personId, employerId, leaveDate, leaveId) {
        return fetch(this.baseUrl + "/transactions", { 
            method: 'post',
            headers: new Headers({
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({
                chaincode: this.grants_chaincode,
                args: ["startLeave", personId, employerId, leaveDate, leaveId],
                timeout: 18000,
                sync: true
            })
          }).then(promise => promise.json());
    }
}