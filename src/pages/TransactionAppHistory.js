import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import { API_URL } from '../Constants'
import axios from "axios";
import {useSelector } from "react-redux";
import { Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Player } from '@lottiefiles/react-lottie-player';
import lottieMoney from '../images/lottie/lottie-loading-money.json'

const ODD_OPACITY = 0.2;

const columns2 = [
    { field: 'id', hide: true},
    { field: 'empName', headerName: 'Submitted by', width: 170},
    { field: 'department', headerName: 'Department', width: 300},
    { field: 'statusDesc', headerName: 'Status', width: 170},
    //{ field: 'store', headerName: 'Source', width: 170},
    { field: 'type', headerName: 'Type', width: 300},
    { field: 'priceWTax', headerName: 'Price with Tax', width: 170},
    { field: 'tax', headerName: 'Tax', width: 170},
    { field: 'remarks', headerName: 'Remarks', width: 170},
  ];

  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }

export default function TransactionAppHistory() {
  const [rows, setApproval] = useState([]);
  const [data2, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    let result = null;
    if(currentUser.roles[0] == "ROLE_FINANCE"){
      result = await axios.get(`${API_URL}api/transaction/reimb/getAll`);
    }else{
      result = await axios.get(`${API_URL}api/transaction/reimb/getHistoryByUsername/${currentUser.username}`);
    }
    
    setApproval(result.data);
    setData({
      columns: columns2,
      initialState:{columns : {columnVisibilityModel : {id : false}}},
      rows: result.data
    });
    setDataLoaded(true);
  };


  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 4,
    maxColumns: 6,
  });

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <Button style={{visibility:"hidden"}} onClick={() => test()}>Test</Button>
      </GridToolbarContainer>
    );
  }
  const test = async () => {
    console.log(data);
    console.log(data2);
    console.log(rows);
  };

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[300],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  }));

  if (!dataLoaded) {
    //return  <> <Lottie options={defaultOptions} height={400} width={400}/> </>;
    return <Player src={lottieMoney} className="player" loop autoplay style={{ width: '400px' }}/>
    /* lottie.loadAnimation({
      container: document.querySelector("#loadingDiv"),
      animationData: animationData,
      autoplay:true
    });*/
    //return <div style={{ alignItems:'center', height: 400}} id="loadingDiv">loading</div>  
    //return <>loading</>
  }
  //setDataLoaded(true);
    return (

     <div style={{ height: 400, width: '100%' }}>
       <StripedDataGrid
         {...data2}
         //rows={[]}
         // components={{
         //   Toolbar: CustomToolbar,
         // }}
         getRowClassName={(params) =>
           params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
         }
         slots={{
           toolbar: CustomToolbar,
           noRowsOverlay: CustomNoRowsOverlay,
         }}
       />
     </div>
   ); 
  
}
