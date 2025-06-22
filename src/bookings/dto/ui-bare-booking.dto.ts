export type BareBookingDTO = {
    id?: number;
    checkInDate: Date;
    certificationLevel?: string;
    language: string
    shopId: number;
    customerId: number;
    bookingTypeId?: number;
    price: number;
    deposit: number;
    discount: number
    activities: BareActivitiesDTO[]
}

export type BareActivitiesDTO = {
    id?: number;
    employeeId: number;
    date: Date;
    price: number;
}