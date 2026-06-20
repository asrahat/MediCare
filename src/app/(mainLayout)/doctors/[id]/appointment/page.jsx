import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const BookAppointmentPage = async({params}) => {
    const { id } = await params;
    const user =await getUserSession();
    if(!user){
        redirect(`/login?redirect=/doctors/${id}/appointment`);
    }
    return (
        <div>
            Book Appointment
        </div>
    );
};

export default BookAppointmentPage;