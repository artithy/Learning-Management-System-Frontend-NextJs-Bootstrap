export default function DashboardBox({ title, value }) {
    return (
        <>
            <div className="card shadow-sm text-center">
                <div className="card-body">
                    <h6 className="text-muted">{title}</h6>
                    <h3 className="">{value || 0}</h3>
                </div>
            </div>
        </>
    )
}