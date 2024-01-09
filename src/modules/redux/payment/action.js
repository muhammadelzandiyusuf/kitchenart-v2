import actionType from "./actionType";

export const getSimulationInstallment = (simulation) => ({
    type: actionType.GET_SIMULATION_INSTALLMENT,
    data: simulation
});

export const getCalculateInstallment = (simulation) => ({
    type: actionType.GET_CALCULATE_INSTALLMENT,
    data: simulation
});