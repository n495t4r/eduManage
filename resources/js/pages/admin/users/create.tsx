import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import UserForm from "@/components/users/userform"
import type { BreadcrumbItem } from "@/types"
import PageHeader from "@/components/PageHeader"
import withPermission from "@/HOC/withPermission"
import { ArrowLeft } from "lucide-react"

interface CreateUserProps {
    roles: Array<{
        id: number
        name: string
        permissions: string[]
    }>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Users Management",
        href: "/users",
    },
    {
        title: "Create User",
        href: "/users/create",
    },
]

function CreateUser({ roles }: CreateUserProps) {

    const handleCancel = () => {
        window.history.back()
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <PageHeader
                title="Create Role"
                actionButton={{
                    label: 'Back',
                    icon: <ArrowLeft />,
                    onClick: () => window.history.back(),
                }}
            />

            <div className="max-w-3xl mx-auto">
                <UserForm roles={roles} onCancel={handleCancel} />
            </div>

        </AppLayout>
    )
}

export default withPermission(CreateUser, {
    permission: "create users",
    showForbidden: true,
})

