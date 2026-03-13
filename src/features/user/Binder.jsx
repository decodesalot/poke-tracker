import Card from "@shared/components/Card"

export default function Binder() {
    return (
        <div>
            <h1>My Binder</h1>
            <p className="text-muted fs-5 mb-0">Manage and Track your cards</p>
            <div className="row mt-4 row-cols-1 g-4">
                <div className="col">
                    <Card children={
                        <div className="row">
                            <div className="col">
                                <div className="text-center py-5">
                                    <i className="bi bi-book fs-1"></i>
                                    <p className="h5 mb-0">Your Binder is Empty</p>
                                    <p>Start building your collection by adding cards</p>
                                    <a href="#" className="btn btn-primary"> <i className="bi bi-search"></i> Search Cards</a>
                                </div>
                            </div>
                        </div>} />
                </div>
            </div>
        </div>
    )
}