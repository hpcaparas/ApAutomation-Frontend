import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HistoryIcon from '@mui/icons-material/History';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/home"
    },
    {
        id: 1,
        icon: <PeopleIcon/>,
        text: "Admin - Create User",
        link: "adminCreateUser"
    },
    {
        id: 2,
        icon: <FormatListNumberedIcon/>,
        text: "Admin - Maintain values",
        link: "adminMaint"
    },
    {
        id: 3,
        icon: <LockOpenIcon/>,
        text: "Admin - Password Reset",
        link: "adminPassReset"
    },
    {
        id: 4,
        icon: <ThumbUpIcon/>,
        text: "Approval",
        link: "approval"
    },
    {
        id: 5,
        icon: <AttachMoneyIcon/>,
        text: "Apply Reimbursement",
        link: "transactionApp"
    },
    {
        id: 6,
        icon: <HistoryIcon/>,
        text: "Transaction History",
        link: "transactionHis"
    },
]