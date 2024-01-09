import {React, Suspense, useState, useEffect, useHistory, useTranslation} from 'libraries';
import {getCommissions, postCommissionWithdraws} from "services";

import 'assets/scss/dashboard/withdraw.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const CommissionWithdrawOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/CommissionWithdrawOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));

const CommissionWithdraw = () => {

    const t = useTranslation();
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Commission Withdraw'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [commission, setCommission] = useState(null);
    const [balance, setBalance] = useState(false);
    const [amount, setAmount] = useState('');
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [completeBank, setCompleteBank] = useState(false);
    const [openConfirmWithdraw, setOpenConfirmWithdraw] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                path: 'available-balance',
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                }
            };
            getCommissions(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    if (data?.message) {
                        history.push('/profile/commission');
                    }
                    else{
                        if (data?.balance > 0) {
                            setCommission(data);
                        }
                        else{
                            history.push('/profile/commission');
                        };
                    }
                }
                else if (response?.axiosResponse?.status === 401) {
                    history.push('/login');
                };
            });
        }
        else {
            history.push('/login');
        };
    }, [access, history]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleAddForm = (data) => {
        setCompleteBank(true);
    };

    const handleUseAllBalance = (event) => {
        setBalance(event.target.checked);
        if (event.target.checked) {
            setAmount(commission?.balance);
        }
        else {
            setAmount(null);
        };
    };

    const handleAmount = (event) => {
        if (event.target.name === 'bank') {
            setBank(event.target.value);
        }
        else if (event.target.name === 'accountNumber') {
            setAccountNumber(event.target.value);
        }
        else {
            setAmount(event.target.value);
        };
    };

    const handleUpdateBank = () => {
        setCompleteBank(false);
    };

    const handleConfirm = () => {
        if (amount < 100000) {
            setSnackbar({type: 'warning', message: t('message.minimumAmount')});
            setOpen(true);
        }
        else {
            setOpenConfirmWithdraw(true);
        };
    };

    const handleCloseConfirm = () => {
        setOpenConfirmWithdraw(false);
        setButtonLoading(false);
    };

    const handleFinalConfirm = () => {
        setButtonLoading(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                bank: bank,
                accountNumber: accountNumber,
                amount: amount
            }
        };
        postCommissionWithdraws(payload).then(response => {
            if (response?.axiosResponse?.status === 201) {
                setSnackbar({type: 'success', message: t('message.withdrawalWillProcessed')});
                setOpen(true);
                setTimeout(() => {
                    history.push('/profile/commission');
                }, 3000);
            }
            else {
                setSnackbar({type: 'error', message: 'Error'});
                setOpen(true);
            };
            setButtonLoading(false);
        });
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <div className={'withdraw'}>
                    <CommissionWithdrawOrganism
                        handleAddForm={handleAddForm}
                        commission={commission}
                        balance={balance}
                        handleUseAllBalance={handleUseAllBalance}
                        amount={amount}
                        handleAmount={handleAmount}
                        bank={bank}
                        accountNumber={accountNumber}
                        completeBank={completeBank}
                        handleUpdateBank={handleUpdateBank}
                        handleConfirm={handleConfirm}
                        openConfirmWithdraw={openConfirmWithdraw}
                        handleCloseConfirm={handleCloseConfirm}
                        handleFinalConfirm={handleFinalConfirm}
                        buttonLoading={buttonLoading}
                    />
                </div>
                <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            </MenuDashboard>
        </Suspense>
    );
};

export default CommissionWithdraw;