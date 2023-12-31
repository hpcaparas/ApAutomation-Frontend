import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const ExportExcel = ({excelData, filename}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () =>{
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: {'data': ws}, Sheetnames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, filename + fileExtension);
    }
}

export default ExportExcel;