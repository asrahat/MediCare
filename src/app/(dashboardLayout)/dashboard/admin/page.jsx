import { redirect } from 'next/navigation';
import React from 'react';

const AdminDashBoard = () => {
    return redirect('/dashboard/admin/analytics');
};

export default AdminDashBoard;