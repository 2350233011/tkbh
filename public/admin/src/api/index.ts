import request from '../utils/request';

const beaseurl = "http://tkbh.com/";

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};
export const excelimport = ({excelfile}: { excelfile: any }) => {
    return request({
        url: beaseurl + 'import',
        method: 'post',
        data:{"excelfile":excelfile},
    });
};
