import { faker } from '@faker-js/faker';

export class BookingPayloads {

    constructor() {
        const currentDate = new Date();
        const futureDate = faker.date.future();
        this.firstname = faker.person.firstName();
        this.lastname = faker.person.lastName();
        this.totalprice = faker.finance.amount();
        this.deposit = faker.finance.amount();
        this.checkin = currentDate.toISOString().split('T')[0];
        this.checkout = futureDate.toISOString().split('T')[0];
        this.additionalneeds = 'Needs';
    }

    updateBookingPayload(firstName, lastName, totalPrice, depositPaid, checkIn, checkOut, additionalNeeds) {
        const createBooking = {
            firstname: firstName ?? this.firstname,
            lastname: lastName ?? this.lastname,
            totalprice: totalPrice ?? this.totalprice,
            depositpaid: depositPaid ?? this.deposit,
            bookingdates: {
                checkin: checkIn ?? this.checkin,
                checkout: checkOut ?? this.checkout
            },
            additionalneeds: additionalNeeds ?? this.additionalneeds
        };
        return createBooking;
    }

    createBookingPayload(firstName, lastName, totalPrice, depositPaid, checkIn, checkOut, additionalNeeds) {
        const createBooking = {
            firstname: firstName ?? this.firstname,
            lastname: lastName ?? this.lastname,
            totalprice: totalPrice ?? this.totalprice,
            depositpaid: depositPaid ?? this.deposit,
            bookingdates: {
                checkin: checkIn ?? this.checkin,
                checkout: checkOut ?? this.checkout
            },
            additionalneeds: additionalNeeds ?? this.additionalneeds
        };
        return createBooking;
    }

}