import axiosInstance from "../utils/helpers/axiosInstance";
class taxService {
    createPerson(name) {
        return axiosInstance.post("/createPerson", {
            name
        });
    }
    createPayableItem(personId, itemName, amount) {
        return axiosInstance.post(`/payableItem?Personid=${personId}`, {
            itemName,
            amount
        });
    }
    createDeductingItem(personId, itemName, amount) {
        return axiosInstance.post(`/deductingItem?Personid=${personId}`, {
            itemName,
            amount
        })
    }
    getAllPersonName() {
        return axiosInstance.get("/allPersonName");
    }
    getAllDeductingItem(id) {
        return axiosInstance.get(`/allDeductingItem/${id}`);
    }
    getAllPayableItem(id) {
        return axiosInstance.get(`/allPayableItem/${id}`);
    }
    updatePayableItem(id, itemName, amount) {
        return axiosInstance.put(`/updatePayableItemById/${id}`, {
            itemName,
            amount
        });
    }
    updateDeductingItem(id, itemName, amount) {
        return axiosInstance.put(`/updateDeductingItemById/${id}`, {
            itemName,
            amount
        });
    }
}

export default new taxService();