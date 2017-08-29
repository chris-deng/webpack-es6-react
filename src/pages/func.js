
import Remote from '../utils/Remote';

class Func {
    static btnClick(e) {
        alert('1');
        e.preventDefault();
        const oData = {
            m: 'college',
            c: 'teachers',
            p: 'android',
            fa: 'index'
        };
        // Remote.post('/w/mgame/deliver/apptimer/getList', {offset: 0, limit: 10}).then((data) => {
        Remote.get('/law/index.php', oData).then((data) => {
            if (data.state === 200) {
                alert('233');
            }else {
                alert('500');
            }
        });
    }
}

export default Func;
// u=s&m=manager&c=managerInfo&a=managers&student_token=08752e92d36f0c264adf88f9431ede67
// m=college&c=teachers&p=android&fa=index