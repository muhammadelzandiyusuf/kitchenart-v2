import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    installmentSimulations: [],
    calculateInstallment: []
};

const getSimulationInstallment = (state, action) => {
    return updateObject(state, {
        installmentSimulations: action.data?.axiosResponse?.data
    });
};

const getCalculateInstallment = (state, action) => {
    return updateObject(state, {
        calculateInstallment: action.data?.axiosResponse?.data
    });
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_SIMULATION_INSTALLMENT: return getSimulationInstallment(state, action);
        case actionType.GET_CALCULATE_INSTALLMENT: return getCalculateInstallment(state, action);
        default: return state;
    };
};

export default paymentReducer;