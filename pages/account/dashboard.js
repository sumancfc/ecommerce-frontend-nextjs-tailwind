import UserDashboard from "@/components/layout/UserDashboard"
import Welcome from "@/components/pages/userDashboard/Welcome"

export default function DashbaordPage() {
    return (
        <UserDashboard pageTitle="Dashboard">
            <Welcome />
        </UserDashboard>
    )
}
