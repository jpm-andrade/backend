export class BookingDTO {
    id?: number;
    checkInDate: Date;
    certificationLevel?: string;
    language: string;
    shopId: number;
    customerId: number;
    bookingTypeId: number;
    price: number;
    deposit: number;
    discount: number;
    activities: ActivitiesDTO[];
};

export class ActivitiesDTO {
    id?: number;
    employeeId: number;
    activityTypeId: number;
    activityLabel: string;
    category: string;
    date: Date;
    price: number;
}