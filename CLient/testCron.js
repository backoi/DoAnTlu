const cron = require('node-cron');
// Lên lịch in thông báo mỗi phút
cron.schedule('* * * * *', () => {
  console.log('Cron job đang chạy - Thông báo mỗi phút!');
});

console.log('Cron job đã được khởi động. Chờ xem thông báo...');