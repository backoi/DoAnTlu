import cron from 'node-cron';

// Lên lịch chạy vào 18:00 theo giờ Việt Nam
cron.schedule('45 20 * * *', () => {
  console.log('Cron job đang chạy - Thông báo lúc 20:45 theo giờ Việt Nam!');
}, {
  timezone: 'Asia/Ho_Chi_Minh' // Múi giờ Việt Nam
});

console.log('Cron job đã được khởi động. Chờ xem thông báo...');