
import AddModal from "./modals/AddModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";

export default function Operations() {


    return (
        <div className={"flex  p-4 gap-8 bg-slate-200 rounded-t-3xl"}>

            <AddModal />
            <EditModal />
            <DeleteModal />


        </div>
    )
}