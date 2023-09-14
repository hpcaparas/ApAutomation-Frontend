import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HistoryIcon from '@mui/icons-material/History';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CardTravel from '@mui/icons-material/CardTravel';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "home",
        roles: "all"
    },
    {
        id: 11,
        icon: <AdminPanelSettingsIcon/>,
        text: "Admin",
        link: "#",
        iconClosed: <ArrowDropDownIcon />,
        iconOpened: <ArrowDropUpIcon />,
        roles: "ROLE_ADMIN",
        subNav: [
            {
                id: 1,
                icon: <PeopleIcon/>,
                text: "Create User",
                link: "admin/adminCreateUser"
            },
            {
                id: 2,
                icon: <FormatListNumberedIcon/>,
                text: "Department Maintenance",
                link: "admin/listMaintDept"
            },
            {
                id: 2,
                icon: <CardTravel/>,
                text: "Type Maintenance",
                link: "admin/listMaintType"
            },
            {
                id: 3,
                icon: <LockOpenIcon/>,
                text: "Password Reset",
                link: "admin/adminChangePass"
            },
        ]
    },
    {
        id: 4,
        icon: <ThumbUpIcon/>,
        text: "Approval",
        link: "approval",
        roles: "ROLE_FINANCE"
    },
    {
        id: 5,
        icon: <AttachMoneyIcon/>,
        text: "Apply Reimbursement",
        link: "transactionApp",
        roles: "all"
    },
    {
        id: 6,
        icon: <HistoryIcon/>,
        text: "Transaction History",
        link: "transactionHis",
        roles: "all"
    },
]