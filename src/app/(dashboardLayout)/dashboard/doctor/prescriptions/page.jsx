import PrescriptionManagementClient from "@/components/doctors/prescriptions/PrescriptionManagementClient";

const PrescriptionManagement = async ({
  searchParams,
}) => {
  const params = await searchParams;

  const appointmentId =
    params?.appointmentId || "";

  return (
    <PrescriptionManagementClient
      appointmentId={appointmentId}
    />
  );
};

export default PrescriptionManagement;