const dbConnect = require("../utilites/dbConnect");

const client = dbConnect();

async function getAvailableService(date) {
        const serviceCollection =  client.db('mediCare').collection('services');
        const bookingCollection = client.db('mediCare').collection('bookings');
        const services = await serviceCollection.find().toArray();
        const query = {date: date};
        const bookings = await bookingCollection.find(query).toArray();
        services.forEach(service=>{
            const serviceBookings = bookings.filter(book => book.treatment === service.name);
            const bookedSlots = serviceBookings.map(book => book.slot);
            const available = service.slots.filter(slot => !bookedSlots.includes(slot));
            service.slots = available;
        });
        return services;
}

module.exports = getAvailableService;