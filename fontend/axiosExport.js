import request from '@/untils/request'

export default {
    fecthSelectOptions: params => request.get('/cm/dealer-buydetail/queryListByType', {params}),
    exproExcel: (url,data) =>  request({
        url,
        method: 'get',
        params: data,
        responseType: 'blob'
    }).then(res =>{
        try {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a')
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', decodeURI(res.headers['content-disposition'].split(';')[1].substr(9).split('.')[0])+'.xls');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(new Blob([res.data]));
        } catch (e) {
            console.log(e)
        }
    })
}
